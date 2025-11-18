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
import { DropdownSearch } from "@/components/ui/dropdownSearch";
import { useState } from "react";

const CreateWorkflow = () => {
  const [formdata,setFormdata] = useState({
    workflowName : "",
    createdBy : ""
  
  })
  const navigate = useNavigate();

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log('form',formdata)
  }

  return (
    <Dialog open={true}>
      
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="overflow-y-auto">
          <div className="">
          <DialogHeader>
            <DialogTitle>Create Workflow</DialogTitle>
            <DialogDescription>
              {/* Make changes to your profile here. Click save when you&apos;re
              done. */}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              {/* <Label htmlFor="wn">Workflow Name</Label> */}
              <Input id="wn" name="wn" placeholder="Workflow Name" value={formdata.workflowName} onChange={(e)=>setFormdata((prev)=>({...prev,'workflowName': e.target.value}))}/>
            </div>
            <div className="grid gap-3">
              <Input id="cb" name="cb" placeholder="Created by" value={formdata.createdBy} onChange={(e)=>setFormdata((prev)=>({...prev,'createdBy':e.target.value}))} />
            </div>

            <div className="w-full flex justify-end"> 
              <Button type="submit" className="cursor-pointer">
              Create workflow
            </Button>
            </div>

             
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="text" placeholder="Enter Status..." />
              <Button type="submit" variant="outline">
                Add
              </Button>
            </div>
          </div>
           </form>
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
            
          </DialogFooter>
          </div>

        </DialogContent>
      
    </Dialog>
  );
};
export default CreateWorkflow;
