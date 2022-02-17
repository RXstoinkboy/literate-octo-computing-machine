import React from "react";
import "./notification.css";

export enum NotificationType {
  ERROR = "ERROR",
}

type NotificationProps = {
  message: string;
  type?: NotificationType;
};

export const Notification = (props: NotificationProps): JSX.Element => {
  return (
    <div
      className={
        NotificationType.ERROR ? "error-notification" : "other-notification"
      }
    >
      {props.message}
    </div>
  );
};
