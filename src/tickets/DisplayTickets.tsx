// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import type { TicketType } from "@/Zustand/TicketsStore";
// import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Calendar } from "lucide-react";

// interface TicketsTypeProps {
//   tickets: TicketType[];
// }

// const DisplayTickets = ({ tickets }: TicketsTypeProps) => {
//   return (
//     <div className="grid gap-3 mt-3 text-xs">
//       {tickets.map((item: TicketType) => {
//         const date = new Date(item.start_date);
//         const options: Intl.DateTimeFormatOptions = {
//           month: "short",
//           day: "2-digit",
//         };
//         const formatted = date.toLocaleDateString("en-US", options);
//         return (
//           <Card key={item.id} className="w-full h-full px-2 text-xs gap-2 ">
//             <div className="w-full h-full flex justify-between">
//               <span
//                 className={cn(
//                   "p-0.5 px-1 rounded-2xl outline-1",
//                   item.ticket_severity === "Low"
//                     ? "bg-green-200"
//                     : item.ticket_severity === "High"
//                     ? "bg-orange-200"
//                     : item.ticket_severity === "Medium"
//                     ? "bg-yellow-200"
//                     : "bg-red-200"
//                 )}
//               >
//                 {item.ticket_severity}
//               </span>

//               <div className="flex gap-1">
//                 <span className="cursor-pointer">
//                   <FontAwesomeIcon icon={faEye} />
//                 </span>
//                 <span className="cursor-pointer">
//                   <FontAwesomeIcon icon={faPen} />
//                 </span>
//                 <span className="cursor-pointer">
//                   <FontAwesomeIcon icon={faTrash} />
//                 </span>
//               </div>
//             </div>
//             <div className=" w-full ">
//                 <span className="cursor-pointer pl-2">{item.ticket_id}</span>
//             </div>
//             <Separator className=""/>
//             <div className="w-full h-full flex gap-2 justify-between">
//               <span className="p-0.5 rounded-2xl outline-1">
//                 {item.ticket_status}
//               </span>
//               <span className="flex gap-1">
//                 <Calendar className="w-[15px] h-[15px]" />
//                 {formatted}
//               </span>
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default DisplayTickets;

import { Card } from "@/components/ui/card";
import type { ColumnsType } from "./TicketsDashboard";
import type { TicketType } from "@/Zustand/TicketsStore";
import {useDroppable } from "@dnd-kit/core";
import ShowSpecifiedTickets from "./ShowSpecifiedTickets";

interface ColumnTypeProp {
  column: ColumnsType;
  tickets: TicketType[];
}

const DisplayTicket = ({ column, tickets }: ColumnTypeProp) => {
  const {setNodeRef} = useDroppable({
    id : column.id
  })
  return (
    <div className="bg-gray-50/20 aspect-video rounded-xl h-full w-full " ref={setNodeRef}>
      <Card className="p-1.5 rounded-sm bg-gray-50">
        <div className="w-full h-full flex justify-between">
          <span className="uppercase font-bold text-gray-500">
            {column.title}
          </span>
          <span className="outline-1 px-1 bg-white font-bold rounded-full">
            {tickets.length > 0 ? tickets.length : "0"}
          </span>
        </div>
      </Card>
      <div className="w-full h-full  hover:overflow-auto">
        <div className="grid gap-3 mt-3 text-xs">
          {tickets.map((item: TicketType) => {
            // const date = new Date(item.start_date);
            // const options: Intl.DateTimeFormatOptions = {
            //   month: "short",
            //   day: "2-digit",
            // };
            // const {attributes,setNodeRef,listeners,transform} = useDraggable({
            //     id : item.ticket_state
            // })
            // const formatted = date.toLocaleDateString("en-US", options);
            return (
            //   <Card key={item.id} className="w-full h-full px-2 text-xs gap-2 "ref={setNodeRef} {...listeners} {...attributes} >
            //     <div className="w-full h-full flex justify-between">
            //       <span
            //         className={cn(
            //           "p-0.5 px-1 rounded-2xl outline-1",
            //           item.ticket_severity === "Low"
            //             ? "bg-green-200"
            //             : item.ticket_severity === "High"
            //             ? "bg-orange-200"
            //             : item.ticket_severity === "Medium"
            //             ? "bg-yellow-200"
            //             : "bg-red-200"
            //         )}
            //       >
            //         {item.ticket_severity}
            //       </span>

            //       <div className="flex gap-1">
            //         <span className="cursor-pointer">
            //           <FontAwesomeIcon icon={faEye} />
            //         </span>
            //         <span className="cursor-pointer">
            //           <FontAwesomeIcon icon={faPen} />
            //         </span>
            //         <span className="cursor-pointer">
            //           <FontAwesomeIcon icon={faTrash} />
            //         </span>
            //       </div>
            //     </div>
            //     <div className=" w-full ">
            //       <span className="cursor-pointer pl-2">{item.ticket_id}</span>
            //     </div>
            //     <Separator className="" />
            //     <div className="w-full h-full flex gap-2 justify-between">
            //       <span className="p-0.5 rounded-2xl outline-1">
            //         {item.ticket_status}
            //       </span>
            //       <span className="flex gap-1">
            //         <Calendar className="w-[15px] h-[15px]" />
            //         {formatted}
            //       </span>
            //     </div>
            //   </Card>
            <ShowSpecifiedTickets item = {item} key={item.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DisplayTicket;
