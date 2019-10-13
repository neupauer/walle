import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Icon from "../Icon";
import Text from "./Text";
import useKeyPress from "../utils/useKeyPress";
import ControlButton from "./ControlButton";

ReactModal.setAppElement("#app");

const ControlsModal = ({ isOpen, handleClose }) => {
  const arrowUp = useKeyPress("ArrowUp");
  const arrowDown = useKeyPress("ArrowDown");
  const arrowRight = useKeyPress("ArrowRight");
  const arrowLeft = useKeyPress("ArrowLeft");

  return (
    <ReactModal
      shouldCloseOnEsc={true}
      isOpen={isOpen}
      contentLabel="Controls Modal"
      bodyOpenClassName="overflow-hidden"
      className="absolute inset-0 my-12 mx-32 px-8 py-6 bg-gray-900 text-gray-100 rounded-lg shadow-xl outline-none"
    >
      <div className="flex flex-row items-center justify-between">
        <Text category="s1">Controls</Text>
        <button onClick={handleClose}>
          <Icon.Remove className="text-white h-6 w-6" />
        </button>
      </div>

      <div className="absolute inset-0 mt-24 mb-8 mx-8 flex items-center justify-center">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="w-1/3"></div>
            <div className="w-1/3">
              <ControlButton active={arrowUp} transform="rotate(0)" />
            </div>
            <div className="w-1/3"></div>
          </div>

          <div className="flex flex-row">
            <div className="w-1/3">
              <ControlButton active={arrowLeft} transform="rotate(-90)" />
            </div>
            <div className="w-1/3">
              <ControlButton active={arrowDown} transform="rotate(180)" />
            </div>
            <div className="w-1/3">
              <ControlButton active={arrowRight} transform="rotate(90)" />
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ControlsModal;
