# 🌸 Smellers

> **Smellers**는 향수 기반의 소셜 플랫폼으로, 사용자들이 향수 정보를 검색하고, 서로 팔로우하며 소통할 수 있는 서비스입니다.  

---

## 🚀 기술 스택

- **Backend**: Node.js (Express), Prisma, MySQL  
- **Frontend**: React, TailwindCSS (추후 연결)  
- **Auth**: JWT, OAuth (Kakao)  
- **Infra**: Docker, AWS  

---

## 📂 프로젝트 구조
```

Smellers/
├─ backend
│ ├─ prisma
│ │ ├─ migrations
│ │ └─ schema.prisma
│ ├─ server
│ │ ├─ src
│ │ │ ├─ routes
│ │ │ ├─ controllers
│ │ │ ├─ services
│ │ │ └─ middlewares
│ ├─ package.json
│ └─ tsconfig.json
└─ frontend (예정)
```
---

## 🛠 실행 방법

```bash
# 저장소 클론
git clone -b FINAL https://github.com/BIG-JONG/Smellers.git
cd Smellers/backend

# 패키지 설치
npm install

# DB 마이그레이션
npx prisma migrate dev

# 서버 실행
npm run dev
✨ 주요 기능
✅ 사용자 회원가입 / 로그인 (JWT 인증)

✅ Kakao OAuth 로그인

✅ 향수 검색 및 상세 정보 조회

✅ 팔로우 / 언팔로우 기능

✅ 팔로워/팔로잉 리스트 조회

🔄 (추가 예정) 리뷰/댓글 시스템

📸 스크린샷
추후 프론트엔드 연결 후 추가 예정