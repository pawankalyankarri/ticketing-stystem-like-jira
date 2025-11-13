// import { TicketsStore } from "@/Zustand/TicketsStore";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { TicketFormDataType } from "../ticketCreate/TicketCreate";

interface UpdateTicketStatusProps {
  ticket_id: string;
  ticket_state: string;
}

export type TicketType = {
  assignee: string;
  comment_attachment_path: string;
  comment_id: string;
  comment_text: string;
  created_at: string;
  created_by: string;
  description: string;
  end_date: string;
  entity_id: string | null;
  file_attachment: string[];
  file_attachment_id: string;
  file_attachment_name: string;
  id: string;
  merge_history: any | null;
  merge_status: boolean;
  start_date: string;
  summary: string;
  ticket_history: TicketHistory[];
  ticket_id: string;
  ticket_name: string;
  ticket_severity: string;
  ticket_state: string;
  ticket_status: string;
  updated_at: string;
};

export type TicketHistory = {
  action?: string;
  updated_by?: string;
  updated_at?: string;
  [key: string]: any;
};

interface CreateTicketDataProps {
  data: TicketFormDataType;
  fileStr: string;
}

export const UseTickets = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // const { setTickets, setLoading, setError } = TicketsStore();
  const mountRef = useRef<boolean>(false);

  const fetchAllTickets = useCallback(async () => {
    // if(mountRef.current)return
    setLoading(true);
    try {
      const res = await axios.get("/api/ticketing");
      if (res.status === 200) {
        setTickets(res.data.data);
        return res.data.data;
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
      // fetchAllTickets();
      toast.error(response.data.message || "Ticket deleted succefully!");
    } catch (err) {
      console.log("err deleteTicket", err);
    }
  }, []);

  const UpdateTicketStatus = useCallback(
    async ({ ticket_id, ticket_state }: UpdateTicketStatusProps) => {
      console.log(ticket_id, ticket_state);
      setLoading(true)
      try {
        const response = await axios.post("/api/ticketing/drag-card", {
          ticket_id,
          ticket_state,
        });
        console.log("updateticketstatus", response);
        // if(response.status == 200){
        //   await fetchAllTickets()
        // }
        // if (response.status === 200) {
        //   setTickets((prev) =>
        //     prev.map((ticket) =>
        //       ticket.id === ticket_id
        //         ? { ...ticket, ticket_state } // update state locally
        //         : ticket
        //     )
        //   );
        // }
        return response;
      } catch (err) {
        console.log("err", err);
      }
      finally{
        setLoading(false)
      }
    },
    [fetchAllTickets]
  );

  const CreateTicket = useCallback(
    async ({ data, fileStr }: CreateTicketDataProps) => {
      setLoading(true)
      try {
        const response = await axios.post(
          "/api/ticketing/create-ticket",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("resp", response.data);
        const tktId = response.data.Ticket.ticket_id;
        const res = await axios.post("/api/ticketing/attach-file", {
          ticket_id: tktId,
          file_path: fileStr,
        });
        // console.log('res',res)
        toast.success(response.data.Message || "Ticket Created successfully!");
        fetchAllTickets();
      } catch (error) {
        console.error("Error creating ticket:", error);
      }
      finally{
        setLoading(false)
      }
    },
    []
  );

  const GetTicket = useCallback(async (tktId: string) => {
    if(mountRef.current)return
    mountRef.current = true
    setLoading(true)
    try {
      const response = await axios.get(`/api/ticketing/${tktId}`);
      console.log("getticket", response);
      return response.data;
    } catch (err) {
      console.log("getticket", err);
    }
    finally{
      setLoading(false)
    }
  }, []);

  const EditTicket = useCallback(async (data: TicketFormDataType) => {
    console.log("data", data);
    setLoading(true)
    try {
      data.file_attachment.length === 0 ? data.file_attachment.push("") : "";
      const response = await axios.post("/api/ticketing/update-ticket", data);
      console.log("edittkt", response);
      return response;
    } catch (err) {
      console.log("edittkt", err);
    }
    finally{
      setLoading(false)
    }
  }, []);

  return {
    tickets,
    error,
    loading,
    fetchAllTickets,
    deleteTicket,
    UpdateTicketStatus,
    CreateTicket,
    EditTicket,
    GetTicket,
  };
};
