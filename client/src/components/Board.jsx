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

  var mountBoard = st.mountBoard = function(n) {
    var sz = n || size;
    var b = [];

    var newSums = {};

    for (let i = 0; i < sz; i++) {
      b[i] = [];

      for (let j = 0; j < sz; j++) {
        var num = helpers.rand(9) + 1;

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

        if (spoiled.indexOf((size * i) + j) !== -1) {
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
    <div id='tiles' className='tiles h' style={{width: size * tileSize + 'px'}}>
      {board && renderBoard()}
      {renderSums()}
    </div>
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

