import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import supabase from "./utils/supabase";

// export const config = {
//   matcher: ["/", "/_sites/:site*"],
// };

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const mydomain = process.env.NEXT_PUBLIC_url;
  const publicDomain = process.env.NEXT_PUBLIC_domain;
  const currentUrl = process.env.NEXT_PUBLIC_localUrl;
  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get("host");
  const url = req.nextUrl;

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "test.vercel.app", "vercel.app" is the root URL)
  const currentHost =
    process.env.NODE_ENV == "production"
      ? hostname?.replace(`${mydomain}`, "").replace(`.${publicDomain}`, "") // PUT YOUR DOMAIN HERE
      : hostname?.replace(`.${currentUrl}`, "");

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if (pathname.startsWith(`/_sites`)) {
    return new NextResponse(null, { status: 404 });
  } else if (
    !pathname.includes(".") && // exclude all files in the public folder
    !pathname.startsWith("/api") && // exclude all API routes
    currentHost && // having currentHost as a multitenant id
    currentHost !== currentUrl &&
    currentHost !== publicDomain
  ) {
    // rewrite to the current hostname under the pages/sites folder
    // the main logic component will happen in pages/sites/[site]/index.tsx
    const { data } = await supabase()
      .from("sites")
      .select()
      .eq("domain", currentHost);

    if (data && data.length > 0) {
      const sites = data[0];
      url.pathname = `/_sites/${sites.domain}${url.pathname}`;

      const response = NextResponse.rewrite(url);
      response.cookies.set(
        "dupersite",
        JSON.stringify({ ...sites, sitemap: sites.page_id })
      );
      response.cookies.set(
        "dupersite-map",
        JSON.stringify({ sitemap: { ...sites.sitemap }, parent: sites.page_id })
      );
      return response;
    } else url.pathname = `/_sites/404`;

    // console.log("SUPAWARE: ", {
    //   middleware: {
    //     mydomain,
    //     publicDomain,
    //     currentUrl,
    //     currentHost,
    //     url,
    //   },
    //   data,
    // });
  }
  return NextResponse.rewrite(url);
}
