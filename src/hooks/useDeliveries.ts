"use client";

type Delivery = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  adress: string;
  volumes: string;
  inRoad?: boolean;
  finished: boolean;
};

interface LatLng {
  lat: number;
  lng: number;
}

async function useDeliveries(delivery: Delivery) {
  alert('bateu useDeliveries');

  // }
}

export { useDeliveries };
