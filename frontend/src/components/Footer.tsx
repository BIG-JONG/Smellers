

interface FooterProps{
  logo?:string
  copyright?: string
  className?:string
}

function Footer({
  logo, 
  copyright,
  className
}:FooterProps){
  return (
    <footer className={`bg-gray-100 ${className}`}>
      <div className="relative mx-auto max-w-screen-full px-10 sm:px-16 lg:px-24 py-8 lg:pt-24">
        {/* top button */}
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <a
            className="inline-block rounded-full bg-gray-800 p-2 text-white shadow-sm transition hover:bg-gray-800 sm:p-3 lg:p-4"
            href="#MainContent"
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            {/* logo */}
            <div className="flex justify-center text-teal-600 lg:justify-start">
              {/* logo img넣는 부분 */}
              <img src={logo ?? "/vite.svg"} alt="Vite Logo" /> 
            </div>

            <p className="mx-auto mt-6 max-w-md text leading-relaxed text-gray-500 lg:text-left">
              향기로운 기억들이 모여 새로운 이야기가 시작되는 곳,<br/>
              나만의 향수를 기록하고 특별한 순간들을 함께 나누는 공간<br/>
              당신의 취향과 감성을 펼쳐 보세요.<br/>
            </p>
          </div>

          {/* social - 사이트 연결*/}
          <ul
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
          >
            <li>
              <a className="flex items-center text-gray-700 transition hover:text-gray-700/75" href="#"> 
                  <img 
                    src="/notion.png" 
                    alt="notion Logo" 
                    className="w-5 h-5 relative top-0.5" />
                {/* <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                </svg> */}
              </a>
            </li>

            <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                <img 
                  src="/github.png" 
                  alt="github Logo" 
                  className="w-5 h-5 relative top-0.5" />
              </a>
            </li>
          </ul>

            
            {/* <li>
              <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li> */}
        </div>


       {/* copyright */}
        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          {copyright ?? "Copyright © 2025. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
export default Footer;
