// Fondo animado con canvas para Project List
function fondoAnimado() {
  var canvas = document.createElement('canvas');
  canvas.id = 'fondo-animado';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);
  var ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  // Círculos animados
  var circles = [];
  for (var i = 0; i < 30; i++) {
    circles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 18 + Math.random() * 32,
      dx: -0.5 + Math.random(),
      dy: -0.5 + Math.random(),
      color: 'rgba(157,170,242,' + (0.08 + Math.random() * 0.12) + ')'
    });
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function(c) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.x += c.dx;
      c.y += c.dy;
      if (c.x < -c.r) c.x = canvas.width + c.r;
      if (c.x > canvas.width + c.r) c.x = -c.r;
      if (c.y < -c.r) c.y = canvas.height + c.r;
      if (c.y > canvas.height + c.r) c.y = -c.r;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

document.addEventListener('DOMContentLoaded', fondoAnimado);