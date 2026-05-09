/* Main JS for Eid Website */

/* ====== Mobile Hamburger Navbar ====== */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.navbar__links');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });

    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ====== Scroll-to-top Button ====== */
  const scrollBtn = document.getElementById('scrollTopBtn');
  if(scrollBtn){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 300){
        scrollBtn.style.display = 'block';
      }else{
        scrollBtn.style.display = 'none';
      }
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  /* ====== Countdown Timer ====== */
  const countdown = document.getElementById('countdown');
  if(countdown){
    function updateCountdown() {
      // Eid 2025: June 7, 2025, 0:00
      const eidDate = new Date("2025-06-07T00:00:00");
      const now = new Date();
      let diff = eidDate.getTime() - now.getTime();

      if (diff > 0) {
        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let m = Math.floor((diff / (1000 * 60)) % 60);
        let s = Math.floor((diff / 1000) % 60);

        document.getElementById('cdays').textContent = d;
        document.getElementById('chours').textContent = h;
        document.getElementById('cminutes').textContent = m;
        document.getElementById('cseconds').textContent = s;
      } else {
        countdown.innerHTML = "<strong>Eid Mubarak!</strong>";
      }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ====== Hero Starfield Animation ====== */
  const starsCanvas = document.getElementById('stars');
  if(starsCanvas){
    function resizeStars(){
      starsCanvas.width = starsCanvas.offsetWidth;
      starsCanvas.height = starsCanvas.offsetHeight;
    }
    resizeStars();
    window.addEventListener('resize',resizeStars);

    let ctx = starsCanvas.getContext('2d');
    let w = starsCanvas.width, h = starsCanvas.height;
    let stars = Array.from({length: 62}, () =>
      ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.7 + Math.random() * 1.2,
        o: 0.6 + Math.random()*0.4,
        d: 0.02 + Math.random()*0.018,
        t: Math.random()*12.3
      })
    );
    function animateStars(){
      w = starsCanvas.width;
      h = starsCanvas.height;
      ctx.clearRect(0,0,w,h);
      for(let s of stars){
        ctx.save();
        ctx.globalAlpha = s.o * (0.6 + 0.4*Math.abs(Math.sin(s.t)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = "#fffbe7";
        ctx.shadowColor = "#fffbe7";
        ctx.shadowBlur = s.r*7;
        ctx.fill();
        ctx.restore();
        s.t += s.d;
        if(Math.random() < 0.006) {
          s.r = 0.7 + Math.random()*1.2; //twinkle pulse
        }
      }
      requestAnimationFrame(animateStars);
    }
    animateStars();
  }

  /* ====== Greeting Generator ====== */
  const greetingForm = document.getElementById('greetingForm');
  if(greetingForm){
    greetingForm.onsubmit = function(e){
      e.preventDefault();
      const style = this.style.value;
      const name = this.name.value.trim() || "أنت";
      let arabic, english;

      if(style === 'warm'){
        arabic = `عيد أضحى مبارك ${name}!\nتقبل الله طاعتكم وغفر ذنبكم واجزل لكم العطاء.`;
        english = `Happy Eid al-Adha, ${name}!\nMay Allah accept your devotion, forgive your sins, and grant you countless blessings.`;
      }else if(style === 'formal'){
        arabic = `تقبل الله منا ومنكم صالح الأعمال وأعاد الله عليكم العيد بالخير والبركة يا ${name}`;
        english = `May Allah accept your good deeds and return this Eid to you with goodness and blessings, ${name}.`;
      }else{
        arabic = `عيدكم مبارك ${name}!`;
        english = `Eid Mubarak, ${name}!`;
      }

      document.getElementById('greetingArabic').textContent = arabic;
      document.getElementById('greetingEnglish').textContent = english;
      document.getElementById('greetingResult').style.display = "flex";
      setTimeout(()=> {
        document.getElementById('greetingResult').scrollIntoView({behavior:'smooth', block:'center'});
      }, 150);
    };

    // Copy Button logic
    const copyBtn = document.getElementById('copyGreeting');
    if(copyBtn){
      copyBtn.addEventListener('click', function(){
        const arabic = document.getElementById('greetingArabic').textContent;
        const english = document.getElementById('greetingEnglish').textContent;
        let txt = `${arabic}\n\n${english}\nعيد الأضحى مبارك!`;
        navigator.clipboard.writeText(txt);
        copyBtn.textContent = "Copied!";
        setTimeout(()=>copyBtn.textContent="Copy Message", 1600);
      });
    }    
  }

  /* ===== Scroll Reveal Animation ===== */
  function revealSections(){
    let reveals = document.querySelectorAll('.reveal');
    for(let el of reveals){
      let windowHeight = window.innerHeight;
      let top = el.getBoundingClientRect().top;
      if(top < windowHeight-90){
        el.classList.add('visible');
      }
    }
  }
  window.addEventListener('scroll',revealSections); revealSections();
});