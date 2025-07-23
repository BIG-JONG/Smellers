import { useState } from "react";
import InputField from "./InputField"
import Button from "./Button";

function LoginForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return(
    <form className="m-10 flex flex-col items-center justify-center w-full">
      <InputField
        className="w-1/2"
        label="email"
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="이메일을 입력하세요."
      />
      <br/>
      <br/>
      <InputField
        className="w-1/2"
        label="password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요."
      />
      <br/>
      <br/>
      <Button/>
    </form>

  )
}

export default LoginForm;