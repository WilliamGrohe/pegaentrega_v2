"use client";

import { GoogleMaps } from "@/utils/googleMaps";
import { Header } from "@/components/header";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  DOMAttributes,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import { Map } from "@/components/map";
import { DeliveriesContext } from "@/contexts/DeliveriesContext";
import { format, parseISO } from "date-fns";
import {ptBR} from 'date-fns/locale/pt-BR';

interface NewDeliveryDataProps {
  name: string | undefined;
  volumes: string | undefined;
  obs: string | undefined;
}

export default function LojistaPage() {
  const { user, handleSignOut } = useAuth();
  const [newDeliveryData, setNewDeliveryData] =
    useState<NewDeliveryDataProps>();
  const router = useRouter();

  const { setDeliveryInfos } = useContext(DeliveriesContext);

  const [selectDate, setSelectDate] = useState('');
  const [selectDeliveryBy, setSelectDeliveryBy] = useState("");

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

  const formattedDate = selectDate
    ? format(parseISO(selectDate), "dd-MM-yyyy")
    : "";

  function handleCreateDelivery(event: FormEvent) {
    event.preventDefault();

    if (!newDeliveryData?.name) {
      alert("Preencher nome da entrega!");
      return;
    }

    if (!selectDeliveryBy) {
      alert("Selecione quem deverá fazer a entrega!");
      return;
    }

    setDeliveryInfos({
      name: newDeliveryData.name,
      volumes: newDeliveryData.volumes,
      obs: newDeliveryData.obs,
      finished: false,
      inRoad: false,
      date: formattedDate,
      deliveryBy: selectDeliveryBy,
    });
  }

  return (
    <>
      <Header />
      <main className="mt-4 p-4">
        <div className="flex gap-4 justify-between flex-wrap">
          <div className="">
            <form
              id="formulario"
              className="flex flex-col gap-4 text-zinc-900"
              onSubmit={handleCreateDelivery}
            >
              <input
                type="text"
                placeholder="Nome/Empresa/Endereço:"
                className="placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 sm:text-sm"
                onChange={(event) =>
                  setNewDeliveryData({
                    name: event.target.value,
                    volumes: newDeliveryData?.volumes,
                    obs: newDeliveryData?.obs,
                  })
                }
                value={newDeliveryData?.name}
              />
              <input
                type="text"
                placeholder="Volumes:"
                className="placeholder:italic placeholder:text-slate-400 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 sm:text-sm"
                onChange={(event) =>
                  setNewDeliveryData({
                    name: newDeliveryData?.name,
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
                    name: newDeliveryData?.name,
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
                required
                value={selectDate}
                onChange={(e) => setSelectDate(e.target.value)}
                className="placeholder:italic cursor-pointer placeholder:text-slate-400 border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-emerald-500 focus:ring-1 sm:text-sm"
                // onChange={(event) => setNewDeliveryDate(event.target.value)}
              />
              <label htmlFor="" className="text-zinc-100 font-medium">
                <input
                  type="radio"
                  name="deliveryByWho"
                  id="deliveryByWho"
                  value="motorista"
                  onChange={(e) => setSelectDeliveryBy(e.target.value)}
                  className="cursor-pointer mr-2"
                />
                Motorista
              </label>
              <label htmlFor="" className="text-zinc-100 font-medium">
                <input
                  type="radio"
                  name="deliveryByWho"
                  id="deliveryByWho"
                  value="motoboy"
                  onChange={(e) => setSelectDeliveryBy(e.target.value)}
                  className="cursor-pointer mr-2"
                />
                Motoboy
              </label>
              <button
                type="submit"
                className="bg-emerald-800 px-6 py-3 rounded-md hover:bg-emerald-900 cursor-pointer text-zinc-100"
              >
                Salvar
              </button>
            </form>
          </div>
          <div className="flex flex-1 justify-center flex-col">
            <Map />
          </div>
        </div>
        <div className="flex-col">
          <p>Nome: {newDeliveryData?.name}</p>
          <p>Volumes: {newDeliveryData?.volumes}</p>
          <p>Observação: {newDeliveryData?.obs}</p>
          <p>Data: {formattedDate}</p>
          <p>Entregue por: {selectDeliveryBy}</p>
        </div>
      </main>
      <footer className="flex gap-10 justify-center bottom-0">
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
