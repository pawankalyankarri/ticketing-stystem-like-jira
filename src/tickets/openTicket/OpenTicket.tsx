import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseTickets, type TicketType } from "../hooks/UseTickets";
import { Textarea } from "@/components/ui/textarea";
import TextareaAutosize from "react-textarea-autosize";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SelectSearch } from "@/components/ui/SelectSearch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faComment,
  faGears,
  faPlus,
  faTriangleExclamation,
  faUsers,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const OpenTicket = () => {
  const [ticketDetails, setTicketDetails] = useState<TicketType | null>(null);
  const [createdDateStr, setCreatedDateStr] = useState<String>("");
  const [createdTimeStr, setCreatedTimeStr] = useState<String>("");
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const { GetTicket } = UseTickets();
  const params = useParams();

  const ticketStateData = [
    { label: "ToDo", value: "ToDo" },
    { label: "InProgress", value: "InProgress" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Resolved", value: "Resolved" },
    { label: "OnHold", value: "OnHold" },
  ];

  const ticketSeverityData = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];

  useEffect(() => {
    if (params.id) {
      const fetch = async () => {
        const response = await GetTicket(String(params.id));
        setTicketDetails(response);
      };
      fetch();
    }
  }, []);
  console.log(ticketDetails);

  useEffect(() => {
    if (ticketDetails) {
      const date = new Date(ticketDetails?.created_at);
      const formattedDate = date
        .toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .replace(",", "");
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        second: undefined,
      });
      setCreatedDateStr(formattedDate);
      setCreatedTimeStr(formattedTime);
    }
  }, [ticketDetails]);


  const formatTimeAgo =  (dateStr:string) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diff = now.getTime() - date.getTime()
    // console.log(diff)
    const seconds = Math.floor(diff/1000)
    const minutes = Math.floor(diff/1000/60)
    const hours = Math.floor(diff/1000/60/60)
    const days = Math.floor(diff/1000/60/60/24)
    // console.log(seconds,minutes,hours,days)

    if(days>7){
      return date.toLocaleDateString("en-US",{
        day : "2-digit",
        month : "long",
        year : "numeric"
      })
    }
    if(days>=1) return `${days} day${days>1 ? "s" : ""} ago`
    if(hours>=1) return `${hours} hour${hours>1 ? "s" : ""} ago`
    if(minutes>=1) return `${minutes} minute${minutes>1 ? "s" : ""} ago`
    if(seconds>=1) return `${seconds} second ${seconds >1 ? "s" : ""} ago`

  }

  function formattedDate (dateStr:string){
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-US",{
        day : "2-digit",
        month : "short",
        year : "numeric"
      })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        val ? "" : navigate("/tickets");
      }}
    >
      {ticketDetails && (
        <DialogContent className="w-full! sm:w-[90%]! max-w-none! h-[90%]! border-0! shadow-none! focus-visible:outline-none! focus-visible:ring-0 gap-2 p-0 ">
          <DialogHeader className=" gap-0 sticky bg-gray-200 max-w-full py-3 h-fit rounded">
            <DialogTitle className="w-full px-2 flex justify-between items-center  ">
              <span className="border-2 border-orange-400 text-orange-400 p-1 text-sm px-2 rounded ">
                {ticketDetails.ticket_status}
              </span>
              <span className="float-right p-1.5 bg-gray-300" onClick={() => navigate("/tickets")}>
                <FontAwesomeIcon
                  icon={faX}
                  className="font-bold cursor-pointer"
                  size="sm"
                  
                />
              </span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription
            asChild
            className="text-black py-0 h-full overflow-hidden px-3"
          >
            <div className="grid grid-cols-3 gap-3 h-full ">
              <div className="col-span-2 h-full overflow-y-auto">
                <div>
                  <div className=" w-full h-full col-span-2 flex flex-col gap-4 ">
                    {/* comments */}
                    {/* <div className="w-full h-full grid  p-0">
                      <span className="font-bold text-lg">Description</span>

                      <div className="border-1 border-gray-300 rounded">
                        <ToggleGroup type="multiple">
                          <ToggleGroupItem
                            value="bold"
                            aria-label="Toggle bold"
                            onClick={() => {}}
                          >
                            <Bold className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="italic"
                            aria-label="Toggle italic"
                            onClick={() => {}}
                          >
                            <Italic className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="underline"
                            aria-label="Toggle underline"
                            onClick={() => {}}
                          >
                            <Underline className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="strikethrough"
                            aria-label="Toggle strikethrough"
                            onClick={() => {}}
                          >
                            <Strikethrough className="h-4 w-4" />
                          </ToggleGroupItem>

                          <ToggleGroupItem
                            value="numbering"
                            aria-label="Toggle numbering"
                            onClick={() => {}}
                          >
                            <ListOrdered className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="pointing"
                            aria-label="Toggle pointing"
                            onClick={() => {}}
                          >
                            <List className="h-4 w-4" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                      <div className="border-x-1 border-b-1 border-gray-300 rounded">
                        <TextareaAutosize
                          placeholder="Add Description..."
                          minRows={4}
                          className={cn(
                            " text-sm resize-none border-0 w-full  outline-0"
                            // bold && "font-bold!",
                            // italic && "italic",
                            // underline && "underline",
                            // strikethrough && "line-through"
                          )}
                          value={ticketDetails.description}
                          name="comment_text"
                          readOnly
                        />
                      </div>
                    </div> */}
                    <div>
                      <span className="text-lg font-bold">Description</span>
                      <p>{ticketDetails.description}</p>
                    </div>
                    <div>
                      <span className="text-lg font-bold">Summary</span>
                      <p>{ticketDetails.summary}</p>
                    </div>
                    <div>
                      <span className="text-lg font-bold">Comments</span>
                      <p>{ticketDetails.comment_text}</p>
                    </div>
                    <div>
                      <div className="">
                        <span className="text-lg font-bold">Activity</span>
                        <div className="w-full ">
                          <Tabs defaultValue="history" className="w-full">
                            <TabsList className="w-[400px]">
                              <TabsTrigger value="all" >All</TabsTrigger>
                              <TabsTrigger value="comment">
                                <FontAwesomeIcon icon={faComment} color="gray"/>
                                Comments
                              </TabsTrigger>
                              <TabsTrigger value="history">
                                <FontAwesomeIcon icon={faClockRotateLeft} />
                                History
                              </TabsTrigger>
                              <TabsTrigger value="worklogs">
                                <FontAwesomeIcon icon={faGears}/>
                                Worklogs
                              </TabsTrigger>
                            </TabsList> 
                            <TabsContent value="all">
                              Make changes to your account here.
                            </TabsContent>
                            <TabsContent value="comment">
                              Change your password here.
                            </TabsContent>
                            <TabsContent value="history">
                              
                              <div className="grid gap-5">
                                {ticketDetails.ticket_history.map((obj,idx)=>{
                                  return(
                                    <div className="flex flex-col gap-2" key={idx}>
                                      <span>{obj.action_msg}</span>
                                      <span>{formatTimeAgo(obj.processed_time)}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </TabsContent>
                            <TabsContent value="worklogs">
                              Worklogs
                            </TabsContent>
                          </Tabs>
                        </div> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-y-auto grid gap-5 h-fit">
                <Card>
                  <CardContent className="grid gap-4">
                    <div className="flex justify-between text-sm">
                      <p>Details</p>
                      <p className="underline">Add To Watchlist</p>
                    </div>
                    <div className="grid grid-cols-2">
                      <Label>Priority</Label>
                      <SelectSearch
                        SelectSearchData={ticketSeverityData}
                        title={"Select State"}
                        size={"sm"}
                        value={ticketDetails.ticket_severity}
                        onChange={() => {}}
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <Label>Due Date</Label>
                      {ticketDetails.end_date?<span className="border-2 border-red-500 w-fit text-red-500 p-1.5 rounded"><FontAwesomeIcon icon={faTriangleExclamation} /> {formattedDate(ticketDetails.end_date)}</span> : "NONE"}
                    </div>
                    <div className="grid grid-cols-2">
                      <Label>Collaborators</Label>
                      <span className="flex">
                      <Avatar>
                          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                          <AvatarFallback className="uppercase font-bold bg-white text-md  ">
                            <FontAwesomeIcon icon={faUsers} className="" size="lg" />
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="cursor-pointer">
                          <AvatarFallback className="uppercase font-bold bg-blue-950 text-md text-white ">
                            <FontAwesomeIcon icon={faPlus}  />
                          </AvatarFallback>
                        </Avatar>

                      </span>
                      
                    </div>
                    <div className="grid grid-cols-2">
                      <Label className="capitalize">assignee</Label>
                      <span className="flex items-center gap-2">
                        <Avatar>
                          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                          <AvatarFallback className="uppercase font-bold bg-blue-950 text-md text-white ">
                            {ticketDetails.assignee[0]}
                          </AvatarFallback>
                        </Avatar>
                        {ticketDetails.assignee}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex flex-col items-end">
                  {createdDateStr && createdTimeStr && (
                    <span>
                      Created &nbsp; {createdDateStr} at {createdTimeStr}
                    </span>
                  )}
                   <span>Updated {formatTimeAgo(ticketDetails.updated_at)}</span>
                </div>
               
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default OpenTicket;
