import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 justify-center items-center">
          <Avatar className="cursor-pointer">
            <AvatarFallback className="uppercase font-bold bg-blue-950 text-md text-white ">
              A
            </AvatarFallback>
          </Avatar>
          <span>Admin</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Manage Board</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/tickets/createBoard")}
                >
                  Crate Board
                </DropdownMenuItem>
                <DropdownMenuItem>More</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

         
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Workflow Settings</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/tickets/createWorkflow")}
                >
                  Crate Workflow
                </DropdownMenuItem>
                <DropdownMenuItem>More</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>



          <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UserProfilePage;
