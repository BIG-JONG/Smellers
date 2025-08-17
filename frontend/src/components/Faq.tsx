import { useEffect, useRef, useState } from "react";

interface FaqProps{
  title?:string
  answer?:string
}

const faqData=[
  {
    title: '향수를 뿌리는 가장 좋은 위치는 어디인가요?',
    answer: '향수는 체온이 높은 부위에 뿌리는 것이 가장 효과적입니다. \n손목 안쪽, 귀 뒤쪽, 목덜미, 팔꿈치 안쪽 등 맥박이 뛰는 부위에 가볍게 분사해 주세요. \n옷 위보다는 피부에 직접 뿌리는 것이 향이 오래 지속됩니다.',
  },
  {
    title: '향수는 얼마나 자주, 얼마나 많이 뿌려야 하나요?',
    answer: '일반적으로 2~3회 분사가 적당합니다. \n너무 많이 뿌리면 향이 과할 수 있으니 주의하세요. \n외출 전이나 샤워 후, 보습 후에 뿌리면 지속력이 더 좋아집니다.',
  },
  {
    title: '테스터 없이 향수를 고르는 방법이 있을까요?',
    answer: '향료(노트) 정보와 향수의 계열(플로럴, 시트러스, 우디 등)을 확인하세요. \n평소 좋아하는 향이나 계절, 사용하는 상황에 맞춰 고르는 것도 좋은 방법입니다. \n사용자 리뷰나 추천 기능을 참고하는 것도 도움이 됩니다.',
  },
  {
    title: '향수를 오래 지속시키는 방법이 있나요?',
    answer: '보습된 피부에 뿌리면 향이 오래 지속됩니다. \n향수를 뿌리기 전 무향 로션을 바르거나 바세린을 얇게 바른 후 사용해 보세요. \n같은 라인의 바디 제품과 함께 쓰는 것도 좋은 방법입니다.',
  },
  {
    title: '향수는 어떻게 보관하는 것이 좋나요?',
    answer: '향수는 직사광선을 피하고 서늘하고 건조한 곳에 보관하는 것이 좋습니다. \n욕실처럼 온도와 습도가 높은 곳은 피하고, \n가능한 원래 포장 상태로 보관하면 향이 변질되는 것을 줄일 수 있어요. \n너무 오래 보관하면 향이 변하거나 약해질 수 있으니, \n개봉 후 1~2년 안에 사용하는 것을 권장합니다.',
  },
]

function Faq({}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const [maxHeights, setMaxHeights] = useState<number[]>([]);

  useEffect(() => {
    const newMaxHeights = faqData.map((_, index) => {
      if (openIndex === index) {
        return contentRefs.current[index]?.scrollHeight || 0;
      }
      return 0;
    });
    setMaxHeights(newMaxHeights);
  }, [openIndex]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return(
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
      <h2 className="text-lg sm:text-xl xl:text-2xl font-bold flex justify-center mb-8">FAQ</h2>
      {faqData.map((faq, index) => (
        <div key={index} className="mt-4">
          <div
            className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            onClick={() => toggleAccordion(index)} 
          >
            <span className="text-[12px] sm:text-sm font-medium">{faq.title}</span>
            <svg
              className={`size-5 shrink-0 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
             style={{
              maxHeight: `${maxHeights[index] || 0}px`,
            }}
          >
            <p className="px-4 pt-4 pb-4 text-[10px] sm:text-xs text-gray-900 break-words whitespace-pre-line leading-snug">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Faq;