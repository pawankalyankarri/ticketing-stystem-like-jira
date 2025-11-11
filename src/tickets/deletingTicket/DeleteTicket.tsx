import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TicketsStore } from "@/Zustand/TicketsStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const DeleteTicket = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    setOpen(true);
  }, []);
  async function deleteTicket() {
    await axios
      .post("/api/ticketing/delete-ticket", {delete_id : id})
      .then((res) => {
        res.data.status ? toast.success(res.data.message) : toast.error(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/tickets");
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete Ticket?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              navigate("/tickets");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteTicket();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteTicket;
