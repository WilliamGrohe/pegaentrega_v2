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

  function setLatLngOnContext(lat: number, lng: number, adress: string) {
    setCoords({
      latitude: lat,
      longitude: lng,
      adress: adress,
    });

    alert("setou coords no contexto");

    console.log(coords);

    if (deliveryInfos && coords?.latitude !== 0) {
      alert("entrou no effect savedelivery");
      saveDeliveryOnDatabase()
      console.log(deliveryInfos)
      // salvar()
    }
    
  }

  async function saveDeliveryOnDatabase() {
    // criar a entrega no DB
    const [deliveryId, setDeliveryId] = useState("");

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
      });
      console.log("Document written with ID: ", docRef.id);
      setDeliveryId(docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    alert(`Entrega criada. ID: ${deliveryId}`);

    setCoords({
      latitude: 0,
      longitude: 0,
    });

  }

  function salvar(){
    saveDeliveryOnDatabase();
  }

    useEffect(() => {
      if (deliveryInfos && coords?.latitude !== 0) {
        alert("entrou no effect savedelivery de baixo");
        // saveDeliveryOnDatabase();
        console.log(deliveryInfos)
        // salvar()
      }
    }, [deliveryInfos]);

  return (
    <DeliveriesContext.Provider
      value={{ setLatLngOnContext, setDeliveryInfos, coords }}
    >
      {props.children}
    </DeliveriesContext.Provider>
  );
}
