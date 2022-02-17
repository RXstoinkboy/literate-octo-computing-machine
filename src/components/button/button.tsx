import React, { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
};

export const Button = (props: ButtonProps): JSX.Element => (
  <button onClick={props.onClick} disabled={props.disabled}>
    {props.children}
  </button>
);
