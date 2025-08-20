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
```
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
```
bash
복사
편집

## Getting Started
