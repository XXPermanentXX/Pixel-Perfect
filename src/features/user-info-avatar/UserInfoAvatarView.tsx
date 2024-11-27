import { Select, SelectItem, Avatar } from "@nextui-org/react";

interface UserInfoAvatarViewProps {
  InitAvatarUrls: string[];
  userAvatarUrl: string;
  handleUpdateUserAvatar: (avatar: string) => void;
}

const UserInfoAvatarView: React.FC<UserInfoAvatarViewProps> = ({
  InitAvatarUrls,
  userAvatarUrl,
  handleUpdateUserAvatar,
}) => {
  return (
    <div className="flex justify-between my-2">
      <div className="flex items-center">User Avatar</div>
      <div className="flex flex-1 justify-end items-center gap-2">
        <Avatar src={userAvatarUrl} />
        <Select
          className="max-w-40"
          size="md"
          selectedKeys={[userAvatarUrl]}
          onChange={(e) => handleUpdateUserAvatar(e.target.value)}
        >
          {InitAvatarUrls.map((avatar, index) => (
            <SelectItem
              key={avatar}
              value={avatar}
              startContent={<Avatar src={avatar} />}
            >
              {`avatar ${index + 1}`}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
export default UserInfoAvatarView;
