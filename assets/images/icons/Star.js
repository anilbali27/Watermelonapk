/** @format */

import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Star = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={7.916}
    height={7.577}
    viewBox='0 0 7.916 7.577'
    {...props}>
    <Path
      id='Icon_awesome-star'
      data-name='Icon awesome-star'
      d='M4.975.263,4.009,2.222l-2.162.315a.474.474,0,0,0-.262.808L3.149,4.869l-.37,2.153a.473.473,0,0,0,.687.5L5.4,6.5,7.334,7.521a.474.474,0,0,0,.687-.5L7.65,4.869,9.214,3.345a.474.474,0,0,0-.262-.808L6.79,2.222,5.824.263a.474.474,0,0,0-.849,0Z'
      transform='translate(-1.441 0.001)'
      // fill='#fd0'
      fill={props.color || "#BFBFBF"}
    />
  </Svg>
);
export default Star;
