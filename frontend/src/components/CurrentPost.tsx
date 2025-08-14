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
  content=""
}:CurrentPostProps){
  return(
    <div>
      <article className="group relative block w-78 h-80 overflow-hidden shadow-sm transition hover:shadow-lg">
        <img
          alt={perfumeName}
          src={src}
          className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-60"
        />

        <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <time dateTime={datetime} className="block text-xs text-white opacity-80">
            {datetime}
          </time>
          <h3 className="mt-0.5 text-lg font-bold text-white line-clamp-1">
            {perfumeName}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-white">
            {content}
          </p>
        </div>
      </article>

      {/* <article className="w-78 h-80 overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
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
      </article> */}

    </div>
  )
}

export default CurrentPost