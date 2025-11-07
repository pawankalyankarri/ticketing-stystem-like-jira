import TicketCreate from "./tickets/ticketCreate/TicketCreate"
import App from "./App"
import { useRoutes } from "react-router-dom";
import TicketsDashboard from "./tickets/TicketsDashboard";
export const  AllRoutes = () => {
    const routes = [
        {
            path : "/",
            element : <App/>,
            children : [
                {
                    path : "/",
                    element : <TicketsDashboard/>,
                    index : true,
                },
                {
                    path : "createTicket",
                    element : <TicketCreate/>
                    
                }
            ]
        }

    ]
    return useRoutes(routes);

}