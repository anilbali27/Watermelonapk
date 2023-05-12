/** @format */

import * as React from "react";
import Svg, { Polyline } from "react-native-svg";
const UpArrow = (props) => (
  <Svg
    width='20px'
    height='20px'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Polyline
      f
      stroke='#153E73'
      strokeWidth={2}
      points='7.086 1.174 17.086 11.174 7.086 21.174'
      transform='rotate(-89 12.086 11.174)'
    />
  </Svg>
);
export default UpArrow;
