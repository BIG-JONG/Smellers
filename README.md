# Smellers

Smellers는 향수 검색과 사용자 간 소셜 기능을 제공하는 플랫폼입니다.  
사용자는 향수를 검색하거나, 다른 사용자를 팔로우하고 게시글을 공유할 수 있습니다.

## Features

### User
- 회원가입 및 로그인 (JWT 인증)
- 사용자 프로필 조회 및 수정

### Perfume
- 향수 검색 (이름, 브랜드, 노트, 가격 조건)
- 노트(Top, Middle, Bottom) 기반 검색

### Social
- 사용자 팔로우 / 언팔로우
- 팔로우 여부 확인 API 제공

### Post
- 게시글 작성 및 조회
- 팔로잉한 사용자의 게시글 피드 확인

## Tech Stack

### Backend
- Node.js
- Express
- Prisma ORM
- MySQL
- JWT 기반 인증

### Frontend
- React (Vite + TypeScript)
- Tailwind CSS

### Infra / Etc
- Docker (개발/배포 환경)
- AWS (선택적 배포 환경)

## Project Structure

Smellers/
├─ backend/
│ ├─ prisma/ # Prisma schema 및 migration
│ │ ├─ migrations/ # DB 마이그레이션 파일 (세부 파일 생략)
│ │ └─ schema.prisma
│ └─ server/src/
│ ├─ app.ts # Express 앱 엔트리 포인트
│ ├─ routes/ # API 라우터
│ │ ├─ user.routes.ts
│ │ ├─ follow.routers.ts
│ │ └─ perfume.routes.ts
│ ├─ controllers/ # 컨트롤러 (요청 처리)
│ │ ├─ user.controller.ts
│ │ ├─ follow.controller.ts
│ │ └─ perfume.controller.ts
│ ├─ services/ # 서비스 계층 (비즈니스 로직)
│ │ ├─ user.service.ts
│ │ ├─ follow.service.ts
│ │ └─ perfume.service.ts
│ ├─ middlewares/ # 인증/공통 미들웨어
│ ├─ utils/ # 유틸리티 함수
│ └─ prisma/ # Prisma Client
└─ frontend/
├─ src/
│ ├─ components/ # React 컴포넌트
│ ├─ pages/ # 페이지 컴포넌트
│ └─ assets/ # 이미지, 로고 등

bash
복사
편집

## Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/your-username/Smellers-FINAL.git
cd Smellers-FINAL
2. Backend Setup
bash
복사
편집
cd backend
npm install
환경 변수 설정 (.env 파일)
ini
복사
편집
DATABASE_URL="mysql://user:password@localhost:3306/smellers"
JWT_SECRET="your_secret_key"
DB 마이그레이션
bash
복사
편집
npx prisma migrate dev
서버 실행
bash
복사
편집
npm run dev
3. Frontend Setup
bash
복사
편집
cd frontend
npm install
npm run dev
API Endpoints
User
POST /api/user/signup : 회원가입

POST /api/user/login : 로그인

GET /api/user/:id : 특정 사용자 상세 조회 (isFollowing 포함)

Follow
POST /api/follow/:id : 사용자 팔로우

DELETE /api/unfollow/:id : 언팔로우

GET /api/follow/check/:id : 팔로우 여부 확인

Perfume
GET /api/perfume/search : 향수 검색

Post
GET /api/posts : 게시글 목록 조회

POST /api/posts : 게시글 작성

Contribution
Fork → Branch 생성 → PR 제출

Commit message 규칙 (feat:, fix:, refactor: 등)

ESLint / Prettier 규칙 준수