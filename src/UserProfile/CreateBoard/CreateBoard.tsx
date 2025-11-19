import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { MultiSelectCom } from "@/components/ui/MultiSelectCom";
import { useEffect, useState } from "react";
import { DropdownSearch } from "@/components/ui/dropdownSearch";
import { BoardWorkflowAPI } from "../boardWorkflowAPI/BoardWorkflowAPI";

interface BoardFormDataType {
  boardName: string;
  boardOwner: string;
  workflowId: string;
  access: string[];
}
const CreateBoard = () => {
  const [formdata, setFormdata] = useState<BoardFormDataType>({
    boardName: "",
    boardOwner: "",
    workflowId: "",
    access: [],
  });

  const [workflowOptions, setWorkflowOptions] = useState([]);

  const navigate = useNavigate();
  const { FetchWorkflows } = BoardWorkflowAPI();

  // const workflowOptions = [
  //   { value: "1", label: "w1" },
  //   { value: "2", label: "w2" },
  //   { value: "3", label: "w3" },
  // ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("formdata", formdata);
  }

  useEffect(() => {
    const GetWorkflows = async () => {
      const response = await FetchWorkflows();
      if (response?.status === 200) {
        console.log("resp", response.data.data);
        const formatted = response.data.data.map((item: any) => ({
          value: item.id,
          label: item.workflow_name,
        }));

        setWorkflowOptions(formatted);
      }
    };
    GetWorkflows();
  }, []);

  // console.log('workflows',workflowOptions)
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you&apos;re
              done. */}
          </DialogDescription>
        </DialogHeader>
        <form className="overflow-y-auto" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="bn">Board Name</Label>
              <Input
                id="bn"
                name="bn"
                value={formdata.boardName}
                onChange={(e) =>
                  setFormdata((prev) => ({
                    ...prev,
                    boardName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="adm">Board Owner</Label>
              <Input id="adm" name="adm" value={formdata.boardOwner} onChange={(e)=>setFormdata((prev)=>({...prev,boardOwner:e.target.value}))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="wn">Workflow Name</Label>
              {/* <Input id="wn" name="wn"  /> */}
              {/* <MultiSelectCom
                options={workflowOptions}
                value={formdata.workflowName}
                onValueChange={(val) =>
                  setFormdata({ ...formdata, workflowName: val })
                }
              /> */}

              <DropdownSearch
                dropdownData={workflowOptions}
                title="Workflow"
                value={formdata.workflowId}
                size="370"
                onChange={(val) =>
                  setFormdata({ ...formdata, workflowId: val })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="acc">Access</Label>
              <Input id="acc" name="acc" />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => navigate("/tickets")}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              Create Board
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateBoard;
