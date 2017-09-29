q = (c,s) => {
  let cnt = 0;
  let acc = s;
  for (let i = 1; i <= maxIter; i++) {
    acc = acc.pow(2).add(c);
    if (acc.abs() > 2) break;
    cnt++;
  }
  return cnt/maxIter;
};
color = (c, s) => "rgb(" + (Math.floor(255 * q(c,s))) + ", 120, 120)";
pixel = (x,y,w,h,t) => color(new Complex(4*x/w - 2.5, 2*y/h - 1), new Complex(0.1*(t/1), 0));

// ---------

const pxSize = Math.min(window.innerWidth, window.innerHeight)/width;
document.styleSheets[0].insertRule(".pixel { width: "+(pxSize+epsilon)+"px; height: "+(pxSize+epsilon)+"px; }");

let cvs = document.querySelector('#canvas');
cvs.style.width  = (width*pxSize-2)  + "px";
cvs.style.height = (height*pxSize-2) + "px";


addPixel = (x,y) => {
  let el = document.createElement('div');
  el.classList.add("pixel");
  // el.style.backgroundColor = pixel(x,y,width,height,0);
  el.style.left = x*pxSize + "px";
  el.style.top  = y*pxSize + "px";
  cvs.appendChild(el);
}

render = t => {
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < height; x++) {
      let el = cvs.children[y*width + x];
      let c  = pixel(x,y,width,height,t);
      el.style.backgroundColor = c;
    }
  }
};

// ---------

if (animateIntro) {
  let ix   = 0;
  let intv = setInterval(() => {
    for (let i = 0; i < introSpeed; i++) {
      addPixel(ix % width, Math.floor(ix/width));
      if (++ix >= width * height)
        return clearInterval(intv);
    }
  }, 0);
} else {
  for (let y = 0; y < width; y++)
    for (let x = 0; x < height; x++)
      addPixel(x, y);
}

if (animate) {
  let time = 0;
  let dir  = true;
  let intv = setInterval(() => {
    time = dir? time+animeStep : time-animeStep;
    render(time);
    if (dir? time > 22 : time < 0) {
      if (!loopAnime) return clearInterval(intv);
      dir = !dir;
    }
  }, 0);
} else {
  render(0);
}
