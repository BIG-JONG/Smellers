interface CurrentPostProps{
  src?:string
  datetime?:string
  perfumeName?:string
  content?:string
}

function CurrentPost({
  src="https://web-resource.tamburins.com/catalog/product/12001506/0d9b6071-c0e9-433b-a10e-5c5afe10c3b1/thumbnail_Bottari_50ml_Perfume_2.jpg",
  datetime="",
  perfumeName="",
  content="샤워하고 나서 자연의 냄새를 맡고 싶을 때 쓰면 딱이지만 흙 냄새가 너무 심해서 호불호가 갈릴 수도 있을 거라고 생각합니다."
}:CurrentPostProps){
  return(
    <div>
      <article className="w-78 h-80 overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
        <img
          alt=""
          src={src}
          className="h-40 w-full object-cover"
        />

        <div className="bg-white p-4 sm:p-6">
          <time dateTime={datetime} className="block text-xs text-gray-500"> 10th Oct 2022 </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg text-gray-900">{perfumeName}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {content}
          </p>
        </div>
      </article>

    </div>
  )
}

export default CurrentPost