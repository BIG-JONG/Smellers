import CurrentPost from "@/components/CurrentPost"
import MainInfo from "@/components/MainInfo";
import RecommendPerfume from "@/components/RecommendPerfume"

const posts = [
  {
    src: "https://web-resource.tamburins.com/catalog/product/12001506/0d9b6071-c0e9-433b-a10e-5c5afe10c3b1/thumbnail_Bottari_50ml_Perfume_2.jpg",
    datetime: "2025-07-29",
    perfumeName: "탐부린스 보타리",
    content: "흙 내음이 진하게 퍼져요. 자연 속에 있는 기분!"
  },
  {
    src: "https://img.danawa.com/prod_img/500000/674/316/img/3316674_1.jpg?_v=20250423140327&shrink=360:360",
    datetime: "2025-07-30",
    perfumeName: "조말론 우드 세이지",
    content: "바닷바람 느낌과 허브가 섞여 있어요. 시원한 향."
  },
  {
    src: "https://img.danawa.com/prod_img/500000/459/811/img/1811459_1.jpg?_v=20231012174838",
    datetime: "2025-07-28",
    perfumeName: "딥디크 롬브르",
    content: "장미와 나무 향이 어우러져서 고급스러워요."
  },
  {
    src: "https://img.danawa.com/prod_img/500000/656/712/img/5712656_1.jpg?_v=20220110133016",
    datetime: "2025-07-28",
    perfumeName: "러쉬 바닐라리",
    content: "역시 러시! 최고최고최고최고최고 정말 최고최고"
  }
];

const MainPage:React.FC = ()=>{
  return(
    <div className="mt-35">
      <MainInfo />
      <RecommendPerfume/>
      <div className="flex flex-wrap gap-6 justify-center mt-40">
        {posts.map((post, index) => (
          <CurrentPost
            key={index}
            src={post.src}
            datetime={post.datetime}
            perfumeName={post.perfumeName}
            content={post.content}
          />
        ))}
      </div>
      <div className="mt-80"/>
    </div>
  )
}

export default MainPage