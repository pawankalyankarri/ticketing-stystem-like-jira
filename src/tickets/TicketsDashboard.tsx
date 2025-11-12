import { Card } from "@/components/ui/card";
import TicketsHead from "./ticketsHeader/TicketsHead";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DisplayTickets from "./DisplayTickets";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { UseTickets, type TicketType } from "./hooks/UseTickets";

export interface ColumnsType {
  id: string;
  title: string;
}

const TicketsDashboard = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const mountRef = useRef<boolean>(false);
  const { UpdateTicketStatus, fetchAllTickets, GetTicket } = UseTickets();

  const Columns: ColumnsType[] = [
    { id: "ToDo", title: "ToDo" },
    { id: "InProgress", title: "InProgress" },
    { id: "Cancelled", title: "Cancelled" },
    { id: "Resolved", title: "Resolved" },
    { id: "OnHold", title: "OnHold" },
  ];

  // const { tickets, getTickets } = TicketsStore();
  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    // axios
    //   .get("/api/ticketing")
    //   .then((res) => setAllTickets(res.data.data))
    //   .catch((err) => console.log(err));
    // getTickets(); // i think need to change here ============>>>>>>>>>>
    const fetchingTickets = async () => {
      const response = await fetchAllTickets();
      setAllTickets(response);
    };
    fetchingTickets();
  }, []);

  // const todoTickets = tickets.filter(
  //   (obj: any) => obj?.ticket_state === "ToDo"
  // );
  // const inProgressTickets = tickets.filter(
  //   (obj: any) => obj?.ticket_state === "InProgress"
  // );
  // const canceledTickets = tickets.filter(
  //   (obj: any) => obj?.ticket_state === "Cancelled"
  // );
  // const resolvedTickets = tickets.filter(
  //   (obj: any) => obj?.ticket_state === "Resolved"
  // );
  // const onHoldTickets = tickets.filter(
  //   (obj: any) => obj?.ticket_state === "OnHold"
  // );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    // console.log('active',active)
    // console.log('over',over)
    if (!over) return;
    if (active.id === over.id) return;
    // console.log("event", event);
    // console.log(event.active.id)
    const ticketDetails = await GetTicket(String(active.id));
    // console.log("tkt", ticketDetails);
    if (ticketDetails.ticket_state !== over.id) {
      if (event.over)
        UpdateTicketStatus({
          ticket_id: String(event.active.id),
          ticket_state: String(event.over.id),
        });
    }
    // if (event.over)

    //   UpdateTicketStatus({
    //     ticket_id: String(event.active.id),
    //     ticket_state: String(event.over.id),
    //   });
  }
  // console.log('tickets',tickets)
  return (
    <div className="flex flex-col gap-4 p-4 pt-0 w-full h-full overflow-hidden bg-gray-50">
      <div className="w-full h-min">
        {/* tickets header filters */}
        <TicketsHead />
      </div>
      <div className="grid auto-rows-min  gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl h-20 w-full" />
        <div className="bg-muted/50 aspect-video rounded-xl  h-20 w-full" />
        <div className="bg-muted/50 aspect-video rounded-xl h-20 w-full " />
      </div>
      <div className="flex-1 rounded-xl  w-full flex gap-4 text-xs overflow-x-auto">
        <DndContext onDragEnd={handleDragEnd}>
          {Columns.map((column: ColumnsType) => {
            return (
              <DisplayTickets
                key={column.id}
                column={column}
                tickets={allTickets.filter(
                  (ticket: TicketType) => ticket.ticket_state === column.id
                )}
              />
            );
          })}
        </DndContext>
      </div>
      {/* <div className=" min-h-screen flex-1 rounded-xl md:min-h-min grid grid-cols-5 gap-4 text-xs">
        <div className="bg-gray-50/20 aspect-video rounded-xl h-full w-full ">
          <Card className="p-1.5 rounded-sm bg-gray-50">
            <div className="w-full h-full flex justify-between">
              <span className="uppercase font-bold text-gray-500">todo</span>
              <span className="outline-1 px-1 bg-white font-bold rounded-full">
                {todoTickets.length > 0 ? todoTickets.length : "0"}
              </span>
            </div>
          </Card>
          <div className="w-full h-full  hover:overflow-auto">
            <DisplayTickets tickets={todoTickets} />
          </div>
        </div>
        <div className="bg-blue-50/20 aspect-video rounded-xl h-full w-full">
          <Card className="p-1.5 rounded-sm bg-blue-100">
            <div className="w-full h-full flex justify-between">
              <span className="uppercase font-bold text-blue-500">
                inprocess
              </span>
              <span className="outline-1 px-1 bg-white font-bold rounded-full">
                {inProgressTickets.length > 0 ? inProgressTickets.length : "0"}
              </span>
            </div>
          </Card>
          <div className="w-full h-full hover:overflow-auto">
            <DisplayTickets tickets={inProgressTickets} />
          </div>
        </div>
        <div className="bg-red-50/20 aspect-video rounded-xl h-full w-full ">
          <Card className="p-1.5 rounded-sm bg-red-100">
            <div className="w-full h-full flex justify-between">
              <span className="uppercase font-bold text-red-500">canceled</span>
              <span className="outline-1 px-1 bg-white font-bold rounded-full">
                {canceledTickets.length > 0 ? canceledTickets.length : "0"}
              </span>
            </div>
          </Card>
          <div className="w-full h-full hover:overflow-auto">
            <DisplayTickets tickets={canceledTickets} />
          </div>
        </div>
        <div className="bg-green-50/20 aspect-video rounded-xl h-full w-full ">
          <Card className="p-1.5 rounded-sm bg-green-100">
            <div className="w-full h-full flex justify-between">
              <span className="uppercase font-bold text-green-500">
                resolved
              </span>
              <span className="outline-1 px-1 bg-white font-bold rounded-full">
                {resolvedTickets.length > 0 ? resolvedTickets.length : "0"}
              </span>
            </div>
          </Card>
          <div className="w-full h-full hover:overflow-auto">
            <DisplayTickets tickets={resolvedTickets} />
          </div>
        </div>
        <div className=" bg-orange-50/20 aspect-video rounded-xl h-full w-full ">
          <Card className="p-1.5 rounded-sm bg-orange-100">
            <div className="w-full h-full flex justify-between">
              <span className="uppercase font-bold text-orange-500">
                onhold
              </span>
              <span className="outline-1 px-1 bg-white font-bold rounded-full">
                {onHoldTickets.length > 0 ? onHoldTickets.length : "0"}
              </span>
            </div>
          </Card>
          <div className="w-full h-full hover:overflow-auto">
            <DisplayTickets tickets={onHoldTickets} />
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default TicketsDashboard;
