import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    isVisible && (
      <div className={`notification ${type}`}>
        <span>{message}</span>
        <button className="close-btn" onClick={handleClose}>X</button>
      </div>
    )
  );
};

export default Notification;
