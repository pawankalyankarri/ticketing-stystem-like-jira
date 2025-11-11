import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { TicketType } from "@/Zustand/TicketsStore";
import { useDraggable } from "@dnd-kit/core";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UseTickets } from "./hooks/UseTickets";

interface SpecifiedTicketsProps {
  item: TicketType;
}
const ShowSpecifiedTickets = ({ item }: SpecifiedTicketsProps) => {
  const navigate = useNavigate();
  const {EditTicket} = UseTickets()
  const date = new Date(item.start_date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
  };
  const formatted = date.toLocaleDateString("en-US", options);
  // draggable
  const { attributes, setNodeRef, listeners, transform } = useDraggable({
    id: item.id,
  });
  const style = transform
    ? { transform: `translate(${transform.x}px,${transform.y}px)` }
    : undefined;


  function copyTicketId (tktId:string){
    navigator.clipboard.writeText(tktId).then(()=>{
      console.log('copied',tktId)
      toast.success("Ticket ID Copied!")
    }).catch(()=>{
      console.log('Failed to Copy',tktId)
    })
  }
  
  function handleEditTicket(tktid:string){
      EditTicket(tktid)
  }

  return (
    <Card
      key={item.id}
      className="w-full h-full px-2 text-xs gap-2 "
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <div className="w-full h-full flex justify-between">
        <span
          className={cn(
            "p-0.5 px-1 rounded-2xl outline-1 text-xs",
            item.ticket_severity === "Low"
              ? "bg-green-100 text-green-500"
              : item.ticket_severity === "High"
              ? "bg-orange-100 text-orange-500"
              : item.ticket_severity === "Medium"
              ? "bg-yellow-200 text-yellow-500"
              : "bg-red-200 text-red-500"
          )}
        >
          {item.ticket_severity}
        </span>

        <div className="flex gap-1" onPointerDown={(e) => e.stopPropagation()}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <FontAwesomeIcon icon={faEye} className="text-gray-500" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Ticket</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer" onClick={()=>
                navigate(`/editTicket/${item.id}`)}>
                <FontAwesomeIcon icon={faPen} className="text-gray-500" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Ticket</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="cursor-pointer"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => {
                    navigate(`/deleteTicket/${item.ticket_id}`);
                  }}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Ticket</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className=" w-full " onPointerDown={(e) => e.stopPropagation()}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className=" cursor-pointer hover:text-blue-800 pl-2" onClick={()=>copyTicketId(item.ticket_id)}>{item.ticket_id}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.ticket_id}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Separator className="" />
      <div className="w-full h-full flex gap-2 justify-between">
        <span className="p-0.5 rounded-2xl outline-1">
          {item.ticket_status}
        </span>
        <span className="flex gap-1">
          <Calendar className="w-[15px] h-[15px]" />
          {formatted}
        </span>
      </div>
    </Card>
  );
};
export default ShowSpecifiedTickets;
