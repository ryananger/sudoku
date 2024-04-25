import React, {useEffect, useState} from 'react';

import st from 'ryscott-st';

import Grain from './Grain.jsx';

const Tile = function({id, coords}) {
  const [board, setBoard] = st.handleBoard;
  const [{x, y}, setPos] = useState(coords);
  const [num, setNum] = useState(board[y]?.[x].answer);
  const [val, setVal] = useState('');
  const [spoil] = useState(Math.random() < 0.4);

  const candidates = st.tiles[id].candidates;

  const tileSize = st.tileSize;
  const gapX = Math.floor(x/3);
  const gapY = Math.floor(y/3);
  const style = {top: ((gapY * 8) + (y * tileSize)) + 'px', left: (-8 + (gapX * 8) + (x * tileSize)) + 'px'};

  var handleChange = function(e) {
    if (Number(e.target.value)) {
      setVal(e.target.value.slice(e.target.value.length - 1));
    }

    if (e.key === 'Backspace') {
      setVal('');
    }
  }

  useEffect(()=>{
    setPos(coords);
    setNum(board[coords.y][coords.x].answer);
  }, [coords]);

  return (
    <div className='tileContainer v' style={{...style, width: tileSize + 'px'}}>
      <div className={`tile v ${spoil && 'spoil'}`} style={!spoil && st.solve ? {color: 'var(--solveText)'} : {}} onClick={()=>{st.setOptions(id)}}>
        <Grain/>
        {!st.solve && !spoil && !val && <div className='candidates h'>{candidates}</div>}
        {(spoil || st.solve) && num}
        {(!spoil && !st.solve) && <input type='number' value={val} onChange={handleChange} onKeyUp={handleChange}/>}
      </div>
    </div>
  );
};

export default Tile;

