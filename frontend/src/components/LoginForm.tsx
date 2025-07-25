import { useState } from "react";
import InputField from "./InputField"
import Button from "./Button";
import Alert from "./Alert";


function LoginForm(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");

  const onClickButton=(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();

    if(email === "email" && password==="pass"){
      setAlertType("success")
      setShowAlert(true)

      setTimeout(()=>{
        window.location.href="#"
      }, 1000)
    }else{
      //로그인 실패
      setAlertType("error")
      setShowAlert(true)
    }
  }

  return(
    <form className="m-10 flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-extrabold">로그인</h1>
      <br/>
      <br/>
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
      <Button onClick={onClickButton}/>
      {showAlert && (
          <div className="mt-4 w-1/2">
            <Alert type={alertType} 
              message={alertType ==="error"?"로그인 실패":"로그인 성공"}/>
          </div>
        )}
    </form>

  )
}

export default LoginForm;