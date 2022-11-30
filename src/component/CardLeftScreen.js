import React from "react";
import top from "../asset/images/top_card.png";
import bottom from "../asset/images/bottom_card.png";
import background from "../asset/images/bg-main-desktop.png";

export default function CardLeftScreen() {
  return (
    <div
      className="left-sec-main lg:max-w-lg flex justify-center items-center h-full sm:max-w-sm"
      style={{ background: `url(${background})`, backgroundSize: '100%' }}
    >
      <div className="w-full flex-col flex justify-center items-center">
        <img src={top} className="shadow-2xl" alt="top" />
        <img src={bottom} className="shadow-2xl" alt="bottom" />
      </div>
    </div>
  );
}
