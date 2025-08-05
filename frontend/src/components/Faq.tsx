interface FaqProps{
  title?:string
  answer?:string
}

function Faq({

}:FaqProps){
  return(
    <div className="w-full max-w-[900px] mx-auto min-h-[300px] mt-10">
      {/* 1 */}
      <details className="group [&_summary::-webkit-details-marker]:hidden max-h-[200px] overflow-y-auto" open>
        <summary
          className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer"
        >
          <span className="text-lg font-medium">향수를 뿌리는 가장 좋은 위치는 어디인가요?</span>

          <svg
            className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <p className="px-4 pt-4 pb-4 text-gray-900 break-words whitespace-pre-line">
          향수는 체온이 높은 부위에 뿌리는 것이 가장 효과적입니다. <br/>
          손목 안쪽, 귀 뒤쪽, 목덜미, 팔꿈치 안쪽 등 맥박이 뛰는 부위에 가볍게 분사해 주세요. <br/>
          옷 위보다는 피부에 직접 뿌리는 것이 향이 오래 지속됩니다.<br/>
        </p>
      </details>
      {/* 2 */}
      <details className="group [&_summary::-webkit-details-marker]:hidden mt-4" >
        <summary
          className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer"
        >
          <h2 className="text-lg font-medium">향수는 얼마나 자주, 얼마나 많이 뿌려야 하나요?</h2>

          <svg
            className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <p className="px-4 pt-4 pb-4 text-gray-900 break-words whitespace-pre-line">
          일반적으로 2~3회 분사가 적당합니다. <br/>
          너무 많이 뿌리면 향이 과할 수 있으니 주의하세요. <br/>
          외출 전이나 샤워 후, 보습 후에 뿌리면 지속력이 더 좋아집니다.<br/>
        </p>
      </details>
      {/* 3 */}
      <details className="group [&_summary::-webkit-details-marker]:hidden  mt-4" >
        <summary
          className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer"
        >
          <h2 className="text-lg font-medium">테스터 없이 향수를 고르는 방법이 있을까요?</h2>

          <svg
            className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <p className="px-4 pt-4 pb-4 text-gray-900 break-words whitespace-pre-line">
         향료(노트) 정보와 향수의 계열(플로럴, 시트러스, 우디 등)을 확인하세요. <br/>
         평소 좋아하는 향이나 계절, 사용하는 상황에 맞춰 고르는 것도 좋은 방법입니다.<br/>
         사용자 리뷰나 추천 기능을 참고하는 것도 도움이 됩니다.<br/>
        </p>
      </details>
      {/* 4 */}
      <details className="group [&_summary::-webkit-details-marker]:hidden mt-4" >
        <summary
          className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer"
        >
          <h2 className="text-lg font-medium">향수를 오래 지속시키는 방법이 있나요?</h2>

          <svg
            className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <p className="px-4 pt-4 pb-4 text-gray-900 break-words whitespace-pre-line">
         보습된 피부에 뿌리면 향이 오래 지속됩니다. <br/>
         향수를 뿌리기 전 무향 로션을 바르거나 바세린을 얇게 바른 후 사용해 보세요. <br/>
         같은 라인의 바디 제품과 함께 쓰는 것도 좋은 방법입니다.<br/>
        </p>
      </details>
      <details className="group [&_summary::-webkit-details-marker]:hidden mt-4">
        <summary
          className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900 cursor-pointer"
        >
          <span className="text-lg font-medium">향수는 어떻게 보관하는 것이 좋나요?</span>

          <svg
            className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <p className="px-4 pt-4 pb-4 text-gray-900 break-words whitespace-pre-line">
          향수는 직사광선을 피하고 서늘하고 건조한 곳에 보관하는 것이 좋습니다. <br/>
          욕실처럼 온도와 습도가 높은 곳은 피하고, <br/>
          가능한 원래 포장 상태로 보관하면 향이 변질되는 것을 줄일 수 있어요. <br/>
          너무 오래 보관하면 향이 변하거나 약해질 수 있으니, <br/>
          개봉 후 1~2년 안에 사용하는 것을 권장합니다.
        </p>
      </details>
    </div>
  )
}

export default Faq