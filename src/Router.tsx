import TicketCreate from "./tickets/ticketCreate/TicketCreate";
import App from "./App";
import { useRoutes } from "react-router-dom";
import TicketsDashboard from "./tickets/TicketsDashboard";
import DeleteTicket from "./tickets/deletingTicket/DeleteTicket";
import UpdateTicket from "./tickets/updateTicket/UpdateTicket";
import OpenTicket from "./tickets/openTicket/OpenTicket";
import { Children } from "react";
import CreateBoard from "./UserProfile/CreateBoard/CreateBoard";
import CreateWorkflow from "./UserProfile/CreateWorkflow/CreateWorkflow";
import WorkflowStatusSelect from "./UserProfile/CreateWorkflow/workflowStatusSelect";
import BoardsPage from "./UserProfile/Boards/BoardsPage";
import AddUserPage from "./UserProfile/addUser/AddUserPage";
import { SignupForm } from "./components/signup-form";
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
            {
              path: "createBoard",
              element: <CreateBoard />,
            },
            {
              path: "createWorkflow",
              element: <CreateWorkflow />,
            },
            {
              path: "statusSelect/:wfId",
              element: <WorkflowStatusSelect />,
            },
          ],
        },
        {
          path: "boards",
          element: <BoardsPage />,
        },
        {
          path: "addUser",
          element: <AddUserPage />,
        },

        {
          path: "deleteTicket/:id",
          element: <DeleteTicket />,
        },
      ],
    },
    {
      path: "loginPage",
      element: <SignupForm />,
    },
  ];
  return useRoutes(routes);
};
