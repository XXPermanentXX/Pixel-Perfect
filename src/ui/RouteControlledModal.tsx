import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RouteControlledModalProps {
  hash: string;
  onClose?: () => void;
  onOpenChange?: (value: boolean) => void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}
/**
 * RouteControlledModal是一个受路由控制的模态对话框组件。
 * 它根据当前URL的hash值来决定模态对话框的显示状态，并提供模态对话框的关闭逻辑。
 * 此组件通过React导航库来控制模态对话框的显示与隐藏，而不是直接操作DOM。
 *
 * @param {string} hash - 用于控制模态对话框显示的URL hash值。
 * @param {Function} onClose - 当模态对话框关闭时调用的回调函数。
 * @param {Function} onOpenChange - 当模态对话框的打开状态发生变化时调用的回调函数。
 * @param {ReactNode} header - 模态对话框头部的内容。
 * @param {ReactNode} body - 模态对话框主体的内容。
 * @param {ReactNode} footer - 模态对话框底部的内容。
 * @param {Object} rest - 其他传入的属性，将被传递给Modal组件。
 * @returns {JSX.Element} 返回一个模态对话框组件，其显示状态由URL的hash值控制。
 */
const RouteControlledModal: React.FC<RouteControlledModalProps> = ({
  hash,
  onClose,
  onOpenChange,
  header,
  body,
  footer,
  ...rest
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isModalActive = location.hash === hash;
    if (isModalActive) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [location.hash]);
  const handleClose = () => {
    navigate(-1);
    onClose?.();
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      onOpenChange={onOpenChange}
      {...rest}
    >
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        {body && <ModalBody>{body}</ModalBody>}
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default RouteControlledModal;
