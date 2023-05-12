/** @format */

import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CrossMark = (props) => (
  <Svg
    width='24px'
    height='30px'
    viewBox='0 0 24 24'
    fill='#FFFFFF'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Path
      d='M19 5L5 19M5.00001 5L19 19'
      stroke='#FFFFFF'
      strokeWidth={3}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);
export default CrossMark;
