import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import InputField from "./InputField";
import Button from "./Button";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfileForm() {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [uploadedImageFilename, setUploadedImageFilename] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
  const [alertMessage, setAlertMessage] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("user_id");

      if (!token || !userId) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:4000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          const data = res.data;
          setEmail(data.email);
          setNickname(data.nickname);
          // 프로필 이미지 URL 세팅 (서버 업로드 경로 포함)
          setImgUrl(data.profileImg ? `http://localhost:4000/uploads/${data.profileImg}` : "");
          setUploadedImageFilename(data.profileImg || null);
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setImg(file);
    // 선택한 이미지 미리보기
    setImgUrl(URL.createObjectURL(file));

    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("토큰이 없습니다.");


    } catch (error) {
      setAlertType("error");
      setAlertMessage("이미지 업로드에 실패했습니다.");
      setShowAlert(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(false);

    if (password !== passwordConfirm) {
      setAlertType("error");
      setAlertMessage("비밀번호가 일치하지 않습니다.");
      setShowAlert(true);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("user_id");
      if (!token || !userId) {
        setAlertType("error");
        setAlertMessage("로그인이 필요합니다.");
        setShowAlert(true);
        return;
      }
      const formData = new FormData();
      formData.append("nickname", nickname);
      const changePassword = password ? password : null
      if (changePassword) {
        formData.append("password", password);
      }


      if (img) {
        formData.append("images", img);
      }
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await axios.put(
        `http://localhost:4000/users/${userId}`, formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAlertType("success");
      setAlertMessage("회원 정보가 성공적으로 변경되었습니다.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } catch (err: any) {
      setAlertType("error");
      setAlertMessage("회원 정보 변경에 실패했습니다.");
      setShowAlert(true);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form className="m-10 flex flex-col items-center justify-center w-full max-w-4xl gap-6" onSubmit={handleSubmit}>
        <Avatar src={imgUrl} size="xl" />
        <p className="text-center text-lg">
          <span className="font-bold text-xl">{nickname}</span>님, 변경할 정보를 입력해주세요.
        </p>
        <label className="block w-full text-center cursor-pointer bg-gray-100 rounded py-2 hover:bg-gray-200">
          이미지 업로드
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        <InputField className="w-full text-gray-500" label="이메일" type="email" value={email} onChange={() => { }}
          readOnly
        />
        <InputField className="w-full text-gray-600" label="닉네임" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요."
        />
        <InputField className="w-full" label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="변경할 비밀번호를 입력해주세요."
        />
        <InputField className="w-full" label="비밀번호 확인" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="변경할 비밀번호를 한번 더 입력해주세요."
        />
        <Button type="submit" className="w-full">
          정보 수정
        </Button>

        <div className={`mt-4 w-full h-12 transition-opacity duration-300 ${showAlert ? "opacity-100" : "opacity-0"}`}>
          <Alert type={alertType} message={alertMessage} />
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;