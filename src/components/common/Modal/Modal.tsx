import React, { ReactNode } from "react"
import ReactModal from "react-modal"
import clsx from "clsx"

ReactModal.setAppElement("#root") // this is for accessibility purpose. we want other page content to be hidden to assistive technology when this modal is opened

type ModalProps = {
  open: boolean
  children?: ReactNode
  onClose?: () => void
  label: string
}

const overlay = {
  overlay: {
    background: "rgba(3, 4, 41, 0.7)",
  },
}

export const Modal = ({ open, children, onClose, label }: ModalProps) => {
  return (
    <ReactModal
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
    </ReactModal>
  )
}
