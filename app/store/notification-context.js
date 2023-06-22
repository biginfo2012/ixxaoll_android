import React from "react";

const NotificationContext = React.createContext({
    notificationCount: 0,
    onSetNotificationCount: (notificationCount) => {}
})

export default NotificationContext;