import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
  const navigate = useNavigate();

  const onSubmitForm  = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const res = await axios.post('http://localhost:4000/users/login',{
        email, 
        password
      })
      if(res.status ===200){
        const { token, user_id } = res.data;
        
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user_id', JSON.stringify(user_id));

        setAlertType("success")
        setShowAlert(true)

        setTimeout(()=>{
          navigate('/')
        },800)
      }
    }catch(err:any){
      console.error("서버 응답 오류:", err.response?.data || err.message); 
      setAlertType("error")
      setShowAlert(true);
      setTimeout(()=> setShowAlert(false), 2000)
    }    
  };

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <form 
      onSubmit={onSubmitForm}
      className="mt-0 flex flex-col items-center justify-center w-full max-w-screen-md bg-white p-8 rounded"> {/* max-w-3xl -> max-w-screen-md, mt-10 -> mt-4 */}
      <h1 className="text-4xl font-extrabold mb-8 text-center">로그인</h1>
      <InputField
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요."
      />
      <div className="h-6" />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요."
      />
      <div className="h-8" />

      <Button type="submit">로그인</Button>

      {showAlert && (
        <div className="mt-4 w-full">
          <Alert
            type={alertType}
            message={alertType === "error" ? "로그인 실패" : "로그인 성공"}
          />
        </div>
      )}
    </form>
  );
}

export default LoginForm;