document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('year').textContent = new Date().getFullYear();
  
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li');
  
  burger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    burger.classList.toggle('toggle');
    navItems.forEach((link, index) => {
      link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    });
  });
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks?.classList.remove('active');
      burger?.classList.remove('toggle');
      navItems.forEach(link => link.style.animation = '');
    });
  });
  
  const fadeElements = document.querySelectorAll('.fade-in');
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  });
  
  fadeElements.forEach(el => appearOnScroll.observe(el));
  
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header?.classList.toggle('scrolled', window.scrollY > 50);
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  const skillBoxes = document.querySelectorAll(".skill-box");
  skillBoxes.forEach(box => {
    box.addEventListener("mouseover", () => {
      box.style.transform = "scale(1.1)";
      box.style.transition = "transform 0.3s ease";
      box.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
    });
    box.addEventListener("mouseout", () => {
      box.style.transform = "scale(1)";
      box.style.boxShadow = "none";
    });
    const skillName = box.querySelector(".skill-name")?.textContent || '';
    const skillLevel = box.querySelector(".skill-level")?.textContent || '';
    box.setAttribute("title", `${skillName} - ${skillLevel}`);
  });
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = document.querySelectorAll('.progress');
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
  
  const contactForm = document.querySelector('.contact-form');
  contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
  
  const downloadBtn = document.getElementById('download-cv');
  downloadBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('CV download would start here. In a real implementation, this would download your CV file.');
  });
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes navLinkFade {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;
  document.head.appendChild(style);
});