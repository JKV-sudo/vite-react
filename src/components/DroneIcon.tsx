import React from "react";
import DroneSvg from "../assets/drone.svg?react";

const DroneIcon: React.FC<{
  size?: number | string;
  style?: React.CSSProperties;
}> = ({ size = 40, style }) => (
  <DroneSvg width={size} height={size} style={style} />
);

export default DroneIcon;
