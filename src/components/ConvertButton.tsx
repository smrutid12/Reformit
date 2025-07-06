import React from "react";

const ConvertButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    className={`convert-button primary-button main-button ${
      disabled ? `disabled-button` : ``
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    Convert
  </button>
);

export default ConvertButton;
