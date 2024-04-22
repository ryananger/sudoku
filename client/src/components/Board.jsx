import React, {useEffect, useState} from 'react';

import st from 'ryscott-st';
import {helpers} from 'util';
import sudoku from './sudoku.js';
import Tile from './Tile.jsx';

const isMobile = window.innerWidth < 720;

const Board = function() {
  const [board, setBoard] = st.handleBoard = st.newState('board', useState(null));
  const [tiles, setTiles] = st.newState('tiles', useState({}));
  const [size, setSize] = st.newState('size', useState(9));
  const [solve, setSolve] = st.newState('solve', useState(false));
  const [options, setOptions] = st.newState('options', useState(null));

  const tileSize = st.tileSize;

  var mountBoard = st.mountBoard = function(n) {
    var sz = n || size;
    var b = [];
    var t = {};

    var sud = sudoku.generate('hard', true);
    var spoiled = sudoku.solve(sud);

    var rows = [];
    var cols = [];

    for (let i = 0; i < sz; i++) {
      b[i] = [];

      for (let j = 0; j < sz; j++) {
        var tile = {
          answer: Number(spoiled[(sz * i) + j]),
          candidates: ''
        };

        b[i][j] = tile;
        t[(i*9)+j] = tile;
      }
    }

    n && setSize(n);
    setBoard(b);
    setTiles(t);
  };

  var renderBoard = function() {
    var rendered = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let num = board[i][j].answer;
        let coords = {x: j, y: i};

        rendered.push(<Tile key={i + '.' + j + '.' + num} id={(i*9)+j} coords={coords}/>);
      }
    }

    return rendered;
  };

  var renderCandidates = function() {
    var rendered = [];
    var cand = tiles[options].candidates.split('');

    for (let i = 1; i <= 9; i++) {
      let on = false;

      if (tiles[options].candidates.includes(i)) {
        on = true;
      }

      var toggle = function(num) {
        var newTiles = {...tiles};
        var tile = {...newTiles[options]};

        if (tile.candidates.includes(num)) {
          tile.candidates = tile.candidates.replace(num, '');
          tile.candidates.split('').sort().join();
        } else {
          tile.candidates += num;
          tile.candidates.split('').sort().join();
        }

        newTiles[options] = tile;

        setTiles(newTiles);
      };

      rendered.push(<div key={'candidate' + i} className={`candidateButton ${on && 'buttonOn'}`} onClick={()=>{toggle(i)}}>{i}</div>)
    }

    return rendered;
  };

  useEffect(mountBoard, []);
  useEffect(()=>{}, [board, tiles]);

  return (
    <>
    <div id='tiles' className='tiles h' style={{width: size * tileSize + 'px'}}>
      {options !== null && <div className='candidateContainer h'>{renderCandidates()}</div>}
      {board && renderBoard()}
    </div>
    </>

  );
};

export default Board;

