// Simple reveal-on-scroll using IntersectionObserver
document.addEventListener('DOMContentLoaded', function(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
});

// Mouse-based parallax / 3D subtle tilt
(function(){
  const scene = document.querySelector('.scene');
  if(!scene) return;
  const cards = Array.from(document.querySelectorAll('.card[data-depth]'));

  function onMove(e){
    const rect = scene.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    const rotY = dx * 8; // deg
    const rotX = -dy * 8;
    scene.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    cards.forEach(c => {
      const depth = Number(c.dataset.depth) || 20;
      const tz = depth * (1 - Math.hypot(dx,dy));
      const tx = dx * depth * -6;
      const ty = dy * depth * -6;
      const rY = rotY * (depth/40);
      c.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${rY}deg)`;
      c.style.boxShadow = `${-dx*12}px ${Math.abs(dy)*12}px ${20 + depth/2}px rgba(15,23,36,0.12)`;
    });
  }

  function reset(){
    scene.style.transform = '';
    cards.forEach(c=>{c.style.transform='';c.style.boxShadow='';});
  }

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseleave', reset);
  window.addEventListener('blur', reset);
})();
