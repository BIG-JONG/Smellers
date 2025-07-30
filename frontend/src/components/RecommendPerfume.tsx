interface RecommendPerfumeProps{
  src?:string
  alt?:string
  title?:string
  content?:string
}

function RecommendPerfume({
  src="https://nonfiction.com/web/product/big/202504/1ba30c3220b8f472dc5c0519782bc05a.jpg",
  alt="",
  title="더 로즈 오 드 퍼퓸",
  content=`로즈 앱솔루트와 제라늄이 빚어내는 선선하고 신비로운 첫인상. 벨벳처럼 부드러운 샌달우드 앱솔루트가 감싸는 자연스럽고 깊은 장미향.`,
}:RecommendPerfumeProps){
    return(
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
          <div className="md:col-span-3">
            <img
              src={src}
              className="rounded transition-transform duration-800 ease-in-out hover:scale-105" 
              alt={alt}
            />
          </div>

          <div className="md:col-span-1">
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl transition-transform duration-200 ease-in-out hover:scale-105">
                {title}
              </h2>

              <p className="mt-4 text-gray-700 transition-transform duration-200 ease-in-out hover:scale-105">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecommendPerfume;





