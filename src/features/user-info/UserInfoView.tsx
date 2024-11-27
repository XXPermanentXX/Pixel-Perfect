import RouteControlledModal from "@/ui/RouteControlledModal"
import { Divider } from "@nextui-org/react"
import UserInfoName from "../user-info-name/UserInfoNamePresenter"
import UserInfoAvatar from "../user-info-avatar/UserInfoAvatarPresenter"

// interface UserInfoViewProps {

// }
const UserInfoView:React.FC = () => {
  return (
    <div>
      <RouteControlledModal hash="#user-profile"
        header="My profile"
        body={
          <div className="flex flex-col gap-2">
            <UserInfoName/>
            <Divider/>
            <UserInfoAvatar/>
            <Divider/>
          </div>
        }
      />
    </div>
  )
}
export default UserInfoView