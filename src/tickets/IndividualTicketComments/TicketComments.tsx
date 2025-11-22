import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AtSign,
  Bold,
  Image,
  Italic,
  List,
  ListOrdered,
  Smile,
  Strikethrough,
  Underline,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CommentsType {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
    edited: boolean;
}


const TicketCommnets = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [isEditing,setIsEditing] = useState<string|null>(null)
  const [editContent,setEditContent] = useState<string>("")
  const [comments, setComments] = useState<CommentsType[]>([
      {
        id: "1",
        author: 'Pawan Kalyan',
        avatar: 'PK',
        content: 'This looks great! Can we add more features? \n hi',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        edited: false
      }
    ]);
  const textareaRef = useRef(null);



  const  formatTimestamp = (timestamp:string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    const seconds = Math.floor(diff/1000);
    const minutes = Math.floor(diff/1000/60);
    const hours = Math.floor(diff/1000/60/60);
    const days = Math.floor(diff/1000/60/24);
    
    if(days>7){
      return date.toLocaleDateString("en-US",{
        day : "2-digit",
        month : "long",
        year : "numeric",
      })
    }

    if(days >= 1) return `${days} day${days>1 ? 's':''} ago`;
    if(hours >= 1) return `${hours} hour${hours>1 ? "s" : ""} ago`;
    if(minutes >= 1) return `${minutes} minute${minutes>1 ? "s" : ""} ago`;
    if(seconds >= 1) return `${seconds} second${seconds>1 ? "s" : ""} ago`
  }

  const handleCommentSubmit = () => {
      if(newComment.trim()){
        const comment = {
          id: String(Date.now()),
          author : "test user",
          avatar : "tu",
          content : newComment,
          timestamp : new Date().toISOString(),
          edited : false
        }
        setComments((prev)=>[...prev,comment])
        setIsFocused(false),
        setNewComment("")
      }
      
  }


  const handleDeleteComment = (id:string) => {
    setComments(comments.filter(comment=>comment.id!== id))
  }


  const handleEditComment = (id:string) => {
    const comment = comments.find(comment=>comment.id === id)
    console.log('editcomment',comment)
    if(!comment)return
    setEditContent(comment?.content)
    setIsEditing(comment.id)
  }

  const handleSaveEditComment = (id:string) => {
    if(!editContent)return
    setComments((prev)=>prev.map(c=>c.id == id ? {...c,content : editContent,edited:c.content!== editContent} : c))
    setIsEditing(null),
    setEditContent("")
  }

 const adjustTextareaHeight = (textareaRef:HTMLTextAreaElement|null) => {
  if(textareaRef){
    textareaRef.style.height = "auto";
    textareaRef.style.height = Math.min(textareaRef.scrollHeight,200) +'px'
  }
 }


 useEffect(()=>{
  adjustTextareaHeight(textareaRef.current)
 },[textareaRef])

  return (
    <motion.div className="w-full  bg-gray-100 min-h-screen">
      <div className="w-full h-full bg-white shadow-sm border rounded-lg border-gray-200 p-6 mb-6">
        <div className="w-full h-full flex gap-5 flex-col">
          <div className="w-full h-full">
            {isFocused && (
              <div>
                <ToggleGroup type="single">
                  <ToggleGroupItem value="bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="strikeThrough">
                    <Strikethrough className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="listOrdered">
                    <ListOrdered className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="image">
                    <Image className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="atSign">
                    <AtSign className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="smile">
                    <Smile className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            )}
            <Textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Add a comment..."
              rows={3}
              className="resize-none"
            ></Textarea>
          </div>
          {isFocused && (
            <div className="w-full h-full flex items-center justify-end">
              <div className=" flex  gap-5">
                <Button className=" bg-gray-100 hover:bg-bg-gray-100 text-gray-500 w-fit font-bold"
                onClick={()=>{
                  setIsFocused(false)
                  setNewComment("")
                }}
                >
                  
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!newComment.trim()}
                  onClick={handleCommentSubmit}
                  className="bg-blue-500 hover:bg-blue-600 w-fit font-bold"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
            {/* display Comments */}

      <div className="w-full h-full space-y-4">
        <h4 className="font-bold pl-5 capitalize">
          Comments ({comments.length})
        </h4>
          {comments.map((comment:CommentsType)=>{
            return(
              <div className="flex gap-3 px-2 justify-center items-center" key={comment.id}>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex justify-center items-center text-white uppercase font-bold shrink-0 text-sm">
                  {comment.avatar}
                </div>


                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex justify-center items-center">
                        <span className="text-gray-900 text-sm capitalize">{comment.author}</span>
                        <span className="text-gray-500 ml-2 text-xs flex gap-1 justify-center items-center"><span>{formatTimestamp(comment.timestamp)}</span>
                            <span>{comment.edited && '(edited)'}</span>
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-xs text-gray-500 hover:text-blue-500 px-2 py-2 cursor-pointer "
                        onClick={()=>handleEditComment(comment.id)}
                        >
                          Edit
                        </span>
                        <span className="text-xs text-gray-500 hover:text-red-500 px-2 py-2 cursor-pointer"
                         onClick={()=>handleDeleteComment(comment.id)}>
                          Delete
                        </span>
                      </div>
                    </div>
                    {isEditing === comment.id ? 
                    <div>
                      <textarea 
                      value={editContent}
                      onChange={(e)=>setEditContent(e.target.value)}
                      className="w-full resize-none border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none min-h-20"
                      autoFocus
                      />

                      <div className="flex justify-end gap-2">
                        <Button className="" variant={"outline"}
                        onClick={()=>handleSaveEditComment(comment.id)}>
                          Save
                        </Button>
                        <Button className="" variant={"outline"}
                        onClick={()=>{
                          setIsEditing(null)
                          setEditContent("")
                        }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                    : <p className=" text-bg-gray-600  whitespace-pre-wrap">{comment.content}</p>
                    }
                  </div>
                </div>
              </div>
            )
          })}

      </div>
    </motion.div>
  );
};

export default TicketCommnets;
