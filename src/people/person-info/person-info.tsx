import React from "react";

export type Person = {
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
};

type Props = {
  data: Person;
  selected: boolean;
  onClick: () => void;
};

function PersonInfo(props: Props) {
  const { data } = props;
  return (
    <div
      onClick={props.onClick}
      style={{
        display: "flex",
        height: "100px",
        justifyContent: "center",
        flexDirection: "column",
        padding: "32px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        margin: "10px 0",
        background: "#fff",
        cursor: "pointer",
        border: props.selected ? "2px solid pink" : undefined,
      }}
      className="person-info"
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
