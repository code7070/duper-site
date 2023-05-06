import Loading from "@/components/loading";
import { fetchAPI, setCookie } from "@/utils/helpers";
import supabase from "@/utils/supabase";
import { useRouter } from "next/router";
import { useState } from "react";
import PageHead from "../PageHead";

const btnList = [
  { name: "daftar", text: "Daftar" },
  { name: "login", text: "Login" },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

  const router = useRouter();

  const findUser = async () => {
    const { data, error } = await supabase()
      .from("user")
      .select()
      .or(`username.eq.${username},email.eq.${email}`);
    return { data, error };
  };

  const doLogin = async () => {
    const { user, error } = await fetchAPI.post("login", {
      username,
      password,
    });
    if (user) {
      setCookie("token", user?.token);
      setCookie("username", user?.username);
      router.replace({ pathname: "/sites" });
      setLoading(false);
    } else if (error) {
      alert(error && error.message);
      setLoading(false);
    }
  };

  const doRegister = async () => {
    const { data } = await findUser();

    if (data && data.length > 0) {
      alert("User sudah tersedia. Silakan login");
      setLoading(false);
    } else {
      const { status } = await supabase()
        .from("user")
        .insert({ email, username, password });
      if (status > 200 && status < 400) {
        setMode("login");
        setUsername("");
        setPassword("");
        setLoading(false);
        alert("Registrasi berhasil. Silakan melanjutkan dengan login");
      }
      console.log(status);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") doLogin();
    else doRegister();
  };

  return (
    <>
      <PageHead title="duper - login" />
      <div className="mx-auto max-w-xs ">
        <form
          onSubmit={onSubmit}
          className="p-4 rounded-xl flex flex-col gap-4"
        >
          <div className="btn-group">
            {btnList.map(({ name, text }) => (
              <button
                key={name}
                type="button"
                className={`btn btn-primary ${
                  mode !== name ? "btn-outline" : ""
                }`}
                onClick={() => setMode(name)}
              >
                {text}
              </button>
            ))}
          </div>
          <div>
            <input
              type="text"
              className="input input-bordered input-primary w-full"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value || "")}
            />
          </div>
          {mode === "daftar" ? (
            <div>
              <input
                type="text"
                className="input input-bordered input-primary w-full"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value || "")}
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <input
              type="password"
              className="input input-bordered input-primary w-full"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value || "")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={loading || !username || !password}
          >
            {loading ? <Loading /> : mode}
          </button>
        </form>
      </div>
    </>
  );
}
