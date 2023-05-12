/** @format */

import * as React from "react";
import Svg, { Path, G, Polygon } from "react-native-svg";
const ArrowRight = (props) => (
  <Svg
    width='16px'
    height='16px'
    viewBox='0 0 48 48'
    fill='white'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Path d='M0 0h48v48H0z' fill='none' />
    <G id='Shopicon'>
      <Polygon points='8,26 33.172,26 19.172,40 22,42.828 40.828,24 22,5.172 19.172,8 33.172,22 8,22  ' />
    </G>
  </Svg>
);
export default ArrowRight;
