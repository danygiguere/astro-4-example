import { useState, type FormEvent } from "react";

export default function SigninForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/signin", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit} method="post" className="w-full sm:w-[500px]">
      <div>
        <label htmlFor="" className="">
          Your email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="p-3 w-full border border-slate-200 rounded-lg "
        ></input>
      </div>
      <div className="mt-4">
        <label htmlFor="" className="">
          Your password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="p-3 w-full border border-slate-200 rounded-lg"
        ></input>
      </div>
      <button className="text-center border rounded-full px-4 py-2 mt-4 text-sm font-medium">
        Sign in
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}