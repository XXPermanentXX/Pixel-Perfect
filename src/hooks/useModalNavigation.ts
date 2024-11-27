import { throttle } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";

const useModalNavigation = (hash: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleCloseModal = throttle(() => {
    const currentHash = location.hash;
    if (currentHash === hash) {
      navigate(-1);
    }
  }, 5000);

  const handleOpenModal = () => {
    navigate(location.pathname + `${hash}`);
  };

  return { handleCloseModal, handleOpenModal }; // 返回两个函数
};

export default useModalNavigation;