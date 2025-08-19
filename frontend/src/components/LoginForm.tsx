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
  //error메세지 추가
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/users/login', {
        email,
        password
      })
      if (res.status === 200) {
        const { token, user_id } = res.data;

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user_id', JSON.stringify(user_id));

        setAlertType("success")
        setShowAlert(true)

        setTimeout(() => {
          navigate('/')
        }, 800)
      }
    } catch (err: any) {
      console.error("서버 응답 오류:", err.response?.data || err.message);

      if (err.response?.status === 429) {
        setErrorMessage("1분 뒤에 다시 시도해주세요.");
      } else {
        setErrorMessage("로그인 실패");
      }

      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className="mt-2 sm:mt-0 flex flex-col items-center justify-center w-full max-w-full sm:max-w-screen-md bg-white p-4 sm:p-8"> {/* max-w-3xl -> max-w-screen-md, mt-10 -> mt-4 */}
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center">로그인</h1>
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
            message={alertType === "error" ? errorMessage : "로그인 성공"}
          />
        </div>
      )}
    </form>
  );
}

export default LoginForm;