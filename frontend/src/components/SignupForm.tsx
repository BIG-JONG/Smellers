import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 추가

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  // Alert 타입 추가 (에러/성공 구분을 위해)
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");

  const navigate = useNavigate(); // useNavigate 훅 사용

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // 간단한 비밀번호 확인 로직 추가
    if (password !== passwordConfirm) {
      setAlertType("error");
      setShowAlert(true);
      // 에러 메시지 표시 후 2초 뒤 숨김
      setTimeout(() => setShowAlert(false), 2000);
      return; // 비밀번호 불일치 시 함수 종료
    }

    // 실제 회원가입 로직 (예시)
    // 실제로는 여기에 서버 통신 로직이 들어갑니다.
    if (email === "test@example.com" && password === "password123") { // 임시 성공 조건
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => {
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      }, 1000);
    } else {
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  // 로그인 페이지로 이동하는 함수
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    // 폼 전체의 너비를 'max-w-full'로 설정하여 부모 div에 꽉 차게 합니다.
    <form className="mt-0 flex flex-col items-center justify-center w-full max-w-full bg-white p-8 rounded"> {/* max-w-screen-xl -> max-w-full로 변경 */}
      <h1 className="text-4xl font-extrabold mb-8 text-center">회원가입</h1>
      
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
          <Alert
            type={alertType}
            message={alertType === "error" ? "회원가입 실패 (비밀번호 불일치 등)" : "회원가입 완료"}
          />
          </div>
        )}
    </form>
  );
}

export default SignupForm;