import { Edit, Check } from 'iconoir-react'
import { Input } from "@nextui-org/react"
interface userInfoNameViewProps {
  isNameEditable: boolean,
  userName: string,
  isUserNameInvalid: boolean,
  userNameError: string
  setIsNameEditable: (isEditable: boolean) => void
  handleUpdateUserName: () => void
  handleUserNameChange: (username:string) => void
}
const UserInfoNameView = ({
  isNameEditable = false,
  userName,
  isUserNameInvalid,
  userNameError,
  setIsNameEditable,
  handleUpdateUserName,
  handleUserNameChange
}:userInfoNameViewProps) => {
  return (
    <div className="flex justify-between h-12 my-2">
      <div className="flex items-center">User Name</div>
      <div className="flex gap-2 items-center">
        <Input
          className='h-8'
          required
          size="sm"
          disabled={!isNameEditable}
          value={userName}
          onValueChange={handleUserNameChange}
          isInvalid={isUserNameInvalid}
          errorMessage={userNameError}
        />
        {isNameEditable
          ? <Check className="h-6 w-6 cursor-pointer" onClick={() => handleUpdateUserName()}/>
          : <Edit className="h-6 w-6 cursor-pointer" onClick={() => setIsNameEditable(true)}/>
        }
      </div>
    </div>
  )
}
export default UserInfoNameView