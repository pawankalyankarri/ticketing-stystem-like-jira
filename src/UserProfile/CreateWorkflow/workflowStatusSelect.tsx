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
import { motion } from "motion/react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardWorkflowAPI } from "../boardWorkflowAPI/BoardWorkflowAPI";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faXmark } from "@fortawesome/free-solid-svg-icons";

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "200px",
    padding: "8px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="capitalize flex gap-2 items-center cursor-grab"
    >
      <FontAwesomeIcon icon={faGripVertical} />
      {id}
    </div>
  );
}

const WorkflowStatusSelect = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [statusData, setStatusData] = useState<string[]>([]);
  const [newStatus, setNewStatus] = useState<string>("");
  const params = useParams();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [data, setData] = useState({
    workflow_id: params.wfId ?? "",
    name: statusData,
  });
  const navigate = useNavigate();

  const { GetWorkflowStatus, CreateWorkflowStatus } = BoardWorkflowAPI();

  useEffect(() => {
    const getStatus = async () => {
      const response = await GetWorkflowStatus();
      if (response?.status === 200) {
        setStatusData(response.data.flow);
      }
    };
    getStatus();
  }, []);

  useEffect(() => {
    setData((prev) => ({ ...prev, name: statusData }));
  }, [statusData]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) {
      // setStatusData((items) => items.filter((item) => item !== active.id));
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = statusData.findIndex((item) => item === active.id);
      const newIndex = statusData.findIndex((item) => item === over.id);

      const updateStatus = arrayMove(statusData, oldIndex, newIndex);

      setStatusData(updateStatus);
      // setData((prev) => ({ ...prev, name: updateStatus }));
    }
  };

  function AddNewStatus() {
    setStatusData((prev) => {
      const updated = [...prev, newStatus];
      // setData((prevData) => ({ ...prevData, name: updated }));
      return updated;
    });
    setNewStatus("");
  }

  async function handleCrateWorkflow() {
    console.log("dta", data);
    const res = await CreateWorkflowStatus(data);
    console.log("response addnuewfun", res);
  }
  console.log(statusData);
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) navigate("/tickets");
      }}
    >
      <DialogContent className="  w-full h-[80%] overflow-hidden overflow-y-auto p-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.5,
          }}
        >
          <DialogHeader className="w-full ">
            <div className="w-full float-right">
              <FontAwesomeIcon
                onClick={() => navigate("/tickets")}
                icon={faXmark}
                className="cursor-pointer float-right p-1"
              />
            </div>

            <DialogTitle>Choose Workflow Order</DialogTitle>

            <DialogDescription></DialogDescription>
          </DialogHeader>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => {
              handleDragEnd(e);
              // setActiveId(null)
            }}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            // onDragCancel={() => setActiveId(null)}
          >
            <SortableContext
              items={statusData}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3 justify-start items-center mt-4 h-[300px] overflow-y-auto overflow-x-hidden ">
                {statusData.map((item) => (
                  <SortableItem key={item} id={item} />
                ))}
              </div>
            </SortableContext>
            {/* <DragOverlay>
              {activeId ? <SortableItem id={activeId} /> : null}
            </DragOverlay> */}
          </DndContext>

          <DialogFooter className="flex sm:flex-col mt-4 ">
            <div className="flex w-full items-center gap-2 mt-5 justify-center ">
              <Input
                type="text"
                placeholder="Enter Status"
                className="w-[50%] py-5"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              <Button type="submit" variant="outline" onClick={AddNewStatus}>
                Add
              </Button>
            </div>
            <div className="w-full flex justify-end">
              <Button
                className="bg-gray-500 hover:bg-gray-500 cursor-pointer "
                onClick={handleCrateWorkflow}
              >
                Create Workflow
              </Button>
            </div>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowStatusSelect;
