"use client"

import { Header } from "@/components/header";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LojistaPage() {

  const { user, handleSignOut } = useAuth();
  const router = useRouter()

  if(!user){
    router.push("/sign-in")
  }

  if(user?.name !== "Televendas"){
    router.push("/motorista")
  }

  function handleLogout(){
    router.push("/sign-in")
    handleSignOut()
  }

  return (
    <>
    <Header />
    <h1>{user?.name}</h1>
    <button onClick={handleLogout}>Deslogar</button>
    </>
  );
}
