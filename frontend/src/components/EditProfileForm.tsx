import React, { useState } from "react";
import Avatar from "./Avatar";
import InputField from "./InputField";
import Button from "./Button";
import Alert from "./Alert";

function EditProfileForm(){

  const [imgUrl, setImgUrl] = useState<string|undefined>(undefined)
  const [email, setEmail] = useState("test.email.com")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [nickname, setNickname] = useState("")

  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    if(file){
      const imageUrl = URL.createObjectURL(file)
      setImgUrl(imageUrl)
    }
  }

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()

    if(password !==passwordConfirm){
      setAlertType("error")
      setShowAlert(true)
      return;
    }
    setAlertType("success")
    setShowAlert(true)
  }

  return(
    <div className="w-full flex justify-center">
      <form className="m-10 flex flex-col items-center justify-center w-full max-w-xl gap-6" onSubmit={handleSubmit}>
        <Avatar src={imgUrl} size="xl"/>
        <p className="text-center text-lg">
          <span className="font-bold text-xl">{nickname}</span>님, 변경할 정보를 입력해주세요.
        </p>
      <label className="block w-full max-w-md text-center cursor-pointer bg-gray-100 rounded py-2 hover:bg-gray-200">
        이미지 업로드
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
        <InputField
          className="w-full max-w-md text-gray-500"
          label="이메일"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder=""
          readOnly={true}
        />
        <InputField
          className="w-full max-w-md text-gray-600"
          label="닉네임"
          type="nickname"
          value={nickname}
          onChange={(e)=>setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요."
        />
        <InputField
          className="w-full max-w-md "
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="변경할 비밀번호를 입력해주세요."
        />
        <InputField
          className="w-full max-w-md"
          label="비밀번호 확인"
          type="passwordConfirm"
          value={passwordConfirm}
          onChange={(e)=>setPasswordConfirm(e.target.value)}
          placeholder="변경할 비밀번호를 한번 더 입력해주세요."
        />
        <Button type="submit"/>
        {showAlert && (
          <div className="mt-4 w-1/2">
          <Alert
            type={alertType}
            message={
              alertType ==="error"?"회원 정보 변경에 실패했습니다.":"회원 정보가 성공적으로 변경되었습니다."
          }/>
          </div>
        )}
      </form>
    </div>
  )
}
export default EditProfileForm
