"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import {
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  name: string | null;
  email: string | null;
};

export default function SignIn() {
  const { user, signInWithEmail } = useAuth();
  const router = useRouter();

  if (user) {
    if (user?.name === "Motorista") {
      router.push("/motorista");
      alert("motorista entrada automatica");
    }

    if (user?.name === "Televendas") {
      router.push("/lojista")
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;

    console.log(e, email.value, password.value);

    if (!user) {
      signInWithEmail(email.value, password.value).then((userCredential) => {
        const user = userCredential;
      });

      if (user?.name === "Motorista") {
        router.push("/motorista");
        alert("Motorista login");
      }

      if (user?.name === "Televendas") {
        alert("televendas login");
        router.push("/lojista");
      }
    }
  }

  return (
    <div className="flex flex-col border-red-300 border-solid  w-80 h-80 text-center m-auto items-center justify-center">
      <h1 className="mb-3 text-center font-bold text-2xl">Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          id="email"
          placeholder="Username"
          className="w-80 mb-3 border-none outline-none p-3 shadow-xl bg-black/[0.3] rounded-md placeholder:text-zinc-300"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-80 mb-3 border-none outline-none p-3 shadow-xl bg-black/[0.3] rounded-md placeholder:text-zinc-300"
        />
        <button
          type="submit"
          className="w-52 h-10 text-zinc-100 rounded-md border-2 border-emerald-800 cursor-pointer shadow-inner bg-gradient-to-b from-green-500 to-emerald-700 hover:from-emerald-700 hover:to-green-500"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}