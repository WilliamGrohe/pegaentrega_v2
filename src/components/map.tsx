"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { useContext, useEffect, useState } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import { useDeliveries } from "@/hooks/useDeliveries";
import { DeliveriesContext } from "@/contexts/DeliveriesContext";

interface LatLng {
  lat: number;
  lng: number;
}

export function Map() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const { setLatLngOnContext } = useContext(DeliveriesContext)

  const [adressAutocomplete, setAdressAutocomplete] = useState("");
  const [coordsAutocomplete, setCoordsAutocomplete] = useState<LatLng>();
  const resultAdress = Object.values(adressAutocomplete)[0];

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
        version: "weekly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");

      // const { Marker } = await loader.importLibrary(
      //   "marker"
      // ) as google.maps.MarkerLibrary;

      const { Marker, AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      const initialLocal = {
        //Caxias do Sul- RS
        lat: -29.167375925358836,
        lng: -51.17749091709712,
      };

      const mapOptions: google.maps.MapOptions = {
        center: initialLocal,
        zoom: 12,
        mapId: "NEXT_PEGAENTREGA_MAP",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // Cria e mostra o marcador amarelo no ponto de inicial/partida
      const marker = new AdvancedMarkerElement({
        map: map,
        position: initialLocal,
        title: "Início",
      });

      // Cria e mostra o marcador amarelo no ponto de destino
      const markerFim = new Marker({
        map: map,
        position: coordsAutocomplete,
        title: "Destino",
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      });
    };

    initMap();
  }, [coordsAutocomplete]);

  useEffect(() => {
    async function getSelectionLatLng() {
      const results = await geocodeByAddress(resultAdress);
      const latlng = await getLatLng(results[0]);
      console.log(latlng.lat, latlng.lng);
      setLatLngOnContext(latlng.lat, latlng.lng, resultAdress);
      setCoordsAutocomplete({lat: latlng.lat, lng: latlng.lng});
    }

    getSelectionLatLng();
  }, [adressAutocomplete]);

  console.log(resultAdress);
  return (
    <>
      <div className="h-96 w-5/12" ref={mapRef} />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_API_KEY as string}
        selectProps={{
          location: "LatLng",
          adressAutocomplete,
          onChange: setAdressAutocomplete,
          styles: {
            input: (provided) => ({
              ...provided,
              color: 'black',
            }),
            option: (provided) => ({
              ...provided,
              color: 'black',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
              fontWeight: 'bold',
            }),
          },
        }}
      />
    </>
  );
}
