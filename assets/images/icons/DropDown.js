/** @format */

import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DropDown = (props) => (
  <Svg
    width='20px'
    height='20px'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Path
      fill='#617191'
      d='M10.1025513,12.7783485 L16.8106554,6.0794438 C17.0871744,5.80330401 17.5303978,5.80851813 17.8006227,6.09108986 C18.0708475,6.37366159 18.0657451,6.82658676 17.7892261,7.10272655 L10.5858152,14.2962587 C10.3114043,14.5702933 9.87226896,14.5675493 9.60115804,14.2901058 L2.2046872,6.72087106 C1.93149355,6.44129625 1.93181183,5.98834118 2.20539811,5.7091676 C2.47898439,5.42999401 2.92223711,5.43031926 3.19543076,5.70989407 L10.1025513,12.7783485 Z'
    />
  </Svg>
);
export default DropDown;
