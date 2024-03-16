'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();

  useEffect(()=>{
    router.push("/")
  }, [])

  function handleNavigate(){
    router.push("/");
  }

  return (
    <>
    <h1>Cadastro</h1>
    <button onClick={handleNavigate}>Ir para home</button>
    </>
  );
}
