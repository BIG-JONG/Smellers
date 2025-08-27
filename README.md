# README

📖 **향수 취향 공유 서비스앱 Smellers**
smellers\_mockup

**배포 URL** : *(추가 예정)*
**Test ID** : *(추가 예정)*
**Test PW** : *(추가 예정)*

---

## 프로젝트 소개

Smellers는 향수를 좋아하는 사용자들이 자신의 취향을 공유하고, 향수 정보를 탐색하며, 서로 팔로우하고 소통할 수 있는 SNS형 서비스입니다.
개인 프로필 페이지에 보유/관심 향수, 선호 노트(Top/Middle/Base) 등의 정보를 기록하고, 다른 사용자의 피드를 팔로우하여 취향을 비교·발견할 수 있습니다.

---

## 팀원 구성

**개인 프로젝트** (Owner: **@BIG-JONG**)


---

## 1. 개발 환경

[![Front-End](https://img.shields.io/badge/Front-React%2C%20Vite%2C%20TypeScript-61DAFB?logo=react&logoColor=white)](#)  
[![Back-End](https://img.shields.io/badge/Back--end-Node.js%2C%20Express%2C%20Prisma%2C%20MySQL-339933?logo=node.js&logoColor=white)](#)  
[![Version & Issues](https://img.shields.io/badge/%EB%B2%84%EC%A0%84%20%26%20%EC%9D%B4%EC%8A%88-GitHub%20Issues%20%7C%20Projects-black?logo=github)](#)  
[![Docs](https://img.shields.io/badge/%ED%98%91%EC%97%85%20%2F%20%EB%AC%B8%EC%84%9C%ED%99%94-GitHub%20Wiki%20%7C%20Notion-lightgrey?logo=notion&logoColor=white)](#)  
[![Deploy](https://img.shields.io/badge/%EB%B0%B0%ED%8F%AC-Docker%20%7C%20AWS-2496ED?logo=docker&logoColor=white)](#)  
[![Design](https://img.shields.io/badge/%EB%94%94%EC%9E%90%EC%9D%B8-Figma-FF7262?logo=figma&logoColor=white)](#)  
[![Commit](https://img.shields.io/badge/%EC%BB%A4%EB%B0%8B-Conventional%20Commits-yellow?logo=git&logoColor=white)](#)  
[![Code Style](https://img.shields.io/badge/%EC%BD%94%EB%93%9C%20%EC%BB%A8%EB%B2%A4%EC%85%98-ESLint%20%7C%20Prettier-4B32C3?logo=eslint&logoColor=white)](#)  
[![Assets](https://img.shields.io/badge/%EC%97%90%EC%85%8B%20%EA%B4%80%EB%A6%AC-Tailwind%20JIT%20%7C%20%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EC%B5%9C%EC%A0%81%ED%99%94-38B2AC?logo=tailwindcss&logoColor=white)](#)  

---

## 2. 채택한 개발 기술과 브랜치 전략

### Frontend

**React + Vite (TypeScript)**

* 빠른 개발/빌드와 타입 안정성 확보로 유지보수성 향상.
* 컴포넌트화로 재사용성 극대화(카드, 리스트, 모달 등 공통 컴포넌트 다수).

**Tailwind CSS**

* 유틸리티 클래스 기반으로 UI 구현 속도 향상.
* 디자인 일관성 및 제거되지 않는 스타일 누수 방지.

### Backend

**Node.js + Express**

* 라우팅/미들웨어 구성의 단순성과 생태계 성숙도.

**Prisma + MySQL**

* Prisma Schema 기반의 명시적 모델 관리 및 타입 세이프 쿼리.
* 마이그레이션 이력 관리로 스키마 변경 추적 용이.

**JWT 인증**

* 서버 확장 시 stateless 인증으로 수평 확장 용이.

**중요 미들웨어 선택 이유**

* `auth/authorization` : 엔드포인트 보호 및 역할 기반 접근 제어.
* `rateLimit` : 인증/검색 API 남용 방지.
* `error-handling` : 표준화된 에러 응답 규격 유지.
* `upload` : 이미지 업로드 파이프라인(MIME 검증, 저장 경로 일원화).

### 품질/생산성 도구

* **ESLint/Prettier** : 일관된 코드 스타일 및 린트 룰 준수.
* **tsconfig 분리** : 빌드/런타임 설정 명확화.

### 브랜치 전략

* **Git-flow 기반**: `main`, `develop`, `feature/*`
* 배포 태그/스냅샷 분리를 위해 **`FINAL` 브랜치** 사용 (릴리즈 고정)
* PR 머지 후 feature 브랜치 정리로 히스토리 가독성 확보

---

## 3. 프로젝트 구조

```bash
Smellers
├── README.md # 프로젝트 설명 파일
├── package.json # 프로젝트 의존성 관리
├── package-lock.json
├── backend
│ ├── package.json
│ ├── prisma
│ │ ├── migrations # DB 마이그레이션 파일
│ │ └── schema.prisma # Prisma DB 스키마 정의
│ ├── server
│ ├── src
│ │ ├── app.ts # 서버 진입점
│ │ ├── controllers # 요청 처리 로직
│ │ │ ├── follow.controller.ts
│ │ │ ├── perfume.controller.ts
│ │ │ └── user.controller.ts
│ │ ├── services # 비즈니스 로직
│ │ │ ├── follow.service.ts
│ │ │ ├── perfume.service.ts
│ │ │ └── user.service.ts
│ │ ├── routes # 라우팅
│ │ │ ├── follow.routers.ts
│ │ │ ├── perfume.routes.ts
│ │ │ └── user.routes.ts
│ │ ├── middlewares # 요청/응답 처리 미들웨어
│ │ │ ├── auth.middleware.ts
│ │ │ ├── authorization.middleware.ts
│ │ │ ├── error-handing.middleware.ts
│ │ │ ├── rateLimit.middleware.ts
│ │ │ ├── upload.middleware.ts
│ │ │ └── validation-result-handle.ts
│ │ ├── prisma
│ │ │ └── client.ts # Prisma 클라이언트
│ │ └── utils # 유틸 함수
│ │ ├── changeNoteType.ts
│ │ ├── deleteFiles.ts
│ │ └── jwt.ts
│ └── uploads # 이미지 등 업로드 자산
└── frontend
├── package.json
├── public
│ ├── index.html
│ └── favicon.png
└── src
├── main.tsx # React 진입점
├── App.tsx # 최상위 컴포넌트
├── assets # 이미지, 로고 등
│ └── aromabaselogo.png
├── components # 재사용 가능한 UI 컴포넌트
│ ├── Button.tsx
│ ├── InputField.tsx
│ ├── FollowButton.tsx
│ ├── UserProfileSection.tsx
│ └── ... 기타 컴포넌트
├── pages # 화면 단위 컴포넌트
│ ├── MainPage.tsx
│ ├── LogInPage.tsx
│ ├── SignUpPage.tsx
│ ├── PerfumeListPage.tsx
│ ├── PerfumeDetailPage.tsx
│ ├── UserSearchPage.tsx
│ ├── UserPerfumeListPage.tsx
│ ├── FollowListPage.tsx
│ └── ... 기타 페이지
├── api # API 호출 모듈
│ └── mandarinAPI.js
├── routes # 라우팅 설정
│ ├── privateRoutes.jsx
│ └── privateRoutesRev.jsx
├── styles # 전역 스타일
│ └── Globalstyled.jsx
└── vite-env.d.ts
```

## 설명

### Backend
- **server/src/controllers**: 요청 처리 로직 (CRUD, 팔로우, 유저 조회 등)  
- **server/src/services**: 비즈니스 로직 (데이터 처리, 유효성 체크)  
- **server/src/routes**: API 라우팅  
- **server/src/middlewares**: 인증, 권한, 업로드, 에러 처리 등  
- **prisma/migrations**: DB 테이블 관리용 마이그레이션 파일  
- **prisma/schema.prisma**: DB 스키마 정의  

### Frontend
- **src/components**: 재사용 가능한 UI 컴포넌트 (버튼, 입력창, 사용자 배너 등)  
- **src/pages**: 주요 화면 단위 컴포넌트 (로그인, 회원가입, 리스트, 상세 페이지 등)  
- **src/api**: 백엔드 API 호출 모듈  
- **src/routes**: 라우팅 설정  
- **src/styles**: 전역 스타일 관리  


---

## 4. 역할 분담

**@BIG-JONG**

* **UI/UX** : 메인, 검색, 향수 상세, 로그인/회원가입, 프로필, 팔로우 리스트 등
* **공통 컴포넌트** : 카드/리스트/모달/페이지네이션/멀티셀렉트 등
* **기능** : 사용자 인증(JWT), 향수 검색/필터, 팔로우/언팔로우, 프로필 수정, 사용자별 향수 리스트, 무한스크롤/페이지네이션, 파일 업로드
* **백엔드** : 유저/팔로우/향수 도메인 API, 미들웨어(인증·권한·레이트리밋·에러핸들링·업로드), Prisma 스키마 및 서비스 계층
* **인프라** : Docker 베이스 로컬 런타임, 배포 파이프라인 설계(예정)

---

## 5. 개발 기간 및 작업 관리

**개발 기간**

* 전체 : **2025-07-21 \~ 2025-08-11** *(Prisma 마이그레이션 이력 기준)*

  * UI 1차 : 2025-07-22 \~ 2025-07-30
  * 기능 구현 : 2025-07-29 \~ 2025-08-11

**작업 관리**

* GitHub Projects 칸반(Backlog → In Progress → Review → Done)
* Issue 템플릿: Bug/Feature/Docs 구분, 라벨(`feat`, `fix`, `perf`, `docs`, `refactor`)
* PR 규칙: 1 PR = 1 이슈 링크, 스쿼시 머지, 체인지로그에 반영

---

## 6. 신경 쓴 부분

* **검색 품질** : 노트 타입(Top/Middle/Base) 변환 유틸(`changeNoteType.ts`)로 일관된 필터링 제공
* **안정성** : 입력 검증 및 에러 핸들링 표준화(`validation-result-handle.ts`, `error-handing.middleware.ts`)
* **보안/성능** : JWT 서명키 관리, 레이트 리밋(`rateLimit.middleware.ts`) 적용으로 인증/검색 API 보호
* **파일 업로드** : MIME 타입 검증 및 저장 경로 분리(`upload.middleware.ts`), 실패 시 정리(`deleteFiles.ts`)
* **타입 안정성** : `PerfumeSearchParams.ts`로 검색 쿼리 타입 안전 확보

---

## 7. 페이지별 기능

**\[초기/메인]**

* `MainPage` : 랜딩 + 랜덤 추천/인기 향수 섹션(`RandomPerfumeRecommendationSection`)

**\[검색]**

* `PerfumeListPage` / `SearchResultsPage` : 이름·브랜드·노트·가격 조건 검색, 페이지네이션(`Pagination`)
* 검색어 하이라이팅, 필터 유지, 스크롤 탑(`ScrollTop`)

**\[향수 상세]**

* `PerfumeDetailPage` : 이미지/노트 구조/설명/평점(`StarRating`) 표시
* 유사 노트 추천(`RecommendPerfume`)

**\[게시/리뷰]**

* `PostPerfumePage` + `PostForm` : 이미지 업로드(최대 N장), 텍스트/평점 입력, 업로드 일시 표시

**\[사용자/소셜]**

* `UserProfile` / `UserProfileSection` : 프로필·자기소개·통계, 팔로워/팔로잉 수
* `FollowListPage` : 팔로워/팔로잉 목록, 팔로우/언팔로우 즉시 반영(`FollowButton`)
* `UserPerfumeListPage` / `MyPerfumeListPage` : 사용자 별 등록/보유 향수 리스트

**\[인증/계정]**

* `LogInPage`, `SignUpPage` : 유효성 검사, 실패/진행 상태 `Alert`
* `UserInfoUpdatePage`, `AccountSettingsForm`, `EditProfileForm` : 정보 수정/저장, 실시간 검증

---

## 8. 트러블 슈팅

* **검색 파라미터 누락/타입 불일치**
  `PerfumeSearchParams`로 스키마 통일 → 컨트롤러/서비스에서 공통 파서 사용해 400 오류 감소
* **업로드 실패 시 잔여 파일 누수**
  업로드 파이프라인 실패 구간에 `deleteFiles()` 훅 추가로 임시 파일 정리
* **레이트리밋 + 프록시 환경 IP 식별 문제**
  `X-Forwarded-For` 처리 및 트러스트 프록시 설정으로 실 IP 기준 제한 적용
* **권한 체크 누락 케이스**
  `authorization.middleware.ts`에서 리소스 소유자/역할 검증 미들웨어 분리로 재사용성 향상

---

## 9. 개선 목표

* API 문서 자동화(Swagger/OpenAPI) 및 샘플 요청 컬렉션 배포
* 검색 고도화(인덱스/풀텍스트/캐시), 추천 로직 개선
* 이미지 최적화(Lazy Load, 썸네일, WebP 변환 파이프라인)
* E2E/통합 테스트(Cypress/Playwright, Vitest) 도입
* 다국어(i18n) 및 접근성(ARIA, 키보드 내비게이션) 강화

---

## 10. 프로젝트 후기

타입 안정성과 폴더 구조 일관성에 집중했습니다. 백엔드에선 미들웨어/서비스 분리로 가독성과 테스트 용이성을 확보했고, 프론트에선 공통 컴포넌트와 Tailwind 기반 유틸 클래스로 제작 속도를 높였습니다. 남은 과제로는 검색 성능/품질 개선과 문서화 자동화를 우선 추진할 계획입니다.

---

## 빠른 시작 (로컬 실행)

```bash
# 1) 저장소 클론
$ git clone -b FINAL https://github.com/BIG-JONG/Smellers.git
$ cd Smellers/backend

# 2) 의존성 설치
$ npm install

# 3) 환경변수 (.env)
DATABASE_URL="mysql://user:password@localhost:3306/smellers"
JWT_SECRET="<your_jwt_secret>"

# 4) DB 마이그레이션
$ npx prisma migrate dev

# 5) 개발 서버 실행
$ npm run dev
```

---

