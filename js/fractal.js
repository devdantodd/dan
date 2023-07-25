(function() {
    'use strict';
  
    var c = document.getElementById('c');
    var ctx = c.getContext('2d');
    var W = window.innerWidth;
    var H = window.innerHeight; 
    var CX = W / 2;
    var CY = H / 2 + 60;
    var angle = -Math.PI / 2;
    var RANGE = W * .7;
    var points = [];
    var point = null;
    var speed = 50;
    var rotationAmp = 0.5;
    var eraser = 0.03;
    var eraserSize = H / 25;
    var eraserOffset = [-W/2, H/6];
    var ringSize = 150;
    var count = 0;
    var clearpoint = 2000;
  
    var temp = null;
    var oldPoint = null;
    var hue = Math.random() * 360; 
  
    var playing = true;
  
    function init() {
      window.addEventListener('resize', reset);
  
      reset();
      requestAnimationFrame(loop);
  
      c.addEventListener('click', click);
      c.addEventListener('mousemove', mouseMove);
    }
  
    function reset() {
      W = window.innerWidth;
      H = window.innerHeight; 
      RANGE = W * .7;
      points = [];
  
      eraserSize = H / 200;
      eraserOffset = [-W/2, H/6];
  
      temp = null;
      oldPoint = null;
      count = 0;
  
      c.width = W;
      c.height = H;
  
      for(var i = 0; i < 3; i++) {
        var x = CX + Math.cos(angle) * RANGE;
        var y = CY + Math.sin(angle) * RANGE;
  
        points.push({ x: x, y: y });
        angle += Math.PI * 2 / 3;
      }
  
      point = points[Math.floor(Math.random() * points.length)];
    }
  
    function click(e)
    {
      playing = !playing;
  
      if (playing) {
        requestAnimationFrame(loop);
      }
    }
  
    function mouseMove(e)
    {
      var delta = e.pageY / window.innerHeight;
  
      rotationAmp = 0.2 + (delta / 3);
    }
  
    function loop()
    {
      ctx.globalCompositeOperation = 'source-over';		
  
      ctx.fillStyle = 'rgba(0, 0, 0, ' + eraser + ')';
  
      ctx.fillRect(eraserOffset[0], eraserOffset[1] - (eraserSize*ringSize), W*2, eraserSize*135);
      ctx.fillRect(-eraserOffset[0], eraserOffset[1] - (eraserSize*ringSize), W*2, eraserSize*135);
  
      ctx.fillStyle = 'rgba(0, 0, 0, ' + (eraser * 6) + ')';
  
      ctx.fillRect(eraserOffset[0], eraserOffset[1], W, eraserSize);
      ctx.fillRect(-eraserOffset[0], eraserOffset[1], W, eraserSize);
  
      ctx.translate(W/2, H/2);
      ctx.rotate(rotationAmp);
      ctx.moveTo(W/2, H/2);
      ctx.translate(-W/2, -H/2);
  
      if (count%clearpoint < 15) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(-W*2, -H*2, W * 20, H * 20);
      }
  
      ctx.globalCompositeOperation = 'lighter';		
  
      for (var i = 0; i < speed; i++) {
        hue += 0.01;
        temp = points[Math.floor(Math.random() * points.length)];						
  
        ctx.strokeStyle = 'hsla(' + hue + ', 100%, 50%, ' + 0.08 + ')';			
        ctx.fillStyle = 'hsla(' + hue + ', 100%, 50%, ' + 0.9 + ')';
  
        ctx.beginPath();
        ctx.arc(point.x, point.y, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
  
        oldPoint = point;
        point = {
          x: (point.x + temp.x) / 2,
          y: (point.y + temp.y) / 2,
        };			
  
        ctx.beginPath();
        ctx.moveTo(oldPoint.x, oldPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
  
      count++;
  
      if (playing) {
        requestAnimationFrame(loop);
      }
    }
  
    init();
  })();