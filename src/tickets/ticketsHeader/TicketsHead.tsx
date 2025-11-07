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

const TicketsHead = () => {
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
  return (
    <Card className="p-1.5 rounded grid grid-cols-2 text-sm">
      <div className=""></div>
      <div className="flex justify-end gap-2 items-center">
        <span className="relative flex justify-center items-center ">
          <FontAwesomeIcon icon={faSearch} className="absolute left-2" />
          <Input className="pl-8" />
        </span>
        <span>
          <SelectSearch SelectSearchData={severityData} title={"All Severity"} size = {"sm"} />
        </span>
        <span>
          <SelectSearch SelectSearchData={StatusData} title={"All Status"} size = {"sm"}/>
        </span>
        
        <span className="p-1.5 outline-1 rounded shadow">
          <FontAwesomeIcon icon={faRefresh} />
        </span>
        <span className="p-1.5 outline-1 rounded shadow">
          <FontAwesomeIcon icon={faCodeMerge} />
        </span>
        <Button className="p-0 bg-blue-500 hover:bg-blue-800" onClick={()=>navigate('/createTicket')}>
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Create
        </Button>
      </div>
    </Card>
  );
};

export default TicketsHead;
