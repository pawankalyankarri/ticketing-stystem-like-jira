import { TicketsStore } from "@/Zustand/TicketsStore"
import axios from "axios"
import { useCallback, useRef } from "react"

export const UseTickets = () => {
    const {setTickets,setLoading,setError} = TicketsStore()
    const mountRef = useRef<Boolean>(false)

    const fetchAllTickets = useCallback(async()=>{
        // if(mountRef.current)return
        setLoading(true)
        try{
            const res = await axios.get("/api/ticketing")
            if(res.status === 200){
                setTickets(res.data.data)
            }
        }
        catch(err:any){
            setError(err?.message||'fetchalltickets error')
            console.log('err in fetchallTickets',err)
        }
        finally{
            setLoading(false)
        }
        

    },[])

    const deleteTicket = useCallback(async(ticketStrId:string)=>{
        try{
            const response = axios.post("/api/ticketing/delete-ticket",{delete_id : ticketStrId})
            console.log('delete',response)
        }
        catch(err){
            console.log('err deleteTicket',err)
        }
    },[])

    return{
        fetchAllTickets
    }
}