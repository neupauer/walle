import React, { useState, useEffect } from "react";

import Icon from "../Icon";
import Text from "../Components/Text";
import ControlButton from "./ControlButton";
import Button from "./Button";
import Card from "./Card";
import ReactModal from "react-modal";
import ControlsModal from "./ControlsModal";
import FireModal from "./FireModal";

const ControlPanel = ({ ...rest }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalFire, setShowModalFire] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalFire = () => {
    setShowModalFire(true);
  };

  const handleCloseModalFire = () => {
    setShowModalFire(false);
  };

  return (
    <div className="" {...rest}>
      <Card className="mt-8">
        <div className="flex flex-row items-center">
          <Icon.Terminal className="stroke-current text-indigo-500 inline-block h-6 w-6" />
          <Text category="h3" className="ml-4 text-gray-700">
            Commands
          </Text>
        </div>

        <div className="mt-4">
          <Button onClick={handleOpenModal}>
            <span>Take Control</span>
          </Button>
          <Button onClick={handleOpenModalFire} className="ml-2">
            Fire
          </Button>
        </div>
      </Card>

      <ControlsModal
        isOpen={showModal}
        handleClose={handleCloseModal}
      ></ControlsModal>

      <FireModal
        isOpen={showModalFire}
        handleClose={handleCloseModalFire}
      ></FireModal>
    </div>
  );
};

export default ControlPanel;
