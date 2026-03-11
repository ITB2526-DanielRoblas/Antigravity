// Muestra un mensaje de saludo épico al cargar la página
function saludar() {
  var mensaje = '¡Bienvenido a mi portafolio!';
  var div = document.createElement('div');
  div.textContent = mensaje;
  div.style.position = 'fixed';
  div.style.top = '0';
  div.style.left = '0';
  div.style.width = '100%';
  div.style.background = 'linear-gradient(90deg, #9daaf2 0%, #1a2238 100%)';
  div.style.color = '#fff';
  div.style.padding = '22px 0';
  div.style.fontSize = '1.5em';
  div.style.fontWeight = 'bold';
  div.style.textAlign = 'center';
  div.style.zIndex = '9999';
  div.style.boxShadow = '0 4px 24px rgba(26,34,56,0.18)';
  div.style.opacity = '0.97';
  div.style.letterSpacing = '2px';
  div.style.animation = 'slideDown 1s';
  document.body.appendChild(div);
  setTimeout(function() {
    div.style.transition = 'opacity 0.8s';
    div.style.opacity = '0';
    setTimeout(function() {
      document.body.removeChild(div);
    }, 800);
  }, 3200);
}

// Fondo animado con canvas para la página principal
function fondoAnimado() {
  if (document.getElementById('fondo-animado')) return;
  var canvas = document.createElement('canvas');
  canvas.id = 'fondo-animado';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.insertBefore(canvas, document.body.firstChild);
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

// Animaciones CSS para los banners
var style = document.createElement('style');
style.innerHTML = `
@keyframes slideDown {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
}`;
document.head.appendChild(style);

// Ejecutar el saludo, la animación de artículos y el fondo animado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  saludar();
  animarArticulosScroll();
  fondoAnimado(); // Prioriza el fondo animado en la principal
});
