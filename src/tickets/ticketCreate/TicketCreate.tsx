import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSearch } from "@/components/ui/SelectSearch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  Bold,
  CalendarIcon,
  ChevronDownIcon,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketCreate = () => {
  const [open, setOpen] = useState<Boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();
  const ticketStatusData = [
    { label: "Open", value: "Open" },
    { label: "Close", value: "Close" },
    { label: "Pending", value: "Pending" },
  ];
  const ticketStateData = [
    { label: "Todo", value: "Todo" },
    { label: "InProgress", value: "InProgress" },
    { label: "Canceled", value: "Canceled" },
    { label: "Resolved", value: "Resolved" },
    { label: "OnHold", value: "OnHold" },
  ];
  const ticketSeverityData = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];

  return (
    <div>
      <Dialog
        defaultOpen={true}
        onOpenChange={(isOpen) => !isOpen && navigate("/tickets")}
      >
        <DialogOverlay
          onClick={() => {
            navigate("/createTicket");
          }}
        />
        <DialogContent className="h-[95%] min-w-[80%] ">
          <DialogHeader>
            <DialogTitle>Create New Ticket </DialogTitle>
            <DialogDescription>
              <form className="w-full h-full text-black dark:text-white grid gap-10">
                <div className="w-full h-full grid grid-cols-4 gap-5 pt-5">
                  <div className=" w-full h-full col-span-3 flex flex-col gap-4 ">
                    <div className=" w-full h-full col-span-2 flex flex-col gap-4 ">
                      <div className="w-full h-full flex gap-10">
                        {/* <strong className="">Tickets Details</strong> */}
                        <div className="grid gap-2">
                          <Label>Ticket status</Label>
                          <SelectSearch
                            SelectSearchData={ticketStatusData}
                            title={"Select Status"}
                            size={"md"}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Ticket State</Label>
                          <SelectSearch
                            SelectSearchData={ticketStateData}
                            title={"Select State"}
                            size={"md"}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Ticket Severity</Label>
                          <SelectSearch
                            SelectSearchData={ticketSeverityData}
                            title={"Select Severity"}
                            size={"md"}
                          />
                        </div>
                      </div>
                      {/* subject and descr */}
                      <div className=" w-full h-full grid gap-2">
                        <Label>Summary(Subject)</Label>
                        <Input
                          placeholder="Enter Ticket Summary"
                          className="text-sm"
                        />
                      </div>
                      <div className="w-full h-full grid gap-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Provide Ticket Description"
                          className="h-16 text-sm resize-none"
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className=" w-full h-full col-span-2 flex flex-col gap-4 ">
                      {/* attachments */}
                      <div className=" w-full h-full grid gap-2">
                        <Label>Attachments</Label>
                        <Input type="file" className="text-sm" />
                      </div>
                      <div className="w-full h-full grid gap-2">
                        {/* here image will displayed */}
                      </div>
                    </div>
                    <div className=" w-full h-full col-span-2 flex flex-col gap-4 ">
                      {/* comments */}
                      <div className="w-full h-full grid  p-0">
                        <div className="border-1 border-black">
                          <ToggleGroup type="multiple">
                            <ToggleGroupItem
                              value="bold"
                              aria-label="Toggle bold"
                            >
                              <Bold className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="italic"
                              aria-label="Toggle italic"
                            >
                              <Italic className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="underline"
                              aria-label="Toggle underline"
                            >
                              <Underline className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="strikethrough"
                              aria-label="Toggle strikethrough"
                            >
                              <Strikethrough className="h-4 w-4" />
                            </ToggleGroupItem>

                            <ToggleGroupItem
                              value="numbering"
                              aria-label="Toggle numbering"
                            >
                              <ListOrdered className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem
                              value="pointing"
                              aria-label="Toggle pointing"
                            >
                              <List className="h-4 w-4" />
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>
                        <div className="border-x-1 border-b-1 border-black">
                          <Textarea
                            placeholder="Add Comment..."
                            className="h-10 text-sm resize-none border-0 outline-0"
                            rows={1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full grid gap-0">
                    <div className="w-full h-full grid gap-0 ">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">
                          Start Date
                        </Label>
                        <Popover onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-48 justify-between font-normal"
                            >
                              {startDate
                                ? startDate.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={startDate}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setStartDate(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">
                          End Date
                        </Label>
                        <Popover onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-48 justify-between font-normal"
                            >
                              {endDate
                                ? endDate.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={endDate}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setEndDate(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label>Assignee</Label>
                        <SelectSearch
                          SelectSearchData={ticketStatusData}
                          title={"Select Assignee"}
                          size={"md"}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Created by</Label>
                        <Input placeholder="ex: John Doe" className="text-sm w-[85%]" />
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 w-full h-full">
                  <div className="w-full h-full"></div>
                  <div className="w-full h-full grid grid-cols-2">
                    <div className="w-full h-full">
                      <span
                        className="cursor-pointer px-5 w-[70%] hover:bg-gray-50 uppercase hover:text-red-500 font-bold inline-flex items-center justify-center rounded-md border border-input  py-2 text-sm transition-colorshover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                          navigate("/tickets");
                        }}
                      >
                        close
                      </span>
                    </div>
                    <div className="w-full h-full">
                      <Button
                        className="hover:text-green-500 font-bold w-[70%]  uppercase"
                        variant={"outline"}
                      >
                        Create Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TicketCreate;
