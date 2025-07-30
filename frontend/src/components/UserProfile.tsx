import Avatar from "./Avatar"

interface UserProfileProps{
  className?:string
  nickName?:string
}

function UserProfile({
  className="",
  nickName="user",

}:UserProfileProps){
  return (
    <div className={`flex items-center gap-3 p-2 pl-8 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${className}`}>
      <Avatar/>
      <span>{nickName}</span>
    </div>

  )

}

export default UserProfile