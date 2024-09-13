"use client";

import { useEffect, useState } from "react";
import { dbFirestore } from "../services/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { id } from "date-fns/locale";

type DeliveryFirebase = Record<
  string,
  {
    id: string;
    lat: number;
    lng: number;
    name: string;
    adress: string;
    volumes: string;
    obs: string;
    date: string;
    deliveryBy: string;
    inRoad?: boolean;
    finished: boolean;
  }
>;

type Delivery = {
  id?: string;
  lat: number;
  lng: number;
  name: string;
  adress: string;
  volumes: string;
  obs: string;
  date: string;
  deliveryBy: string;
  inRoad?: boolean;
  finished: boolean;
};

interface LatLng {
  lat: number;
  lng: number;
}

// async function useDeliveries() {
//   // alert('bateu useDeliveries');
//   const [deliveries, setDeliveries] = useState<Delivery[]>([]);
//   const docSnap = await getDocs(collection(dbFirestore, "motorista"));

//   docSnap.forEach((doc) => {
//     const deliveryInfo = doc.data();
//     const firebaseDeliveries: DeliveryFirebase = deliveryInfo ?? {};

//     const delivery = deliveryInfo as Delivery;

//     // setDeliveries([delivery])

//     // setDeliveries([
//     //   {
//     //     id: doc.id,
//     //     lat: delivery.lat,
//     //     lng: delivery.lng,
//     //     name: delivery.name,
//     //     adress: delivery.adress,
//     //     volumes: delivery.volumes,
//     //     obs: delivery.obs,
//     //     date: delivery.date,
//     //     deliveryBy: delivery.deliveryBy,
//     //     inRoad: delivery.inRoad,
//     //     finished: delivery.finished,
//     //   },
//     // ]);
//   });

//   console.log(deliveries);

//   return;
// }

function useDeliveries() {
  const [deliveries, setDeliveries] = useState<any[]>([]);

  const deliveriesCollectionRef = collection(dbFirestore, "motorista");

  useEffect(()=> {
    const getDeliveries = async () => { 

      const docSnap = await getDocs(deliveriesCollectionRef);
      
      setDeliveries(
        docSnap.docs.map( (doc) => ({...doc.data(), id: doc.id}))
      )
    }
    getDeliveries()
  },[])

  console.log(deliveries)
  return deliveries
}

export { useDeliveries };
