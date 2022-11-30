import React from "react";
import done from "../asset/images/done.png";

export default function SuccessfulModal(props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={done} className="done-img" alt="done-img" />
      <p className="header">THANK YOU!</p>
      <p className="subtext">We’ve added your card details</p>
      <button className="confirm-btn" onClick={props.continue}>
        Continue
      </button>
    </div>
  );
}
