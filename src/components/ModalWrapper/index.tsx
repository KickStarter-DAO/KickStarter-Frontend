import React, { ReactNode } from "react";
import Modal from "react-modal";
import clsx from "clsx";

Modal.setAppElement("#root"); // this is for accessibility purpose. we want other page content to be hidden to assistive technology when this modal is opened

type ModalWrapperProps = {
  open: boolean;
  children?: ReactNode;
  onClose?: () => void;
  label: string;
};

const overlay = {
  overlay: {
    background: "rgba(3, 4, 41, 0.7)",
  },
};

const ModalWrapper = ({
  open,
  children,
  onClose,
  label,
}: ModalWrapperProps) => {
  return (
    <Modal
      isOpen={open}
      closeTimeoutMS={300}
      onRequestClose={onClose}
      contentLabel={label}
      style={overlay}
      className={clsx({
        "modal show-modal": true,
        "hide-modal": !open,
      })}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
