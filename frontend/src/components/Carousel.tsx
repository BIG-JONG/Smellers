import { useEffect } from 'react';
import { initCarousels } from 'flowbite';

const carouselSlides = [
  {
    title: "광고 없는 솔직한 후기를 만나보세요",
    subtitle: "향수를 좋아하는 사람들이 직접 남긴 리얼 리뷰",
    image: "/images/review.png",
    cta: { text: "향수 둘러보기", link: "/perfumes" },
  },
  {
    title: "취향이 비슷한 사람을 팔로우",
    subtitle: "나와 향 취향이 맞는 사람의 게시물을 모아보세요",
    image: "/images/lemon.png",
    cta: { text: "추천 향수 보기", link: "/recommendations" },
  },
  {
    title: "나만의 향수 기록장",
    subtitle: "좋아하는 향수와 후기를 자유롭게 남겨보세요",
    image: "/images/perfume-reviews.jpg",
    cta: { text: "리뷰 읽기", link: "/reviews" },
  },
  {
    title: "향수를 좋아하는 사람들의 공간",
    subtitle: "취향을 공유하고 새로운 향을 발견하세요",
    image: "/images/wildflowers.png",
    cta: { text: "테스트 시작하기", link: "/quiz" },
  },
];

function Carousel() {
  useEffect(() => {
    initCarousels();
  }, []);

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
      data-carousel-interval="4000"
    >
      <div className="relative h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden rounded-lg">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`hidden duration-700 ease-in-out`}
            data-carousel-item={index === 0 ? "active" : ""}
          >
            <img
              src={slide.image}
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 brightness-100 saturate-[80%]"
              alt={slide.title}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">{slide.title}</h2>
              <p className="mt-2 text-sm md:text-lg drop-shadow-md">{slide.subtitle}</p>
              {slide.cta && (
                <a
                  href={slide.cta.link}
                  className="mt-4 inline-block rounded bg-white px-4 py-2 text-sm md:text-base font-medium text-black shadow hover:bg-black hover:text-white transition"
                >
                  {slide.cta.text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white"
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          />
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 6 10">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 6 10">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default Carousel;
