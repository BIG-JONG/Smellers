// src/components/LoginForm.tsx

import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
  const navigate = useNavigate();

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email === "email" && password === "pass") {
      setAlertType("success");
      setShowAlert(true);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    // 폼의 최대 너비를 max-w-screen-md, max-w-screen-lg, max-w-screen-xl 등으로 변경하여
    // 화면 너비에 맞춰 최대한 넓어지게 합니다.
    // mt-10 (margin-top)을 좀 더 줄여서 헤더에 가까이 붙게 할 수도 있습니다. 여기서는 mt-4로 변경.
    <form className="mt-4 flex flex-col items-center justify-center w-full max-w-screen-md bg-white p-8 rounded"> {/* max-w-3xl -> max-w-screen-md, mt-10 -> mt-4 */}
      <h1 className="text-4xl font-extrabold mb-8 text-center">로그인</h1>

      {/* InputField는 w-full을 상속받아 이 폼 너비에 맞춰집니다. */}
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

      <Button onClick={onClickButton}>로그인</Button>

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