interface ProductCardProps{
  image?:string
  productName?:string
  price?:string
  ingredient?:string[]
}

function ProductCard({
  image,
  productName="퍼퓸 이브닝글로우",
  price="130,000",
  ingredient=["로즈","라즈베리","머스크"]
}:ProductCardProps){
  return (
    <a href="#" 
      className="block w-60 rounded border border-gray-200 shadow-sm shadow-gray-200 bg-white overflow-hidden">
      <img
        alt=""
        // src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        src="https://img.vogue.co.kr/vogue/2024/12/style_67618e13dd977-1050x1400.jpg"
        className="w-60 aspect-[3/4] object-cover rounded"
      />

      <div className="p-3">
        <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">{productName}</h3>
        <h5 className="mt-4 text-lg font-medium text-gray-800 sm:text-xl">₩ {price}</h5>

        <p className="mt-2 max-w-sm text-gray-700">
          {ingredient?.join(' | ')}
        </p>
      </div>
    </a>
  )
}

export default ProductCard;
