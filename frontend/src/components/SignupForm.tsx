import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";


function SignupForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [nickname, setNickname] = useState("")

  return (
    <form className="m-10 flex flex-col items-center justify-center w-full">
      <InputField 
        className="w-1/2"
        label="이메일"
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="이메일을 입력하세요."/>
        <br/>
        <br/>
      <InputField 
        className="w-1/2"
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요."/>
        <br/>
        <br/>
      <InputField 
        className="w-1/2"
        label="비밀번호 확인"
        type="password"
        value={passwordConfirm}
        onChange={(e)=>setPasswordConfirm(e.target.value)}
        placeholder="비밀번호를 다시 입력하세요."/>
        <br/>
        <br/>
      <InputField 
        className="w-1/2"
        label="닉네임"
        type="nickname"
        value={nickname}
        onChange={(e)=>setNickname(e.target.value)}
        placeholder="사용할 닉네임을 입력하세요."/>
        <br/>
        <br/>
        <Button/>
    </form>
  )
}

export default SignupForm;
