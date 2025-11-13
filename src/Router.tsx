import TicketCreate from "./tickets/ticketCreate/TicketCreate"
import App from "./App"
import { useRoutes } from "react-router-dom";
import TicketsDashboard from "./tickets/TicketsDashboard";
import DeleteTicket from "./tickets/deletingTicket/DeleteTicket";
import UpdateTicket from "./tickets/updateTicket/UpdateTicket";
import OpenTicket from "./tickets/openTicket/OpenTicket";
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
                    path : "view/:id",
                    element : <OpenTicket/>
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