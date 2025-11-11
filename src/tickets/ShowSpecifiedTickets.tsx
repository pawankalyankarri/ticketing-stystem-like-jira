import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { TicketType } from "@/Zustand/TicketsStore";
import { useDraggable } from "@dnd-kit/core";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SpecifiedTicketsProps {
  item: TicketType;
}
const ShowSpecifiedTickets = ({ item }: SpecifiedTicketsProps) => {
  const navigate = useNavigate()
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
            "p-0.5 px-1 rounded-2xl outline-1",
            item.ticket_severity === "Low"
              ? "bg-green-200"
              : item.ticket_severity === "High"
              ? "bg-orange-200"
              : item.ticket_severity === "Medium"
              ? "bg-yellow-200"
              : "bg-red-200"
          )}
        >
          {item.ticket_severity}
        </span>

        <div className="flex gap-1">
          <span className="cursor-pointer" >
            <FontAwesomeIcon icon={faEye} className="text-gray-500" />
          </span>
          <span className="cursor-pointer">
            <FontAwesomeIcon icon={faPen} className="text-gray-500" />
          </span>
          <span className="cursor-pointer" onPointerDown={(e) => e.stopPropagation()} >
            <FontAwesomeIcon icon={faTrash} className="text-gray-500" onClick={()=>{
            navigate(`/deleteTicket/${item.ticket_id}`)
           }} />
          </span>
        </div>
      </div>
      <div className=" w-full ">
        <span className="cursor-pointer pl-2">{item.ticket_id}</span>
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
