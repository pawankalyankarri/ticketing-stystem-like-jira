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
import { useState } from "react";


interface BoardFormDataType{
   boardName: string,
    boardOwner: string,
    workflowName: string[],
    access: string[],
}
const CreateBoard = () => {
  const [formdata, setFormdata] = useState<BoardFormDataType>({
    boardName: "",
    boardOwner: "",
    workflowName: [],
    access: [],
  });

  const navigate = useNavigate();

  const workflowOptions = [
    { value: "1", label: "w1" },
    { value: "2", label: "w2" },
    { value: "3", label: "w3" },
  ];

  function handleSubmit (e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log('formdata',formdata)
  }
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
              <Input id="bn" name="bn"  value={formdata.boardName} onChange={(e)=>setFormdata((prev)=>({...prev,boardName:e.target.value}))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="adm">Board Owner</Label>
              <Input id="adm" name="adm"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="wn">Workflow Name</Label>
              {/* <Input id="wn" name="wn"  /> */}
              <MultiSelectCom
                options={workflowOptions}
                value={formdata.workflowName}
                onValueChange={(val) =>
                  setFormdata({ ...formdata, workflowName: val })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="acc">Access</Label>
              <Input id="acc" name="acc"  />
            </div>
          </div>
          <DialogFooter>
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
