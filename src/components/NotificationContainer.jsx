import { useState, useEffect } from 'react';
import './NotificationContainer.css';

// eslint-disable-next-line react/prop-types
const Notification = ({ id, title, message, color, removeNotification }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeNotification(id);
    }, 5000); // Notificaciones desaparecen después de 5 segundos

    return () => clearTimeout(timeout);
  }, [id, removeNotification]);

  return (
    <div className="notification" style={{ backgroundColor: color }}>
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
};

const NotificationContainer = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, message, color) => {
    const id = new Date().getTime();
    setNotifications([...notifications, { id, title, message, color }]);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  window.addNotification = addNotification;

  return (
    <div className="notification-container">
      {notifications.map(({ id, title, message, color }) => (
        <Notification
          key={id}
          id={id}
          title={title}
          message={message}
          color={color}
          removeNotification={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
