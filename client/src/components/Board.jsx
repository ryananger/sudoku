import React, {useEffect, useState} from 'react';

import st from 'ryscott-st';
import {helpers} from 'util';

import Tile from './Tile.jsx';

const isMobile = window.innerWidth < 720;

const Board = function() {
  const [board, setBoard] = st.handleBoard = st.newState('board', useState(null));
  const [sums, setSums] = st.newState('sums', useState({}));
  const [size, setSize] = st.newState('size', useState(3));

  const [spoiled, setSpoiled] = useState(getSpoiled(size));
  const [solve, setSolve] = st.newState('solve', useState(false));

  const tileSize = st.tileSize;

  const info = {
    3: 'Each number (1 - 9) is used one time.',
    4: 'Each number is used up to 2 times. Unique solution not guaranteed.',
    5: 'Each number is used up to 3 times. Unique solution not guaranteed.'
  };

  var mountBoard = st.mountBoard = function(n) {
    var sz = n || size;
    var b = [];

    var newSums = {};
    var rows = [];
    var cols = [];
    var str = '';

    for (let i = 0; i < sz; i++) {
      b[i] = [];

      let brick;

      if (sz > 3) {
        brick = helpers.rand(sz);
      }

      for (let j = 0; j < sz; j++) {
        if (!cols[i]) {
          cols[i] = '';
        }

        if (!rows[j]) {
          rows[j] = '';
        }

        if (brick === j) {
          b[i][j] = 'brick';
          continue;
        }

        var num = helpers.rand(9) + 1;

        if (cols[i].includes(num) ||
            rows[j].includes(num) ||
            sz === 3 && str.includes(num) ||
            str.split(num)[sz - 2]) {
          j--;
          continue;
        } else {
          cols[i] += num;
          rows[j] += num;
          str += num;
        }

        if (!newSums['r' + i]) {
          newSums['r' + i] = num;
        } else {
          newSums['r' + i] += num;
        }

        if (!newSums['b' + j]) {
          newSums['b' + j] = num;
        } else {
          newSums['b' + j] += num;
        }

        b[i][j] = num;
      }
    }

    setSums(newSums);
    setSpoiled(getSpoiled(size));

    n && setSize(n);
    setBoard(b);
  };

  var renderBoard = function() {
    var rendered = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let num = board[i][j];
        let coords = {x: j, y: i};
        let spoil = false;

        let chk = spoiled.indexOf((size * i) + j);

        if (chk !== -1) {
          spoil = true;
        }

        rendered.push(<Tile key={i + '.' + j + '.' + num} coords={coords} spoil={spoil}/>);
      }
    }

    return rendered;
  };

  var renderSums = function() {
    var rendered = [];

    for (var key in sums) {
      var pos = key[0];
      var el, style;

      switch (pos) {
        case 'r':
          style = {top: (key[1]) * tileSize + 'px', height: tileSize + 'px'};
          el = (<small key={key} className={pos + 'Sum v'} style={style}>{sums[key]}</small>);
          break;
        case 'b':
          style = {left: (key[1]) * tileSize + 'px', width: tileSize + 'px'};
          el = (<small key={key} className={pos + 'Sum h'} style={style}>{sums[key]}</small>);
          break;
      }

      rendered.push(el);
    }

    return rendered;
  };

  useEffect(mountBoard, []);
  useEffect(()=>{}, [board]);

  return (
    <>
    <small className='gameInfo'>{info[size]}</small>
    <div id='tiles' className='tiles h' style={{width: size * tileSize + 'px'}}>
      {board && renderBoard()}
      {renderSums()}
    </div>
    </>

  );
};

const getSpoiled = function(size) {
  let spoiled = [];

  for (var i = 0; i < size - 1; i++) {
    spoiled.push(helpers.rand(size*size));
  }

  return spoiled;
};

export default Board;

