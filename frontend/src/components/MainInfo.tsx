
interface MainInfoProps{
  src?:string
  title?:string
  content?:string
  // className?:string
}
function MainInfo({

}:MainInfoProps){
  return(
    <section className="bg-white lg:grid  lg:place-content-center">
      <div
        className="mx-auto w-screen max-w-screen-xl px-4 py-12 sm:px- sm:py-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px- lg:py-24"
      >
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold sm:text-5xl text-outline transition-transform duration-800 ease-in-out hover:scale-105">향수의 추억을 기록하고,</h1>
          <span className="text-4xl font-bold sm:text-5xl whitespace-nowrap inline-block text-4xl font-bold sm:text-5xl whitespace-nowrap transition-transform duration-800 ease-in-out hover:scale-105"> 새로운 향기를  </span>
          <span className="text-4xl font-bold sm:text-5xl text-outline inline-block text-4xl font-bold sm:text-5xl whitespace-nowrap transition-transform duration-800 ease-in-out hover:scale-105">발견하세요</span>
            

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed transition-transform duration-800 ease-in-out hover:scale-105">
            당신의 향기를 담은 컬렉션을 만들고,
            공유하며 새로운 사람들과 소통하세요.
            모든 향수가 추억이 되는 곳, <strong>AromaBase</strong>입니다.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <a
              className="inline-block rounded  bg-black px-5 py-3 font-medium text-white shadow-sm transition-colors duration-200 border border-transparent hover:bg-white  hover:text-black  hover:border-black"
              href="#"
            >
              시작하기
            </a>

            {/* <a
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="#"
            >
              Learn More
            </a> */}
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          className="mx-auto max-w-md text-gray-900 md:block"
          aria-hidden="true"
        >
          <defs>
            {/* 3색 원형 그라데이션 */}
            <linearGradient  id="grad" cx="60%" cy="50%" r="70%" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fcd9e9ff" />      {/* 핑크 */}
              <stop offset="70%" stopColor="#dcf7ffff" />     {/* 노랑 */}
               <stop offset="100%" stopColor="#deffeaff" />
            </linearGradient>

            {/* 블러 필터 */}
            <filter id="blurGlow" x="-50%" y="-50%" width="200%" height="200%" >
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#fcd9e9ff" floodOpacity="0.7"/>
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#dcf7ffff" floodOpacity="0.6"/>
              {/* <feDropShadow dx="0" dy="0" stdDeviation="24" floodColor="#deffeaff" floodOpacity="0.8"/> */}
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>

          {/* 메인 원 (그라데이션) */}
          <circle cx="200" cy="200" r="160" fill="url(#grad)" filter="url(#blurGlow)" />
          
          {/* 원 테두리 */}
          <circle
            // cx="200"
            // cy="200"
            // r="120"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="8"
            filter="url(#blurGlow)"
          />
        </svg>
      </div>
    </section>
  )
}

export default MainInfo;