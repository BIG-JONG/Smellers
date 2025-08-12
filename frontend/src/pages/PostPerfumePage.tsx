import PostForm from "@/components/PostForm"
import { useNavigate } from "react-router-dom";


const PostPerfumePage:React.FC=()=>{
  const navigate = useNavigate();
  return (
    <div>
      <PostForm
        onCancel={()=>{
          navigate(-1)
        }}
      />
    </div>
  )
}

export default PostPerfumePage