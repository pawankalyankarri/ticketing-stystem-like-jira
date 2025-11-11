import { TicketsStore } from "@/Zustand/TicketsStore";
import axios from "axios";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
import type { TicketFormDataType } from "../ticketCreate/TicketCreate";

interface UpdateTicketStatusProps {
  ticket_id: string;
  ticket_state: string;
}

interface CreateTicketDataProps {
  data: TicketFormDataType;
  fileStr: string;
}

export const UseTickets = () => {
  const { setTickets, setLoading, setError } = TicketsStore();
  const mountRef = useRef<Boolean>(false);

  const fetchAllTickets = useCallback(async () => {
    // if(mountRef.current)return
    setLoading(true);
    try {
      const res = await axios.get("/api/ticketing");
      if (res.status === 200) {
        setTickets(res.data.data);
      }
    } catch (err: any) {
      setError(err?.message || "fetchalltickets error");
      console.log("err in fetchallTickets", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTicket = useCallback(async (ticketStrId: string) => {
    try {
      const response = await axios.post("/api/ticketing/delete-ticket", {
        delete_id: ticketStrId,
      });
      console.log("delete", response);
      fetchAllTickets();
      toast.success(response.data.message || "Ticket deleted succefully!");
    } catch (err) {
      console.log("err deleteTicket", err);
    }
  }, []);

  const UpdateTicketStatus = useCallback(
    async ({ ticket_id, ticket_state }: UpdateTicketStatusProps) => {
      console.log(ticket_id, ticket_state);
      try {
        const response = await axios.post("/api/ticketing/drag-card", {
          ticket_id,
          ticket_state,
        });
        console.log(response);
      } catch (err) {
        console.log("err", err);
      }
    },
    []
  );

  const CreateTicket = useCallback(
    async ({ data, fileStr }: CreateTicketDataProps) => {
      try {
        const response = await axios
          .post("/api/ticketing/create-ticket", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          
        console.log('resp',response.data)
        const tktId = response.data.Ticket.ticket_id
        const res = await axios.post("/api/ticketing/attach-file",{ticket_id : tktId,file_path:fileStr})
        // console.log('res',res)
        toast.success(response.data.Message || "Ticket Created successfully!")
        fetchAllTickets()
          
      } catch (error) {
        console.error("Error creating ticket:", error);
      }
    },
    []
  );

  const GetTicket = useCallback(async(tktId:string)=>{
        try{
            const response = await axios.get(`/api/ticketing/${tktId}`)
            console.log('getticket',response)
            return response.data
        }
        catch(err){
            console.log('getticket',err)
        }
  },[])

  const EditTicket = useCallback(async(tktId:string)=>{
        try{
            // const ticketDetails = await GetTicket(tktId)
            // console.log('edittkt',ticketDetails)
        }
        catch(err){
            console.log('edittkt',err)
        }
  },[])

  return {
    fetchAllTickets,
    deleteTicket,
    UpdateTicketStatus,
    CreateTicket,
    EditTicket,
    GetTicket,

  };
};
