import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const onClickButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setAlertType("error");
      setAlertMessage("비밀번호가 일치하지 않습니다.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      return;
    }

    try {
      // 백엔드 API 주소로 변경
      const response = await fetch("http://localhost:4000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nickname }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertType("success");
        setAlertMessage("회원가입이 완료되었습니다!");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        // 서버에서 보낸 에러 메시지를 alert에 표시
        setAlertType("error");
        setAlertMessage(data.message || "회원가입 실패 (서버 에러)");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      }
    } catch (error) {
      // 네트워크 에러 등 예외 처리
      setAlertType("error");
      setAlertMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      console.error("회원가입 실패:", error);
    }
  };
return (
    <form className="mt-2 sm:mt-0 flex flex-col items-center justify-center w-full max-w-full sm:max-w-screen-md bg-white p-4 sm:p-8">
      <h1 className="text-lg sm:text-xl xl:text-2xl font-bold flex justify-center gap-8  mt-3 sm:mt-0">회원가입</h1>
      <div className="mt-10" />
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
      <div className="h-6" />

      <InputField
        label="비밀번호 확인"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="비밀번호를 다시 입력하세요."
      />
      <div className="h-6" />

      <InputField
        label="닉네임"
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="사용할 닉네임을 입력하세요."
      />
      <div className="h-8" />

      <Button onClick={onClickButton}>회원가입</Button>

      {showAlert && (
        <div className="mt-4 w-full">
          <Alert type={alertType} message={alertMessage} />
        </div>
      )}
    </form>
  );
}

export default SignupForm;