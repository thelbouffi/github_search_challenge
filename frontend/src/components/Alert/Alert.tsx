import React, { FC } from 'react';
import './Alert.css';

interface AlertProps {
  message: string;
  onClick: () => void;
}

const Alert: FC<AlertProps> = ({ message, onClick }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClick}>
          &times;
        </span>
        <p className="modal-msg">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
