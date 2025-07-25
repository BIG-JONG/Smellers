import { useState } from "react";
import Avatar from "./Avatar";
import InputField from "./InputField";

function EditProfileForm(){

  const [imgUrl, setImgUrl] = useState<string|undefined>(undefined)
  const [email, setEmail] = useState("ㄴㄴㄴ")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    if(file){
      const imageUrl = URL.createObjectURL(file)
      setImgUrl(imageUrl)
    }
  }

  return(
    <>
      <Avatar src={imgUrl} size="xl"/>
      <input 
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm"
      />

      <InputField 
        className="w-1/5 "
        label="이메일"
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder=""
        readOnly={true}
      />
    </>
  )
}
export default EditProfileForm