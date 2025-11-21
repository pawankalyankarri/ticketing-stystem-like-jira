import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AtSign, Bold, Image, Italic, List, ListOrdered, Smile, Strikethrough, Underline } from "lucide-react";
import { motion } from "motion/react";
const TicketCommnets = () => {
  return (
    <motion.div className="w-full  bg-gray-100 min-h-screen">
      <div className="w-full h-full">
        <form className="w-full h-full flex gap-5 flex-col">
          <div className="w-full h-full">
            <div>
              <ToggleGroup type="single">
                <ToggleGroupItem value="bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic"><Italic className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="underline"><Underline className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="strikeThrough"><Strikethrough className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="listOrdered"><ListOrdered className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="list"><List className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="image"><Image className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="atSign"><AtSign className="h-4 w-4"/></ToggleGroupItem>
                <ToggleGroupItem value="smile"><Smile className="h-4 w-4"/></ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Textarea
              placeholder="Add a comment..."
              rows={3}
              className="resize-none"
            ></Textarea>
          </div>
          <div className="w-full h-full flex  gap-5">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 w-fit font-bold"
            >
              Send
            </Button>
            <Button className="bg-transparent hover:bg-gray-100 text-gray-500 w-fit font-bold">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default TicketCommnets;


