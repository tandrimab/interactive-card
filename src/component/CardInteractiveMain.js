import React from "react";
import CardLeftScreen from "./CardLeftScreen";
import CardRightSCreen from "./CardRightSCreen";

export default function CardInteractiveMain (props) {
    return <div className="xl:container bg-white lg:columns-2 lg:gap-8 h-full xs:columns-1 xs:col xs:flex">
        <CardLeftScreen />
        <CardRightSCreen />
    </div>
}