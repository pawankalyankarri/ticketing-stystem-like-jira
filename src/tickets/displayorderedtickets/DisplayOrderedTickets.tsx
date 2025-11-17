import type { TicketType } from "../hooks/UseTickets";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface DisplayOrderedTicketsProps {
  allTickets: TicketType[];
}
const DisplayOrderedTickets = ({ allTickets }: DisplayOrderedTicketsProps) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead className="w-[100px]">TicketId</TableHead>
            <TableHead>Task Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTickets.map((tkt, idx) => {
            return (
              <TableRow key={idx} className=" ">
                <TableCell className="font-medium">{tkt.ticket_id}</TableCell>
                <TableCell className=" ">{tkt.summary}</TableCell>
                <TableCell>{tkt.ticket_status}</TableCell>
                <TableCell className="text-right">{tkt.assignee}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default DisplayOrderedTickets;
