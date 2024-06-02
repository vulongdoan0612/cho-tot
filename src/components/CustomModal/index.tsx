
import { Modal, ModalProps } from "antd";
import { omit } from "lodash";
import React from "react";

type ICustomModalProps = ModalProps;

const CustomModal = ({
  children,
  destroyOnClose,
  className,
  footer,
  ...props
}: ICustomModalProps) => {
  
  return (
    <Modal
      {...omit(props, "className")}
      centered
      destroyOnClose={destroyOnClose || true}
      className={`custom-modal ${className || ""}`}
      footer={footer || null}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
