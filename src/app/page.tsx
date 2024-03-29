"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {

  const { user, handleSignOut } = useAuth();
  const router = useRouter()

  if(!user){
    router.push("/sign-in")
  }
  /*

  if(user?.name === "Motorista"){
    router.push("/motorista")
  }

  if(user?.name === "Loja"){
    router.push("/lojista")
  }
  */
  
  function handleLogout(){
    router.push("/sign-in")
    handleSignOut()
  }

  return (
    <>
    <h1>{user?.name}</h1>
    <button onClick={handleLogout}>Deslogar</button>
    </>
  );
}
