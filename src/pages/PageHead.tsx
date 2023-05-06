import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
  icon?: string;
};

export default function PageHead({
  title = "duper",
  description = "Kelola websitemu sendiri",
  icon = "/favicon.ico",
}: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={icon} />
    </Head>
  );
}
