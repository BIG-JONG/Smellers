import Avatar from "@/components/Avatar"
import Pagination from "@/components/Pagination"
import SearchInput from "@/components/SearchInput"
import UserProfile from "@/components/UserProfile"
import UserProfileSection from "@/components/UserProfileSection"
import { useState } from "react"

const FollowListPage:React.FC=()=>{

  const [searchTerm, setSearchTerm] = useState('')

   const users = [
    { nickName: 'lee' },
    { nickName: 'kim' },
    { nickName: 'park' },
    { nickName: 'lim' },
    { nickName: 'lee_soo' },
  ];

    const filteredUsers = users.filter(user =>
    user.nickName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <div className="mt-2">
     <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {searchTerm.trim() !== '' && (
          filteredUsers.length > 0 ? (
            filteredUsers.map((user, idx) => (
              <UserProfile key={idx} nickName={user.nickName} />
            ))
          ) : (
            <p className="p-4 text-gray-500">검색 결과가 없습니다.</p>
          )
        )}
      </div>
      <UserProfileSection
        profileImageUrl = "https://i.namu.wiki/i/YfH4cZLqCEfWpJMCTs2gWwTUDW2ho788F6CBRnqzn72tfPhq9Y9XBJ7tDYPko61rFcCWID2gHOvtSIHuP6tcjQ.webp"
        nickname= "testUser"        
        email = "test@gmail.com"         
        isCurrentUser = {false}
        isFollowing={true}
      />
      <UserProfileSection
        profileImageUrl = "https://cafe24.poxo.com/ec01/figurepresso89/BhNwo1jckXH28PSBZRxpvrRNVBIPVsjIZXgklj2fzlwtz4XBkYsUeuG/tl2zOxkvgioVJTtBnfs8EcuagkLTXA==/_/web/product/big/201708/7507_shop1_256551.jpg"
        nickname= "testUser"        
        email = "test@gmail.com"         
        isCurrentUser = {false}
        isFollowing={true}
      />
      <Pagination/>
    </div>
  )
}

export default FollowListPage