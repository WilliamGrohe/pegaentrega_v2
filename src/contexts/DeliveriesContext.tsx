"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { dbFirestore } from "@/services/firebase";
import { addDoc, collection } from "firebase/firestore";

type DeliveryInfo = {
  name: string | undefined;
  volumes?: string;
  obs?: string;
  adress?: string;
  date?: string;
  finished?: boolean;
  inRoad?: boolean;
  deliveryBy: string;
};

type CoordinatesType = {
  latitude: number;
  longitude: number;
  adress?: string;
};

type ValueType = {
  coords: CoordinatesType | undefined;
  setDeliveryInfos: Dispatch<SetStateAction<DeliveryInfo | undefined>>;
  setLatLngOnContext: (
    lat: number,
    lng: number,
    adress: string
  ) => void | undefined;
};

type DeliveriesContextProviderType = {
  children: ReactNode;
};



export const DeliveriesContext = createContext({} as ValueType);

export function DeliveriesContextProvider(
  props: DeliveriesContextProviderType
) {
  const [coords, setCoords] = useState<CoordinatesType>();
  const [deliveryInfos, setDeliveryInfos] = useState<DeliveryInfo>();
  const [deliveryId, setDeliveryId] = useState("");

  function setLatLngOnContext(lat: number, lng: number, adress: string) {
    setCoords({
      latitude: lat,
      longitude: lng,
      adress: adress,
    });

    alert("setou coords no contexto");

    console.log(coords);
  }

  

  // criar a entrega no DB
const saveDeliveryOnDatabase = async () => {

  if( !coords?.adress) {
    alert("Escolha o endereço de destino")
    return
  }

  try {
    const docRef = await addDoc(collection(dbFirestore, "motorista"), {
      lat: coords?.latitude,
      lng: coords?.longitude,
      adress: coords?.adress,
      name: deliveryInfos?.name,
      volumes: deliveryInfos?.volumes,
      inRoad: deliveryInfos?.inRoad,
      finished: deliveryInfos?.finished,
      obs: deliveryInfos?.obs,
      date: deliveryInfos?.date,
      deliveryBy: deliveryInfos?.deliveryBy,
    });
    console.log("Document written with ID: ", docRef.id);
    setDeliveryId(docRef.id);
    alert(`Solicitação de entrega criada criada com sucesso.`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }


  setCoords({
    latitude: 0,
    longitude: 0,
  });
}

  useEffect(() => {
    if (deliveryInfos && coords?.latitude !== 0) {
      alert("entrou no effect savedelivery de baixo");
      saveDeliveryOnDatabase();
      console.log(deliveryInfos);
      // salvar()
    }
  }, [deliveryInfos]);

  return (
    <DeliveriesContext.Provider
      value={{
        setLatLngOnContext,
        setDeliveryInfos,
        coords,
      }}
    >
      {props.children}
    </DeliveriesContext.Provider>
  );
}
