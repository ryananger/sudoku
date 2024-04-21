import React, {useState} from 'react';

import st from 'ryscott-st';

import grainPath from './grainPath.js';

const Grain = function() {
  const [slice] = useState(Math.floor(Math.random() * (450 - st.tileSize)));
  const style = {top: -slice + 'px', left: -slice + 'px'};

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className='woodgrain' width={450} height={450} viewBox='0 0 600 600' style={style}>
    {grainPath}
    </svg>
  )
};

export default Grain;