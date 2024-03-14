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

export default function SignIn() {
  const { user, signInWithEmail } = useAuth();
  const router = useRouter();

  if (user) {
    // history.push('/homemotorista')
    if (user?.name === "Motorista") {
      router.push("/");
      alert("motorista entrada automatica");
    }

    if (user?.name === "Televendas") {
      router.push("/")
      // alert("Televendas entrada automatica");
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

      // history.push('/motorista')
      if (user?.name === "Motorista") {
        alert("Motorista login");
      }

      if (user?.name === "Televendas") {
        alert("televendas login");
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

/*

NOVA TENTATIVA

export default function SignIn() {
  const authUser = useContext(authContext)
  const [user, setUser] = useState();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      authUser.signInWithEmail(email, password)

      router.push('/')
      alert('login realizado')
      console.log(user)
    }, (error) =>{
      //
    })
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {

    const form = e.target as HTMLFormElement
    const email = form.elements.namedItem('email') as HTMLInputElement
    const password = form.elements.namedItem('password') as HTMLInputElement

    setEmail(email.value)
    setPassword(password.value)
    e.preventDefault();
    console.log(e, email.value, password.value)

    if(!user){
      loginComEmailESenha(email.value, password.value).then((user) => {
        console.log(user)
      })
      alert("aguardando")
    }

    // history.push('/motorista')
    if (user?.name === "Motorista") {
      alert("Motorista login")
    }

    if (user?.name === "Televendas") {
      alert('televendas login')
    }

  }

  return (
    <div className="flex flex-col border-red-300 border-solid  w-80 h-80 text-center m-auto items-center justify-center">
      <h1 className="mb-3 text-center font-bold text-2xl">Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id="email" placeholder="Username" className="w-80 mb-3 border-none outline-none p-3 shadow-xl bg-black/[0.3] rounded-md placeholder:text-zinc-300"/>
        <input type="password" id="password" placeholder="Password" className="w-80 mb-3 border-none outline-none p-3 shadow-xl bg-black/[0.3] rounded-md placeholder:text-zinc-300"/>
        <button type="submit" className="w-52 h-10 text-zinc-100 rounded-md border-2 border-emerald-800 cursor-pointer shadow-inner bg-gradient-to-b from-green-500 to-emerald-700 hover:from-emerald-700 hover:to-green-500">
          Entrar
        </button>
      </form>
      <div>

      
      </div>
    </div>
  );
}

*/
