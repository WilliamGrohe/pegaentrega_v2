'use client'

import { DeliveryList } from "@/components/deliveryList"
import { useDeliveries } from "@/hooks/useDeliveries"

export default function DeliveriesHistory(){
  useDeliveries()
  return (
    <div>
      <h1>Histórico de entregas</h1>
      <DeliveryList />
    </div>
  )
}