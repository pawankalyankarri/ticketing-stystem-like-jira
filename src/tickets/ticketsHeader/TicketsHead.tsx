import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeMerge,
  faPlus,
  faRefresh,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input";
import { SelectSearch } from "@/components/ui/SelectSearch";
import { useNavigate } from "react-router-dom";
import { UseTickets, type TicketType } from "../hooks/UseTickets";
import { useEffect, useState, type InputEvent } from "react";

interface TicketHeadProps {
  setRefresh: (value: boolean) => void;
}

const TicketsHead = () => {
  const [ticketId, setTicketId] = useState<string>("");
  const [allTickets, setAllTickets] = useState<TicketType[]>([])
  const { fetchAllTickets } = UseTickets();
  // const { tickets, setTickets } = TicketsStore();
  const navigate = useNavigate();



  const severityData = [
    { label: "All Severity", value: "All Severity" },
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];
  const StatusData = [
    { label: "All Status", value: "All " },
    { label: "Open", value: "Open" },
    { label: "Close", value: "Close" },
    { label: "Pending", value: "Pending" },
  ];

  // useEffect(()=>{
  //   setAllTickets(tickets)
  // },[])

  // console.log('alltic',allTickets)
  // console.log('tkts',tickets)

  async function ticketIdSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTicketId(value);

    const filteredTickets = allTickets.filter((item) =>
      item.ticket_id.toLowerCase().includes(value.toLowerCase())
    );
    // setTickets(filteredTickets);
  }

  return (
    <Card className="p-1.5 rounded grid grid-cols-2 text-sm">
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
            size={"sm"}
            value={""}
            onChange={() => {}}
          />
        </span>
        <span>
          <SelectSearch
            SelectSearchData={StatusData}
            title={"All Status"}
            size={"sm"}
            value={""}
            onChange={() => {}}
          />
        </span>

        <span
          className="p-1.5 outline-1 rounded shadow cursor-pointer"
          onClick={() => fetchAllTickets()}
        >
          <FontAwesomeIcon icon={faRefresh} />
        </span>
        <span className="p-1.5 outline-1 rounded shadow cursor-pointer">
          <FontAwesomeIcon icon={faCodeMerge} />
        </span>
        <Button
          className="p-0 bg-blue-500 hover:bg-blue-800 cursor-pointer"
          onClick={() => navigate("/createTicket")}
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Create
        </Button>
      </div>
    </Card>
  );
};

export default TicketsHead;
