import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import InputField from "./InputField";
import Button from "./Button";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios 추가

function EditProfileForm(){

    const [imgUrl, setImgUrl] = useState<string|undefined>(undefined)
    const [email, setEmail] = useState("") // 초기값을 빈 문자열로 변경
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [nickname, setNickname] = useState("")

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState<"info" | "success" | "error" | "warning">("info");
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();

    // 컴포넌트가 처음 렌더링될 때 사용자 정보를 가져오는 로직
    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("token");
            const userId = sessionStorage.getItem("user_id"); // user_id 가져오기
            
            if (!token || !userId) {
                navigate("/login");
                return;
            }
            try {
                // 수정: userId를 사용해 특정 사용자 정보 가져오기
                const response = await axios.get(`http://localhost:4000/users/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    setEmail(data.email);
                    setNickname(data.nickname);
                    setImgUrl(data.profileImageUrl);
                } else {
                    console.error("사용자 정보 가져오기 실패");
                    navigate("/login");
                }
            } catch (error) {
                console.error("네트워크 오류:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        if(file){
            const imageUrl = URL.createObjectURL(file)
            setImgUrl(imageUrl)
        }
    }

    const handleSubmit = async (e:React.FormEvent)=>{ // async 키워드 추가
        e.preventDefault()
        setShowAlert(false) // 새로운 제출 전에 기존 알림 숨기기

        if(password !== passwordConfirm){
            setAlertType("error")
            setAlertMessage("비밀번호가 일치하지 않습니다.")
            setShowAlert(true)
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

            // 수정: PATCH API 호출 로직 추가
            const res = await axios.put(`http://localhost:4000/users/${userId}`, {
                nickname,
                password: password || undefined, // 비밀번호가 비어있으면 보내지 않음
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                setAlertType("success");
                setAlertMessage("회원 정보가 성공적으로 변경되었습니다.");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2000);
            }
        } catch (err: any) {
            console.error("서버 응답 오류:", err.response?.data || err.message); 
            setAlertType("error")
            setAlertMessage("회원 정보 변경에 실패했습니다.");
            setShowAlert(true);
            setTimeout(()=> setShowAlert(false), 2000);
        }
    }

    return(
        <div className="w-full flex justify-center">
            <form className="m-10 flex flex-col items-center justify-center w-full max-w-4xl gap-6" onSubmit={handleSubmit}>
                <Avatar src={imgUrl} size="xl"/>
                <p className="text-center text-lg">
                    <span className="font-bold text-xl">{nickname}</span>님, 변경할 정보를 입력해주세요.
                </p>
                <label className="block w-full text-center cursor-pointer bg-gray-100 rounded py-2 hover:bg-gray-200">
                    이미지 업로드
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
                <InputField
                    className="w-full text-gray-500"
                    label="이메일"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder=""
                    readOnly={true}
                />
                <InputField
                    className="w-full text-gray-600"
                    label="닉네임"
                    type="nickname"
                    value={nickname}
                    onChange={(e)=>setNickname(e.target.value)}
                    placeholder="변경할 닉네임을 입력해주세요."
                />
                <InputField
                    className="w-full"
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="변경할 비밀번호를 입력해주세요."
                />
                <InputField
                    className="w-full"
                    label="비밀번호 확인"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e)=>setPasswordConfirm(e.target.value)}
                    placeholder="변경할 비밀번호를 한번 더 입력해주세요."
                />
                <Button type="submit" className="w-full">
                    정보 수정
                </Button>
                
                {/* Alert 컨테이너를 항상 렌더링하되, opacity로 시각적 효과 제어 */}
                <div className={`mt-4 w-full h-12 transition-opacity duration-300 ${showAlert ? 'opacity-100' : 'opacity-0'}`}>
                    <Alert
                        type={alertType}
                        message={alertMessage} // alertMessage state를 사용하도록 변경
                    />
                </div>
            </form>
        </div>
    )
}

export default EditProfileForm;