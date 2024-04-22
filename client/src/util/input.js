import st      from 'ryscott-st';
import ax      from './ax.js';
import helpers from './helpers.js';

var mouse = {
  x: null,
  y: null,
  over: null
};

window.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  var element = document.elementFromPoint(mouse.x, mouse.y);

  if (element) {
    mouse.over = element;
  } else {
    mouse.over = null;
  }
}, {passive: true});

window.addEventListener('keypress', function(e) {
  if (e.target.type === 'number') {return;}

  switch (e.key) {
    case 's':
      st.setSolve(true);
      break;
    case 'n':
      st.mountBoard();
      break;
  }
});

window.addEventListener('keyup', function(e) {
  if (e.target.type === 'number') {return;}

  switch (e.key) {
    case 's':
      st.setSolve(false);
      break;
  }
});

export default mouse;