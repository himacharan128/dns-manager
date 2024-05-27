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
      <div 
        className={`notification ${type}`} 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '10px', 
          border: '1px solid #ddd',
          margin: '10px auto', 
          maxWidth: '400px', 
          backgroundColor: '#f9f9f9' 
        }}
      >
        <span>{message}</span>
        <button 
          className="close-btn" 
          onClick={handleClose} 
          style={{ 
            padding: '5px 10px', 
            cursor: 'pointer', 
            backgroundColor: '#f44336', 
            color: '#fff', 
            border: 'none' 
          }}
        >
          X
        </button>
      </div>
    )
  );
};

export default Notification;

