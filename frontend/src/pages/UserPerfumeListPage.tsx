import Pagination from "@/components/Pagination"
import PerfumeListSection from "@/components/PerfumeListSection"
import UserProfileSection from "@/components/UserProfileSection"

const UserPerfumeListPage:React.FC=()=>{
  return(
    <div>
      <UserProfileSection
        profileImageUrl = "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg"
        nickname= "testUser"        
        email = "test@gmail.com"         
        isCurrentUser = {false}
        isFollowing={true}
      />
      <PerfumeListSection
        title="제목"
        perfumes={[
          {
            id: "1",
            name: "Chanel No. 5",
            imageUrl: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg",
            price: 150000,
            rating: 4.5,
          },
          {
            id: "2",
            name: "향수2",
            imageUrl: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg",
            price: 52000,
            rating: 4.0,
          },
          {
            id: "3",
            name: "향수3",
            imageUrl: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg",
            price: 52000,
            rating: 4.0,
          },
          {
            id: "4",
            name: "향수4",
            imageUrl: "https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg",
            price: 52000,
            rating: 4.0,
          },
        ]}
        currentPage={1}
        totalPage={1}
        onPageChange={() => {}}
      />
      <Pagination/>
    </div>
  )
}

export default UserPerfumeListPage