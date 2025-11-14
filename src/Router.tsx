import TicketCreate from "./tickets/ticketCreate/TicketCreate";
import App from "./App";
import { useRoutes } from "react-router-dom";
import TicketsDashboard from "./tickets/TicketsDashboard";
import DeleteTicket from "./tickets/deletingTicket/DeleteTicket";
import UpdateTicket from "./tickets/updateTicket/UpdateTicket";
import OpenTicket from "./tickets/openTicket/OpenTicket";
import { Children } from "react";
export const AllRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "tickets",
          element: <TicketsDashboard />,
          //   index: true,
          children: [
            {
              path: "createTicket",
              element: <TicketCreate />,
            },
            {
              path: "view/:id",
              element: <OpenTicket />,
            },
            {
              path: "editTicket/:id",
              element: <UpdateTicket />,
            },
          ],
        },

        {
          path: "deleteTicket/:id",
          element: <DeleteTicket />,
        },
      ],
    },
  ];
  return useRoutes(routes);
};
