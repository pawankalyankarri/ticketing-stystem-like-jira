import axios from "axios";
import {create} from "zustand";

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
  id: number;
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
}

export type TicketHistory = {
  action?: string;
  updated_by?: string;
  updated_at?: string;
  [key: string]: any;
}

interface TicketState {
    tickets : TicketType[],
    loading : boolean,
    error : string | null,
    getTickets : () => void;
    refreshTickets : () => void;
}

export const TicketsStore = create<TicketState>((set,get) => ({
    tickets : [],
    loading : false,
    error : null,
    getTickets : async () => {
        set({loading : true, error : null})
        
        await axios.get("/api/ticketing").then((res)=>set({tickets : res.data.data,loading : false})).catch((err)=>set({error:err.message,loading:false}))
        
    },
    refreshTickets : async () => {
        await get().getTickets()
    }


}) )