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

const OpenTicket = () => {
  const [ticketDetails, setTicketDetails] = useState<TicketType | {}>({});
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
  return (
    <Dialog defaultOpen>
      <DialogContent className="w-full! sm:w-[90%]! max-w-none! h-[90%]! border-0! shadow-none! focus-visible:outline-none! focus-visible:ring-0">
        <DialogHeader>
          <DialogTitle className="w-full">Are you absolutely sure?</DialogTitle>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <div>
                <div className=" w-full h-full col-span-2 flex flex-col gap-4 ">
                  {/* comments */}
                  <div className="w-full h-full grid  p-0">
                    <div className="border-1 border-black">
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
                    <div className="border-x-1 border-b-1 border-black">
                      <Textarea
                        placeholder="Add Comment..."
                        className={cn(
                          "h-10 text-sm resize-none border-0  outline-0"
                          // bold && "font-bold!",
                          // italic && "italic",
                          // underline && "underline",
                          // strikethrough && "line-through"
                        )}
                        name="comment_text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <Card>
                <CardContent className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <p>Details</p>
                    <p className="underline">Add To Watchlist</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <Label>Ticket Severity</Label>
                    <SelectSearch
                      SelectSearchData={ticketSeverityData}
                      title={"Select State"}
                      size={"sm"}
                      value={""}
                      onChange={()=>{}}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OpenTicket;
