import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import {
  faEllipsisV,
  faEye,
  faPen,
  faPenToSquare,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UseTickets, type TicketType } from "./hooks/UseTickets";
// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarTrigger,
// } from "@/components/ui/menubar";
import { motion } from "motion/react";

interface SpecifiedTicketsProps {
  item: TicketType;
  isDragging?: boolean;
}
const ShowSpecifiedTickets = ({ item, isDragging }: SpecifiedTicketsProps) => {
  const navigate = useNavigate();
  const { EditTicket } = UseTickets();
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

  function copyTicketId(tktId: string) {
    navigator.clipboard
      .writeText(tktId)
      .then(() => {
        // console.log('copied',tktId)
        toast.success("Ticket ID Copied!");
      })
      .catch(() => {
        console.log("Failed to Copy", tktId);
      });
  }

  // function handleEditTicket(tktid:string){
  //     EditTicket(tktid)
  // }

  function showText(text: string) {
    const txtCnt = text.length;
    if (txtCnt > 40) {
      return text.slice(40) + "...";
    } else {
      return text;
    }
  }

  return (
    <>
      <motion.div
        key={item.id}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
          zIndex: isDragging ? 9999 : "auto",
        }}
        drag
        animate={{ opacity: isDragging ? 0 : 1, rotate: isDragging ? 5 : 0 }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={cn(
          "w-full h-full px-2 text-xs cursor-pointer flex gap-1 group"
        )}
      >
        <Card
          // key={item.id}
          onClick={() => navigate(`/view/${item.id}`)}
          className={cn(
            "w-full min-h-48 max-h-48 px-2 text-xs cursor-pointer flex gap-4 group"
            // isDragging ? "opacity-0 pointer-events-none" : ""
          )}
          // ref={setNodeRef}
          // {...listeners}
          // {...attributes}
          // style={style}
        >
          <div className="w-full h-full flex justify-between">
            <span
              className={cn(
                " outline-1 text-xs inline-block h-fit rounded-2xl p-0.5",
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

            <div
              className="flex gap-1 opacity-0 group-hover:opacity-100"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {/* <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <FontAwesomeIcon icon={faEye} className="text-gray-500" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Ticket</p>
            </TooltipContent>
          </Tooltip> */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/editTicket/${item.id}`);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-green-600 z-0"
                      size="lg"
                    />
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
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faShare}
                      className="text-blue-700 z-0"
                      size="lg"
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
              <>
                {/* <Tooltip>
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
          </Tooltip>  */}

                {/* <Menubar className="border-0 shadow-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger asChild>
                <div className="p-0 cursor-pointer border-none focus:outline-none focus:ring-0 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[state=close]:bg-transparent focus-visible:bg-transparent focus:bg-transparent active:bg-transparent">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </div>
              </MenubarTrigger>
              <MenubarContent>
                {/* <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem> 
                <MenubarItem
                  onClick={() => {
                    navigate(`/deleteTicket/${item.ticket_id}`);
                  }}
                >
                  Delete
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => navigate(`/editTicket/${item.id}`)}>
                  Edit
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar> */}
              </>
            </div>
          </div>
          <CardContent className="px-1 py-1">
            <div className=" w-full text-sm text-black dark:text-white">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className=" cursor-pointer hover:text-blue-800 "
                    onClick={() => copyTicketId(item.ticket_id)}
                  >
                    {item.ticket_id}
                  </span>
                </TooltipTrigger>
                <TooltipContent onPointerDown={(e) => e.stopPropagation()}>
                  <p>{item.ticket_id}</p>
                </TooltipContent>
              </Tooltip>
              <div className="font-bold capitalize  text-wrap">
                {item.summary.length > 35
                  ? `${item.summary.slice(0, 35)}...`
                  : item.summary}
              </div>
            </div>
          </CardContent>
          <Separator className="" />
          <CardFooter className="px-1">
            <div className="w-full h-full flex gap-2 justify-between">
              <span className="p-0.5 rounded-2xl outline-1">
                {item.ticket_status}
              </span>
              <span className="flex gap-1">
                <Calendar className="w-[15px] h-[15px]" />
                {formatted}
              </span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
};
export default ShowSpecifiedTickets;
