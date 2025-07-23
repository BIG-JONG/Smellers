interface PaginationProps{
  currentPage?:number //현재 페이지 번호
  totalPage?:number //전체 페이지 수
  onPageChange?:(page:number)=>void //페이지 변경시 호출 함수
  pageSize?:number //페이지당 항목 수 
  siblingCount?:number //햔 페이지 기준 좌우 몇개의 페이지를 나타낼지 
  boundaryCount?:number //첫, 끝 페이지에 무조건 보여줄 페이지 수
  disabled?:boolean //페이지네이션 비활 여부
}

function Pagination({
  currentPage = 1,
  totalPage = 10,
  onPageChange,
  pageSize =5,
  siblingCount = 1 ,
  boundaryCount = 1,
  disabled = false,
}:PaginationProps){

  const createPageNumbers = ()=>{
    const totalNumbers = siblingCount*2+3  + boundaryCount*2;
    const totalBlocks = totalNumbers +2 //dots

    if(totalPage <=totalBlocks){
      return Array.from({length:totalPage}, (_,i)=>i+1)
    }

    const pages:(number|"...")[]=[];

    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount+2)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage - boundaryCount)

    //left boundary
    for(let i =1; i <=boundaryCount; i++){
      pages.push(i)
    }

    if(leftSiblingIndex > boundaryCount+2){
      pages.push("...")
    }else if (leftSiblingIndex === boundaryCount +2){
      pages.push(boundaryCount+1);
    }

    //middle page
    for(let i = leftSiblingIndex; i <=rightSiblingIndex ; i++){
      pages.push(i)
    }

    //right dots
    if(rightSiblingIndex < totalPage - boundaryCount -1){
      pages.push("...")
    }else if (rightSiblingIndex === totalPage - boundaryCount -1){
      pages.push(totalPage - boundaryCount)
    }

    //right boundary
    for(let i = totalPage - boundaryCount +1; i <=totalPage ; i++){
      pages.push(i)
    }

    return pages
  }

  const pageNumbers = createPageNumbers();

  return(
    <ul className="flex justify-center gap-1 text-gray-900">
      <li>
        <button
          onClick={()=>onPageChange?.(currentPage -1)}
          disabled = {currentPage ===1||disabled}
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
          aria-label="Previous page"
        >
           ◀
        </button>
      </li>

      {pageNumbers.map((page, index)=>(
        <li key ={index}>
          {page === "..."?(
            <span className="grid size-8 place-content-center text-sm text-gray-400">...</span>
          ):(
          <button
            onClick={()=>onPageChange?.(page as number)}
            disabled = {disabled}
            className={`size-8 rounded border text-center text-sm/8 font-medium transition-colors 
              ${page === currentPage
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
          >
            {page}
          </button>
          )}
        </li>
      ))}
          
      <li>
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPage || disabled}
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 disabled:opacity-40"
          aria-label="Next page"
        >
          ▶
        </button>
      </li>
    </ul>
  )
}

export default Pagination;