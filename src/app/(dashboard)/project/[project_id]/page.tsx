'use client'
import { useParams } from "next/navigation"

const ProjectDashboard = ()=>{
    const param = useParams()
    console.log(param)
    return <div className="text-red-100">This is project dashboard</div>
}

export default ProjectDashboard