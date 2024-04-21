import React, {useEffect, useState} from 'react';

import st from 'ryscott-st';

import Grain from './Grain.jsx';

const Tile = function({spoil, coords}) {
  const [board, setBoard] = st.handleBoard;
  const [{x, y}, setPos] = useState(coords);
  const [num, setNum] = useState(board[y]?.[x]);
  const [val, setVal] = useState('');

  const tileSize = st.tileSize;
  const style = {top: y * tileSize + 'px', left: x * tileSize + 'px'};

  var handleChange = function(e) {
    if (Number(e.target.value)) {
      setVal(e.target.value.slice(e.target.value.length - 1));
    }

    if (e.key === 'Backspace') {
      setVal('');
    }
  };

  var handleTile = function() {
    if (num === 'brick') {
      return <div className='tile brick'><Grain/></div>;
    } else {
      return (
        <div className='tile v' style={!spoil && st.solve ? {color: 'var(--solveText)'} : {}}>
          <Grain/>
          {(spoil || st.solve) && num}
          {(!spoil && !st.solve) && <input type='number' value={val} onChange={handleChange} onKeyUp={handleChange}/>}
        </div>
      )
    }
  };

  useEffect(()=>{
    setPos(coords);
    setNum(board[coords.y][coords.x]);
  }, [coords]);

  if (num === -1) {return};

  return (
    <div className='tileContainer v' style={{...style, width: tileSize + 'px'}}>
      {handleTile()}
    </div>
  );
};

export default Tile;

