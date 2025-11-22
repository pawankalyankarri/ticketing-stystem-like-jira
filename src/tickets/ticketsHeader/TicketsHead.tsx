import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeMerge,
  faGrip,
  faListUl,
  faPlus,
  faRefresh,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { SelectSearch } from "@/components/ui/SelectSearch";
import { useNavigate } from "react-router-dom";
import { UseTickets, type TicketType } from "../hooks/UseTickets";
import {
  useEffect,
  useState,
  type Dispatch,
  type InputEvent,
  type SetStateAction,
} from "react";
import { cn } from "@/lib/utils";

interface TicketHeadProps {
  tickets: TicketType[];
  setTickets: Dispatch<SetStateAction<TicketType[]>>;
  gridCols: boolean;
  setGridCols: Dispatch<SetStateAction<boolean>>;
}

const TicketsHead = ({
  tickets,
  setTickets,
  gridCols,
  setGridCols,
}: TicketHeadProps) => {
  const [ticketId, setTicketId] = useState<string>("");
  // const [allTickets, setAllTickets] = useState<TicketType[]>([])
  const [severity, setSeverity] = useState<string>("All Severity");
  const [tStatus, setTStatus] = useState<string>("All Status");
  const { fetchAllTickets, loading } = UseTickets();
  // const { tickets, setTickets } = TicketsStore();
  const navigate = useNavigate();

  const severityData = ["All Severity", "Low", "Medium", "High", "Critical"];
  const StatusData = ["All Status", "Open", "Close", "Pending"];

  // useEffect(()=>{
  //   setTickets(tickets)
  // },[])

  // console.log('alltic',allTickets)
  // console.log('tkts',tickets)

  async function ticketIdSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTicketId(value);
    console.log(value);
    const res = await fetchAllTickets();

    const filteredTickets = res.filter(
      (item: TicketType) =>
        item.ticket_id.toLowerCase().includes(value.toLowerCase()) ||
        item.summary.toLowerCase().includes(value.toLowerCase())
    );
    setTickets(filteredTickets);
  }
  const refreshTickets = async () => {
    const res = await fetchAllTickets();
    setTickets(res);
    setSeverity("All Severity");
    setTStatus("All Status");
    setTicketId("");
  };

  async function handleSeverityChange(val: string) {
    setSeverity(val);
    console.log("val", val);
    const res = await fetchAllTickets();
    if (val === "" || val === "All Severity") {
      setTickets(res);
      return;
    }
    const tkts = res.filter((t: TicketType) => t.ticket_severity === val);
    setTickets(tkts);
  }
  async function handleStatusChange(val: string) {
    setTStatus(val);
    console.log("val", val);
    const res = await fetchAllTickets();
    if (val === "" || val === "All Status") {
      setTickets(res);
      return;
    }
    const tkts = res.filter((t: TicketType) => t.ticket_status === val);
    setTickets(tkts);
  }

  return (
    <Card className="p-1.5 rounded grid grid-cols-2 text-sm w-full h-full bg-transparent">
      <div className=""></div>
      <div className="flex justify-end gap-2 items-center">
        <span className="relative flex justify-center items-center ">
          <FontAwesomeIcon icon={faSearch} className="absolute left-2" />
          <Input
            className="pl-8 text-xs"
            value={ticketId}
            onChange={(e) => ticketIdSearchChange(e)}
          />
        </span>
        <span>
          <SelectSearch
            SelectSearchData={severityData}
            title={"All Severity"}
            size={"xs"}
            value={severity}
            onChange={handleSeverityChange}
          />
        </span>
        <span>
          <SelectSearch
            SelectSearchData={StatusData}
            title={"All Status"}
            size={"xs"}
            value={tStatus}
            onChange={handleStatusChange}
          />
        </span>

        <span
          className="p-1.5 outline-1 rounded shadow cursor-pointer"
          onClick={refreshTickets}
        >
          <FontAwesomeIcon
            icon={faRefresh}
            className={cn(loading ? "animate-spin" : "")}
          />
        </span>
        <span className="p-1.5 outline-1 rounded shadow cursor-pointer">
          <FontAwesomeIcon icon={faCodeMerge} />
        </span>
        <span onClick={() => setGridCols(false)} className="cursor-pointer">
          <FontAwesomeIcon icon={faGrip} />
        </span>
        <span onClick={() => setGridCols(true)} className="cursor-pointer">
          <FontAwesomeIcon icon={faListUl} />
        </span>
        <Button
          className="p-0 bg-blue-500 hover:bg-blue-800 cursor-pointer"
          onClick={() => navigate("/tickets/createTicket")}
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Create
        </Button>
      </div>
    </Card>
  );
};

export default TicketsHead;
