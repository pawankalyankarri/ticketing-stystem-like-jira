import { Card } from "@/components/ui/card";
import TicketsHead from "./ticketsHeader/TicketsHead";
import { useEffect, useState } from "react";
import axios from "axios";

const TicketsDashboard = () => {
  useEffect(()=>{
    axios.get("http://127.0.0.1:9002/api/ticketing").then((res)=>console.log(res)).catch(err=>console.log(err))

  },[])
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-full ">
      <div className="w-full h-min">
        {/* tickets header filters */}
        <TicketsHead />
      </div>
      <div className="grid auto-rows-min  gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl h-20 w-full" />
        <div className="bg-muted/50 aspect-video rounded-xl  h-20 w-full" />
        <div className="bg-muted/50 aspect-video rounded-xl h-20 w-full " />
      </div>
      <div className=" min-h-screen flex-1 rounded-xl md:min-h-min grid grid-cols-5 gap-4 text-xs">
        <div className="bg-gray-50/20 aspect-video rounded-xl h-full w-full ">
          <Card className="p-1.5 rounded-sm bg-gray-50 ">
            <span className="uppercase font-bold text-gray-500">todo</span>
          </Card>
        </div>
        <div className="bg-blue-50/20 aspect-video rounded-xl h-full w-full">
          <Card className="p-1.5 rounded-sm bg-blue-100">
            <span className="uppercase font-bold text-blue-500">inprocess</span>
          </Card>
        </div>
        <div className="bg-red-50/20 aspect-video rounded-xl h-full w-full ">
          <Card className="p-1.5 rounded-sm bg-red-100">
            <span className="uppercase font-bold text-red-500">canceled</span>
          </Card>
        </div>
        <div className="bg-green-50/20 aspect-video rounded-xl h-full w-full ">
          <Card className="p-1.5 rounded-sm bg-green-100">
            <span className="uppercase font-bold text-green-500">resolved</span>
          </Card>
        </div>
        <div className=" bg-orange-50/20 aspect-video rounded-xl h-full w-full ">
          <Card className="p-1.5 rounded-sm bg-orange-100">
            <span className="uppercase font-bold text-orange-500">onhold</span>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default TicketsDashboard;
