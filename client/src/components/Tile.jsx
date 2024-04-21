import React, {useEffect, useState} from 'react';

import st from 'ryscott-st';

import Grain from './Grain.jsx';

const Tile = function({spoil, coords}) {
  const [board, setBoard] = st.handleBoard;
  const [{x, y}, setPos] = useState(coords);
  const [num, setNum] = useState(board[y]?.[x]);

  const tileSize = st.tileSize;
  const style = {top: y * tileSize + 'px', left: x * tileSize + 'px'};

  useEffect(()=>{
    setPos(coords);
    setNum(board[coords.y][coords.x]);
  }, [coords]);

  if (num === -1) {return};

  return (
    <div className='tileContainer v' style={{...style, width: tileSize + 'px'}}>
      <div className='tile v' style={st.solve ? {color: 'var(--solveText)'} : {}}>
        <Grain/>
        {(spoil || st.solve) && num}
        {(!spoil && !st.solve) && <input type='number'/>}
      </div>
    </div>
  );
};

export default Tile;

