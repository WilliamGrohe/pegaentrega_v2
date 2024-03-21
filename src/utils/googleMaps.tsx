"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  version: "weekly",
  libraries: ["places"],
});

const initialLocal = {
  //Caxias do Sul- RS
  lat: -29.160313262419535,
  lng: -51.18102700226938,
};

const mapOptions = {
  center: initialLocal,
  zoom: 11.5,
};

export function GoogleMaps() {
  // loader.load().then(async () => {
  //   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  //   const map = new Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // });

  // // Promise for a specific library
  // loader
  //   .importLibrary("maps")
  //   .then(({ Map }) => {
  //     new Map(document.getElementById("map") as HTMLElement, mapOptions);
  //   })
  //   .catch((e) => {
  //     // do something
  //   });

  // async function showMaps() {
  //   const configMaps = await loader.load();
  //   const map = new configMaps.maps.Map(
  //     divMap,
  //     mapOptions
  //   );

  //   divMap.classList.add('text-2xl')
  // }

  // useEffect(() => { showMaps() }, [])

  // Promise

  
  useEffect(() => {
    async () => {
      loader
        .load()
        .then((google) => {
          new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            mapOptions
          );
        })
        .catch((e) => {
          alert(e.message);
        });
    };
  }, []);

  const divMap = document.getElementById("map") as HTMLElement;

  function atualiza() {
    divMap.classList.add("text-2xl");
    console.log(divMap);
  }

  return (
    <>
      <button onClick={atualiza}>ATUALIZA</button>
      <div id="map" className="h-auto">
        Maps
      </div>
    </>
  );
}
