import TicketCreate from "./tickets/ticketCreate/TicketCreate"
import App from "./App"
import { useRoutes } from "react-router-dom";
import TicketsDashboard from "./tickets/TicketsDashboard";
import DeleteTicket from "./tickets/deletingTicket/DeleteTicket";
import UpdateTicket from "./tickets/updateTicket/UpdateTicket";
export const  AllRoutes = () => {
    const routes = [
        {
            path : "/",
            element : <App/>,
            children : [
                {
                    path : "tickets",
                    element : <TicketsDashboard/>,
                    index : true,
                },
                {
                    path : "createTicket",
                    element : <TicketCreate/>
                    
                },
                {
                    path : "deleteTicket/:id",
                    element : <DeleteTicket/>,
                },
                {
                    path : "editTicket/:id",
                    element : <UpdateTicket/>
                }
            ]
        }

    ]
    return useRoutes(routes);

}