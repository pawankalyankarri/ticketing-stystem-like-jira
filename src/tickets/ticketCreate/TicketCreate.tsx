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
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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
import { toast } from "sonner";
import { UseTickets } from "../hooks/UseTickets";

export interface TicketFormDataType {
  ticket_status: string;
  ticket_state: string;
  ticket_severity: string;
  summary: string;
  description: string;
  file_attachment: string[];
  comment_text: string;
  start_date: string | null;
  end_date: string | null;
  assignee: string;
  created_by: string;
}

const TicketCreate = () => {
  const [open, setOpen] = useState<Boolean>(false);
  const [keyval, setKeyval] = useState<number>(0);
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);
  const [strikethrough, setStrikethrough] = useState<boolean>(false);
  const [numbering, setNumbering] = useState<boolean>(false);
  const [pointing, setPointing] = useState<boolean>(false);
  const [formData, setFormData] = useState<TicketFormDataType>({
    ticket_status: "",
    ticket_state: "",
    ticket_severity: "",
    summary: "",
    description: "",
    file_attachment: [],
    comment_text: "",
    start_date: null,
    end_date: null,
    assignee: "",
    created_by: "",
  });
  const { CreateTicket } = UseTickets();
  const navigate = useNavigate();
  const ticketStatusData = [
    { label: "Open", value: "Open" },
    { label: "Close", value: "Close" },
    { label: "Pending", value: "Pending" },
  ];
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

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files
        ? Array.from(files).map((file) => URL.createObjectURL(file))
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("data", formData);
    // try {
    //   await axios
    //     .post("/api/ticketing/create-ticket", formData, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((res) => {
    //       res.status === 200
    //         ? toast.success(res.data.message || "Ticket created successfully!")
    //         : toast.warning(res.data.message);
    //       navigate("/tickets");
    //     })
    //     .catch((err) => console.log("err", err));
    // } catch (error) {

    //   console.error("Error creating ticket:", error);
    // }

    await CreateTicket({
      data: formData,
      fileStr: formData.file_attachment[0] ?? "",
    });
    navigate("/tickets");
  };

  // console.log('bold:',bold,'italic:',italic,'underline:',underline,'strikethrough:',strikethrough,'numbering:',numbering,'pointing:',pointing);
  return (
    <div>
      <Dialog
        open
        defaultOpen={true}
        onOpenChange={(isOpen) => !isOpen && navigate("/tickets")}
      >
        <DialogOverlay
          onClick={() => {
            navigate("/createTicket");
          }}
        />
        <DialogContent className="h-[95%] min-w-[80%] overflow-y-auto  ">
          <DialogTitle>Create New Ticket </DialogTitle>

          <div className="w-full h-full">
            <form
              className="w-full h-full text-black dark:text-white grid gap-10"
              onSubmit={handleSubmit}
            >
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
                          value={formData.ticket_status}
                          onChange={handleSelectChange("ticket_status")}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Ticket State</Label>
                        <SelectSearch
                          SelectSearchData={ticketStateData}
                          title={"Select State"}
                          size={"md"}
                          value={formData.ticket_state}
                          onChange={handleSelectChange("ticket_state")}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Ticket Severity</Label>
                        <SelectSearch
                          SelectSearchData={ticketSeverityData}
                          title={"Select Severity"}
                          size={"md"}
                          value={formData.ticket_severity}
                          onChange={handleSelectChange("ticket_severity")}
                        />
                      </div>
                    </div>
                    {/* subject and descr */}
                    <div className=" w-full h-full grid gap-2">
                      <Label htmlFor="summary">Summary(Subject)</Label>
                      <Input
                        id="summary"
                        name="summary"
                        placeholder="Enter Ticket Summary"
                        className="text-sm"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full h-full grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Provide Ticket Description"
                        className="h-16 text-sm resize-none"
                        rows={2}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className=" w-full h-full col-span-2 flex flex-col gap-4 ">
                    {/* attachments */}
                    <div className=" w-full h-full grid gap-2">
                      <Label htmlFor="file_attachment">Attachments</Label>
                      <Input
                        type="file"
                        id="file_attachment"
                        name="file_attachment"
                        className="text-sm"
                        key={keyval}
                        onChange={handleInputChange}
                      />
                    </div>
                    <>
                      {formData.file_attachment &&
                        formData.file_attachment.length > 0 &&
                        formData.file_attachment.some((url) => url) && ( //  check for non-empty strings
                          <div className="w-[200px] h-[200px] grid gap-2">
                            {/* Render images */}
                            {formData.file_attachment.map((url, idx) =>
                              url ? (
                                <div
                                  className="relative w-full h-full  "
                                  key={idx}
                                >
                                  <img
                                    src={url}
                                    alt={`Attachment ${idx}`}
                                    className="w-32 h-32 object-cover rounded"
                                  />
                                  <span className="absolute right-20 top-1 z-0 hover:z-10 ">
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="text-red-500 cursor-pointer"
                                      onClick={() =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          file_attachment: [],
                                        }))
                                      }
                                    />
                                  </span>
                                </div>
                              ) : null
                            )}

                            {/* Render trash icon only if images exist */}
                          </div>
                        )}
                    </>
                  </div>
                  <div className=" w-full h-full col-span-2 flex flex-col gap-4 ">
                    {/* comments */}
                    <div className="w-full h-full grid  p-0">
                      <div className="border-1 border-black">
                        <ToggleGroup type="multiple">
                          <ToggleGroupItem
                            value="bold"
                            aria-label="Toggle bold"
                            onClick={() => setBold(!bold)}
                          >
                            <Bold className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="italic"
                            aria-label="Toggle italic"
                            onClick={() => setItalic(!italic)}
                          >
                            <Italic className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="underline"
                            aria-label="Toggle underline"
                            onClick={() => setUnderline(!underline)}
                          >
                            <Underline className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="strikethrough"
                            aria-label="Toggle strikethrough"
                            onClick={() => setStrikethrough(!strikethrough)}
                          >
                            <Strikethrough className="h-4 w-4" />
                          </ToggleGroupItem>

                          <ToggleGroupItem
                            value="numbering"
                            aria-label="Toggle numbering"
                            onClick={() => setNumbering(!numbering)}
                          >
                            <ListOrdered className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="pointing"
                            aria-label="Toggle pointing"
                            onClick={() => setPointing(!pointing)}
                          >
                            <List className="h-4 w-4" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                      <div className="border-x-1 border-b-1 border-black">
                        <Textarea
                          placeholder="Add Comment..."
                          className={cn(
                            "h-10 text-sm resize-none border-0  outline-0",
                            bold && "font-bold!",
                            italic && "italic",
                            underline && "underline",
                            strikethrough && "line-through"
                          )}
                          rows={1}
                          name="comment_text"
                          onChange={handleInputChange}
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
                            {formData.start_date
                              ? new Date(
                                  formData?.start_date
                                ).toLocaleDateString()
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
                            selected={
                              formData.start_date
                                ? new Date(formData.start_date)
                                : undefined
                            }
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              if (!date) return;
                              setFormData((prev) => ({
                                ...prev,
                                start_date: date.toISOString(),
                              }));
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
                            {formData.end_date
                              ? new Date(formData.end_date).toLocaleDateString()
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
                            selected={
                              formData.end_date
                                ? new Date(formData.end_date)
                                : undefined
                            }
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              if (!date) return;
                              setFormData((prev) => ({
                                ...prev,
                                end_date: date.toISOString(),
                              }));
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
                        value={formData.assignee}
                        onChange={handleSelectChange("assignee")}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="created_by">Created by</Label>
                      <Input
                        placeholder="ex: John Doe"
                        className="text-sm w-[85%]"
                        id="created_by"
                        name="created_by"
                        onChange={handleInputChange}
                      />
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TicketCreate;
