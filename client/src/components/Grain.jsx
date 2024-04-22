import React, {useState} from 'react';

import st from 'ryscott-st';

import grainPath from './grainPath.js';

const Grain = function() {
  const [slice] = useState(Math.floor(Math.random() * (450 - st.tileSize)));

  const viewBox = `${slice} ${slice} ${st.tileSize * 600/450} ${st.tileSize * 600/450}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className='woodgrain' width={st.tileSize} height={st.tileSize} viewBox={viewBox}>
      {grainPath}
    </svg>
  )
};

export default Grain;