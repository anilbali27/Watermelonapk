import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import LeftArrow from "../../signup/LeftArrow";
const LeftArrowImg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15.046}
    height={15.667}
    viewBox="0 0 15.046 15.667"
    {...props}
  >
    <G
      id="Icon_feather-arrow-left"
      data-name="Icon feather-arrow-left"
      transform="translate(-6.75 -6.439)"
    >
      <Path
        id="Path_1474"
        data-name="Path 1474"
        d="M21.046,18H7.5"
        transform="translate(0 -3.727)"
        fill="none"
        stroke="#7b868a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        id="Path_1475"
        data-name="Path 1475"
        d="M14.273,21.046,7.5,14.273,14.273,7.5"
        fill="none"
        stroke="#7b868a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </G>
  </Svg>
);
export default LeftArrowImg;
