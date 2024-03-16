"use client";

import { Header } from "@/components/header";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  DOMAttributes,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";

interface NewDeliveryDataProps {
  nome: string | undefined;
  volumes: string | undefined;
  obs: string | undefined;
}

export default function LojistaPage() {
  const { user, handleSignOut } = useAuth();
  const [newDeliveryData, setNewDeliveryData] =
    useState<NewDeliveryDataProps>();
  const router = useRouter();

  if (!user) {
    router.push("/sign-in");
  }

  // if (user?.name !== "Televendas") {
  //   router.push("/motorista");
  // }

  function handleLogout() {
    router.push("/sign-in");
    handleSignOut();
  }

  function handleCreateDelivery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <Header />
      <main className="mt-16 p-4">
        <div className="flex gap-4 justify-between flex-wrap">
          <div className="">
            <form
              id="formulario"
              className="flex flex-col gap-4 text-zinc-900"
              onSubmit={handleCreateDelivery}
            >
              <input
                type="text"
                placeholder="Nome/Empresa:"
                className="placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 sm:text-sm"
                onChange={(event) =>
                  setNewDeliveryData({
                    nome: event.target.value,
                    volumes: newDeliveryData?.volumes,
                    obs: newDeliveryData?.obs,
                  })
                }
                value={newDeliveryData?.nome}
              />
              <input
                type="text"
                placeholder="Volumes:"
                className="placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 sm:text-sm"
                onChange={(event) =>
                  setNewDeliveryData({
                    nome: newDeliveryData?.nome,
                    volumes: event.target.value,
                    obs: newDeliveryData?.obs,
                  })
                }
                value={newDeliveryData?.volumes}
              />
              <input
                type="text"
                placeholder="Observação:"
                className="placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 sm:text-sm"
                onChange={(event) =>
                  setNewDeliveryData({
                    nome: newDeliveryData?.nome,
                    volumes: newDeliveryData?.volumes,
                    obs: event.target.value,
                  })
                }
                value={newDeliveryData?.obs}
              />
              <input
                type="date"
                name="date"
                id="date"
                className="placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 sm:text-sm"
                // onChange={(event) => setNewDeliveryDate(event.target.value)}
              />
              <label htmlFor="">
              <input type="radio" name="deliveryByWho" id="deliveryByWho" value="motoboy"/> 
                Motoboy
              </label>
              <label htmlFor="">
              <input type="radio" name="deliveryByWho" id="deliveryByWho" value="motorista"/> 
                Motorista
              </label>
              <button type="submit" className="bg-emerald-800 px-6 py-3 rounded-md hover:bg-emerald-900 cursor-pointer text-zinc-100">Salvar</button>
            </form>
          </div>
          <div className="flex flex-1 justify-center">MAP</div>
        </div>
        <div className="flex-col">
          <p>Nome: {newDeliveryData?.nome}</p>
          <p>Volumes: {newDeliveryData?.volumes}</p>
          <p>Observação: {newDeliveryData?.obs}</p>
        </div>
      </main>
      <footer className="flex gap-10 justify-center">
        <h1>{user?.name}</h1>
        <button
          className="bg-emerald-800 px-6 py-3 rounded-md hover:bg-emerald-900"
          onClick={handleLogout}
        >
          Deslogar
        </button>
      </footer>
    </>
  );
}
