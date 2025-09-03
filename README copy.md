# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```
Smellers
├─ backend
│  ├─ .rest.http
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prisma
│  │  ├─ migrations
│  │  │  ├─ 20250721064208_init
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20250721080907_init
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20250811075900_y
│  │  │  │  └─ migration.sql
│  │  │  └─ migration_lock.toml
│  │  └─ schema.prisma
│  └─ server
│     ├─ src
│     │  ├─ app.ts
│     │  ├─ controllers
│     │  │  ├─ follow.controller.ts
│     │  │  ├─ perfume.controller.ts
│     │  │  └─ user.controller.ts
│     │  ├─ middlewares
│     │  │  ├─ auth.middleware.ts
│     │  │  ├─ authorization.middleware.ts
│     │  │  ├─ error-handing.middleware.ts
│     │  │  ├─ rateLimit.middleware.ts
│     │  │  ├─ upload.middleware.ts
│     │  │  └─ validation-result-handle.ts
│     │  ├─ prisma
│     │  │  └─ client.ts
│     │  ├─ routes
│     │  │  ├─ follow.routers.ts
│     │  │  ├─ perfume.routes.ts
│     │  │  └─ user.routes.ts
│     │  ├─ services
│     │  │  ├─ follow.service.ts
│     │  │  ├─ perfume.service.ts
│     │  │  └─ user.service.ts
│     │  ├─ types
│     │  │  ├─ express
│     │  │  │  └─ index.d.ts
│     │  │  └─ PerfumeSearchParams.ts
│     │  └─ utils
│     │     ├─ changeNoteType.ts
│     │     ├─ deleteFiles.ts
│     │     └─ jwt.ts
│     ├─ tsconfig.json
│     └─ uploads
│        ├─ 1754291196018-58-optimize.jfif
│        ├─ 1754291199994-71-1.jpg
│        ├─ 1754291249671-86-1.jpg
│        ├─ 1754291293351-73-1.jpg
│        ├─ 1754291422798-50-optimize.jfif
│        ├─ 1754292571158-10-2.jpg
│        ├─ 1754292842489-55-legend night.jpg
│        ├─ 1754293121183-89-4.webp
│        ├─ 1754295080860-93-8.webp
│        ├─ 1754376737651-49-b4a334f175e93dded31e59f5ad680f60.jpg
│        ├─ 1754381170457-42-b4a334f175e93dded31e59f5ad680f60.jpg
│        ├─ 1754393174710-38-dragon.jpg
│        ├─ 1754393330515-37-blueberry.jpg
│        ├─ 1754414878410-59-A00000020498534ko.jpg
│        ├─ 1754444849716-70-per.jpg
│        ├─ 1754444922983-26-ë¥´ë¼ë³´.jpg
│        ├─ 1754444967246-33-11111.jpg
│        ├─ 1754445079351-83-12222.png
│        ├─ 1754445118206-94-0-800.jpg
│        ├─ 1754445158373-61-ssss.jpg
│        ├─ 1754445388894-48-baccaratrouge540extrait70ml.jpg
│        ├─ 1754445426469-49-ë¥ëí¬.jpg
│        ├─ 1754445452405-46-10002072133_5.jpg
│        ├─ 1754453466420-79-1111.png
│        ├─ 1754453881561-72-f1.jpg
│        ├─ 1754453955300-69-f2.webp
│        ├─ 1754454098158-12-f3.jpeg
│        ├─ 1754454185172-2-f4.jpeg
│        ├─ 1754454781376-8-f4.jpeg
│        ├─ 1754454799844-43-test.jpg
│        ├─ 1754454950269-88-f4.jpeg
│        ├─ 1754455003658-49-f3.jpeg
│        ├─ 1754455483580-63-f1.jpg
│        ├─ 1755147047502-66-60699291_FRG_MAIN1X1.jpg
│        ├─ 1755153217359-76-111.jpg
│        ├─ 1755267167647-30-ëë°©.jpg
│        ├─ 1755332827577-50-ë¼1.jpg
│        ├─ 1755333449004-41-ì1.jpg
│        ├─ 1755333873787-94-11.jpg
│        ├─ 1755334039537-71-1111.jpg
│        └─ 1755334155572-67-1.jpg
├─ frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.cjs
│  ├─ public
│  │  ├─ favicon.png
│  │  ├─ github.png
│  │  ├─ notion.png
│  │  ├─ test.jpg
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ assets
│  │  │  └─ aromabaselogo.png
│  │  ├─ components
│  │  │  ├─ AccountSettingsForm.tsx
│  │  │  ├─ Alert.tsx
│  │  │  ├─ Avatar.tsx
│  │  │  ├─ Button.tsx
│  │  │  ├─ Carousel.tsx
│  │  │  ├─ Checkbox.tsx
│  │  │  ├─ CurrentPost.tsx
│  │  │  ├─ Dropdown.tsx
│  │  │  ├─ EditProfileForm.tsx
│  │  │  ├─ Faq.tsx
│  │  │  ├─ FollowButton.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ ImageCard.tsx
│  │  │  ├─ InputField.tsx
│  │  │  ├─ Layout.tsx
│  │  │  ├─ LoginForm.tsx
│  │  │  ├─ MainInfo.tsx
│  │  │  ├─ Modal.tsx
│  │  │  ├─ MultiSelectDropdown.tsx
│  │  │  ├─ Pagination.tsx
│  │  │  ├─ PerfumeDetailSection.tsx
│  │  │  ├─ PerfumeListSection.tsx
│  │  │  ├─ PostForm.tsx
│  │  │  ├─ ProductCard.tsx
│  │  │  ├─ RandomPerfumeRecommendationSection.tsx
│  │  │  ├─ RecommendPerfume.tsx
│  │  │  ├─ ScrollTop.tsx
│  │  │  ├─ SearchInput.tsx
│  │  │  ├─ Select.tsx
│  │  │  ├─ Sidebar.tsx
│  │  │  ├─ signupForm.tsx
│  │  │  ├─ StarRating.tsx
│  │  │  ├─ Tag.tsx
│  │  │  ├─ Textarea.tsx
│  │  │  ├─ UserPerfumeListSection.tsx
│  │  │  ├─ UserProfile.tsx
│  │  │  └─ UserProfileSection.tsx
│  │  ├─ index.css
│  │  ├─ main.tsx
│  │  ├─ pages
│  │  │  ├─ FollowListPage.tsx
│  │  │  ├─ LogInPage.tsx
│  │  │  ├─ MainPage.tsx
│  │  │  ├─ MyPerfumeListPage.tsx
│  │  │  ├─ PerfumeDetailPage.tsx
│  │  │  ├─ PerfumeListPage.tsx
│  │  │  ├─ PostPerfumePage.tsx
│  │  │  ├─ SearchResultsPage.tsx
│  │  │  ├─ SignUpPage.tsx
│  │  │  ├─ UserInfoUpdatePage.tsx
│  │  │  ├─ UserPerfumeListPage.tsx
│  │  │  └─ UserSearchPage.tsx
│  │  └─ vite-env.d.ts
│  ├─ tailwind.config.js
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
├─ package-lock.json
├─ package.json
└─ README.md

```