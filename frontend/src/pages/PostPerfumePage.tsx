import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm"
import { useNavigate } from "react-router-dom";


const PostPerfumePage:React.FC=()=>{
  const navigate = useNavigate();
  return (
    <Layout>
      <PostForm
        onCancel={()=>{
          navigate(-1)
        }}
      />
    </Layout>
  )
}

export default PostPerfumePage