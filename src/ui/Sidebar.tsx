import { useState } from "react";
import { PixelPerfectLogo } from "./PixelPerfectLogo";
import { myModelsIcon, myPhotosIcon, signOutIcon } from "../assets";
import { Avatar, Tab, Tabs, Button, Tooltip, Modal, ModalContent, ModalFooter, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../models/user/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { setSidebarExpanded } from "@/models/AppSlice"
import { initialProductState, setPromptRequest,  } from "../models/generateSlice";
import { useCookies } from "react-cookie";
import { AppDispatch, RootState } from "@/provider";
import { INITIAL_PROMPT } from "@/models/staticDataModel";
import useModalNavigation from "@/hooks/useModalNavigation";

const sidebarTabViews = [
  { id: "model", title: "My model", icon: myModelsIcon },
  { id: "photos", title: "My photos", icon: myPhotosIcon },
];

const Sidebar = () => {
  const [isSignOutModalOpen, setSignOutModalOpen] = useState(false);
  const expanded = useSelector((state:RootState) => state.app.isExpanded);
  const [, , removeCookie] = useCookies(["admin_key"]);

  const sidebarWidth = expanded ? "w-[320px]" : "w-[92px]";
  const sidebarMargin = expanded ? "ml-[33px] mr-[51px]" : "mx-4";
  const logoDisplay = expanded ? "" : "flex-col";
  const logoTextWidth = expanded ? "w-40" : "w-0 h-0";
  const buttonTextWidth = expanded ? "w-40" : "w-0";
  const buttonWidth = expanded ? "w-[236px]" : "w-[60px]";
  const userNameWidth = expanded ? "w-40" : "w-0 h-0";
  const userDivDisplay = expanded ? "" : "flex-col-reverse";
  const signOutButtonMargin = expanded ? "ml-4" : "mx-0 mb-[30px]";

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const user = useSelector((state:RootState) => state.auth.user )

  const handleSignOut = () => {
    dispatch(setPromptRequest(INITIAL_PROMPT));
    dispatch(initialProductState());
    dispatch(logout());
    removeCookie("admin_key");
    navigate("/");
  };

  const {handleOpenModal} = useModalNavigation("#user-profile")

  const renderTabs = sidebarTabViews.map((view) => {
    const tabContent = (
      <div className="flex w-full items-center">
        <img className="px-[18px]" src={view.icon} alt={view.title} />
        <span className={`overflow-hidden text-left text-[18px] text-white transition-all ${buttonTextWidth}`}>{view.title}</span>
      </div>
    );

    return (
      <Tab
        key={view.id}
        title={
          expanded ? (
            tabContent
          ) : (
            <Tooltip showArrow={true} color="primary" placement="left" content={view.title}>
              {tabContent}
            </Tooltip>
          )
        }
      />
    );
  });

  return (
    <aside className={`h-screen bg-dark-bg ${sidebarWidth}`}>
      <nav className={`flex h-full flex-col justify-center ${sidebarMargin}`}>
        <div className={`flex items-center pt-[29px] ${logoDisplay}`}>
          <PixelPerfectLogo />
          <h5 className={`overflow-hidden text-nowrap pl-4 text-[22px] transition-all ${logoTextWidth}`}>PixelPerfect AI</h5>
        </div>

        <div className="flex h-full flex-col">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="light"
            isVertical={true}
            selectedKey={location.pathname.split("/").filter((part) => part)[1]}
            onSelectionChange={(key) => {
              dispatch(setSidebarExpanded(true));
              navigate(`/generate/${key}`);
            }}
            classNames={{
              tabList: "gap-6 h-full pt-[68px] px-0 w-min-10",
              tab: `h-[45px] justify-start px-0 ${buttonWidth}`,
            }}
          >
            {renderTabs}
          </Tabs>
        </div>

        <div className={`flex items-center pb-[32px] ${userDivDisplay}`}>
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
          <Dropdown>
          <DropdownTrigger>
            <Avatar
              showFallback
              isBordered
              color={"secondary"}
              src={user?.avatarUrl}
              style={{ cursor: "pointer" }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem key="profile" onPress={handleOpenModal}>
              My profile
            </DropdownItem>
            </DropdownMenu>
            </Dropdown>
          </div>
          <h5 className={`flex-shrink-0 overflow-hidden text-nowrap pl-6 transition-all ${userNameWidth}`}>{user?.username}</h5>
          <Tooltip showArrow={true} color="primary" placement={expanded ? "top" : "left"} content={"Sign out"}>
            <Button className={`${signOutButtonMargin} pr-1`} isIconOnly variant="light" size="lg" aria-label="SignOut" onClick={() => setSignOutModalOpen(true)}>
              <img src={signOutIcon} alt="SignOut" className="h-9 w-9" />
            </Button>
          </Tooltip>
        </div>
      </nav>

      <Modal
        isOpen={isSignOutModalOpen}
        onClose={() => setSignOutModalOpen(false)}
        hideCloseButton={true}
        classNames={{
          backdrop: ["bg-black bg-opacity-80 backdrop-blur-md"],
        }}
      >
        <ModalContent className="bg-dark-bg p-6 text-center">
          <p>
            Are you sure you want to sign out? <br /> You may lose your prompt and settings.
          </p>
          <ModalFooter className="flex justify-center gap-6 pt-6">
            <Button variant="bordered" color="danger" onClick={handleSignOut} className="text-white">
              Sign Out
            </Button>
            <Button variant="bordered" onClick={() => setSignOutModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </aside>
  );
};

export default Sidebar;
