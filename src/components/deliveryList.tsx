"use client";
import { useDeliveries } from "@/hooks/useDeliveries";

import { FaTruck } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";

export function DeliveryList() {

  const deliveries = useDeliveries()

  return (
    <table className="border-red-500 border">
      <thead className="border-red-500 border">
        <tr>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Volumes</th>
          <th>Observações</th>
          <th>Data</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="border-red-500 border">
        {deliveries.map( (delivery) => (
          <tr key={delivery.id}>
            <td>{delivery.name}</td>
            <td>{delivery.adress}</td>
            <td>{delivery.volumes}</td>
            <td>{delivery.obs}</td>
            <td>{delivery.date}</td>
            <td>{delivery.finished ? <LuPackageCheck title="Pedido Entregue" /> : <FaTruck />} | {delivery.inRoad ? <FaTruck /> : "não Carregado"}</td>
          </tr>
        ))}
        
        
      </tbody>
    </table>
  );
}
