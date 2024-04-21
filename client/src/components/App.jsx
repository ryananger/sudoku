import React, {useEffect, useState} from 'react';

import '../styles/style.css';
import st from 'ryscott-st';
import {mouse} from 'util';

import Board from './Board.jsx';

const isMobile = window.innerWidth < 720;
const tileSize = st.tileSize = isMobile ? Math.floor(window.innerWidth/6.5) : 80;

const App = function() {
  var renderHead = function() {
    return (
      <>
      {!isMobile && <small>press N for a new puzzle, 3, 4, or 5 to set the size, and S to see the solution.</small>}
      {isMobile &&
        <small className='buttons h'>
          <div className='button v' onClick={()=>{st.mountBoard(st.size)}}>new</div>
          <div className='button v' onClick={()=>{st.setSolve(!st.solve)}}>solution</div>
          <div className='h'>
            <div className='button v' onClick={()=>{st.mountBoard(3)}}>3</div>
            <div className='button v' onClick={()=>{st.mountBoard(4)}}>4</div>
            <div className='button v' onClick={()=>{st.mountBoard(5)}}>5</div>
          </div>
        </small>
      }
      </>
    )
  };

  return (
    <div id='app' className='app v'>
      {renderHead()}
      <br/>
      <Board/>
      <br/>
      <small><a href='https://ryscott.xyz/15puzzl'>15puzzl</a> | created by <a href='https://ryscott.xyz/portfolio'>_________</a></small>
    </div>
  );
};

export default App;

