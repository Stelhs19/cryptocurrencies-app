import React from "react";
import "./Button.scss";

interface ButtonProps {
  label: string;
  onClick: () => void;
  onClose?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, onClose }) => {
  const handleClick = () => {
    onClick();
    if (onClose) {
      onClose();
    }
  };

  return (
    <button className="custom-button" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
