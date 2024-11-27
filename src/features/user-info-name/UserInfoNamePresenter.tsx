import UserInfoNameView from "@/features/user-info-name/UserInfoNameView"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/provider"
import { useMemo, useState } from "react"
import { updateUserData } from "@/models/user/authSlice"
const UserInfoName:React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [userName, setUserName] = useState(user?.username || "")
  const [isNameEditable, setIsNameEditable] = useState(false)
  const [userNameError, setUserNameError] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  const validateUserName = (name: string) => {
    let errorMessage = ''
    if (name.length <= 0) {
      errorMessage = "Name cannot be empty"
    }
    else if (name.length > 20) {
      errorMessage = "Exceed 20 characters"
    }
    return errorMessage
  }

  const isUserNameInvalid = useMemo(() => {
    return !!userNameError
  }, [userName])
  const handleUserNameChange = (userName: string) => {
    setUserName(userName)
    const errMessage = validateUserName(userName)
    setUserNameError(errMessage)
  }
  const handleUpdateUserName = () => {
      dispatch(updateUserData({ username: userName }))
      setIsNameEditable(false)
  }
  return (
    <UserInfoNameView
      userName={userName}
      isNameEditable={isNameEditable}
      isUserNameInvalid={isUserNameInvalid}
      userNameError={userNameError}
      setIsNameEditable={setIsNameEditable}
      handleUpdateUserName={handleUpdateUserName}
      handleUserNameChange={handleUserNameChange}
    />
  )
}
export default UserInfoName