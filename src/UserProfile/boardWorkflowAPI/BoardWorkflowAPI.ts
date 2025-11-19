import axios, { type AxiosResponse } from "axios"
import { useCallback } from "react"
interface CreateWorkflowProps {
    workflow_name: string,
  created_by: string
}
interface CreateWorkflowStatusProps{
    workflow_id : string,
    name : string[]
}
export const BoardWorkflowAPI = () =>{
    const CreateWorkflow = useCallback(async(data : CreateWorkflowProps)=>{
        console.log(data)
        try {
            const res = await axios.post("/api/workflow/add-workflow",data
            )
            console.log(res)
            return res
        }
        catch(err){
            console.log('err from Createworkflow',err)
        }
    },[])

    const FetchWorkflows = useCallback(async()=>{
        try{
            const res = await axios.get("/api/workflow")
            return res
        }
        catch(err){
            console.log('err fetchworkflow',err)
        }
    },[])

    const GetWorkflowStatus = useCallback(async():Promise<AxiosResponse<any>|undefined>=>{
        try{
            const res = await axios.get("/api/workflow-status/workflow-status/")
            return res
        }
        catch(err){
            console.log('err getworkflowstatus',err)
        }
    },[])

    const CreateWorkflowStatus = useCallback(async(data:CreateWorkflowStatusProps)=>{
        try{
            const res = await axios.post("/api/workflow-status/update-order",data)
            console.log(res)
            return res
        }
        catch(err){
            console.log('error createworlfstatus',err)
        }
    },[])

    return {
        CreateWorkflow,
        FetchWorkflows,
        GetWorkflowStatus,
        CreateWorkflowStatus,
    }
}