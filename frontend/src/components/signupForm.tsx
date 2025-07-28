import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Alert from "./Alert";

function SignupForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [nickname, setNickname] = useState("")

  const [showAlert, setShowAlert] = useState(false)

  const onClickButton=()=>{
    setShowAlert(true)
  }

  return (
    <form className="m-10 flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-extrabold">회원가입</h1>
      <br/>
      <br/>
      <InputField 
        className="w-1/3"
        label="이메일"
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="이메일을 입력하세요."/>
        <br/>
        <br/>
      <InputField 
        className="w-1/3"
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요."/>
        <br/>
        <br/>
      <InputField 
        className="w-1/3"
        label="비밀번호 확인"
        type="password"
        value={passwordConfirm}
        onChange={(e)=>setPasswordConfirm(e.target.value)}
        placeholder="비밀번호를 다시 입력하세요."/>
        <br/>
        <br/>
      <InputField 
        className="w-1/3"
        label="닉네임"
        type="nickname"
        value={nickname}
        onChange={(e)=>setNickname(e.target.value)}
        placeholder="사용할 닉네임을 입력하세요."/>
        <br/>
        <br/>
        <Button onClick={onClickButton}/>
        {showAlert && (
          <div className="mt-4 w-1/3">
            <Alert message="회원가입 완료"/>
          </div>
        )}
    </form>
  )
}

export default SignupForm;
