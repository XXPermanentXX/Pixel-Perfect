import { AVATAR_URLS } from "@/models/staticDataModel"
import UserInfoAvatarView from "./UserInfoAvatarView"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/provider"
import { updateUserData } from "@/models/user/authSlice"

const UserInfoAvatar:React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const InitAvatarUrls = AVATAR_URLS
  const [userAvatarUrl, setUserAvatarUrl] = useState(user?.avatarUrl || "")
  const dispatch = useDispatch<AppDispatch>()
  const handleUpdateUserAvatar = (avatarUrl: string) => {
    setUserAvatarUrl(avatarUrl)
      dispatch(updateUserData({ avatarUrl: avatarUrl }))
  }
  return (
    <UserInfoAvatarView
      InitAvatarUrls={InitAvatarUrls}
      userAvatarUrl={userAvatarUrl}
      handleUpdateUserAvatar={handleUpdateUserAvatar}
    />
  )
}
export default UserInfoAvatar