document.addEventListener('DOMContentLoaded', () => {
  // === Common Elements ===
  const footer = document.getElementById('footer');
  const details = document.querySelectorAll('details');
  const eventType = document.getElementById('eventType');
  const otherEvent = document.getElementById('otherEvent');
  const slides = document.querySelectorAll('.carousel-slide');
  const track = document.getElementById('carouselTrack');
  const header = document.getElementById('header');
  
  const links = document.getElementById('links');
  const openNavBtn = document.getElementById('openNav');
  const phoneInput = document.getElementById('phone');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  
  const backToTopBtn = document.getElementById('backToTop');
  let stayOpen = false;
  let lastScroll = window.scrollY;
  const main = document.querySelector('main');
  let keepHeader = false;

  
  // === Secure external links in .address ===
  document.querySelectorAll('.address a').forEach(link => {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // === Label placeholders (remove colon) ===
  const inputs = document.querySelectorAll('input');
  const labels = document.querySelectorAll('label');
  labels.forEach((label, index) => {
    const placeholderText = label.textContent.replace(/:/g, "");
    if (inputs[index]) inputs[index].placeholder = placeholderText;
  });

  // === Auto-pair characters in textarea (excluding quotes for safety) ===
  const textareas = document.querySelectorAll("textarea");
  const pairs = { "(": ")", "[": "]", "{": "}", "<": ">" };

  textareas.forEach(textarea => {
    textarea.addEventListener("keydown", e => {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const char = e.key;

      if (pairs[char]) {
        e.preventDefault();
        const closing = pairs[char];

        if (start !== end) {
          // Wrap selected text
          const selected = val.slice(start, end);
          textarea.value = val.slice(0, start) + char + selected + closing + val.slice(end);
          textarea.setSelectionRange(start + 1, end + 1);
        } else {
          // Prevent double insert if already followed by closer
          if (val[end] === closing) {
            textarea.setSelectionRange(start + 1, start + 1);
            return;
          }
          // Insert pair
          textarea.value = val.slice(0, start) + char + closing + val.slice(end);
          textarea.setSelectionRange(start + 1, start + 1);
        }
      } else if (Object.values(pairs).includes(char)) {
        // Skip over existing closer instead of duplicating it
        if (val[end] === char) {
          e.preventDefault();
          textarea.setSelectionRange(end + 1, end + 1);
        }
      }
    });
  });
  
  // === Header Nav Toggle ===
  function showNav() {
    if (!links || !openNavBtn) return;
    links.style.transform = 'translateX(0)';
    openNavBtn.onclick = closeNav;
    openNavBtn.textContent = 'Close';
    header.style.position = 'absolute';
  }
  function closeNav() {
    if (!links || !openNavBtn) return;
    links.style.transform = 'translateX(-100%)';
    openNavBtn.onclick = showNav;
    openNavBtn.textContent = 'Menu';
    header.style.position = 'fixed';
    keepHeaderVisible();
  }
  if (openNavBtn) openNavBtn.onclick = showNav;
function keepHeaderVisible(){
  header.style.position = 'fixed';
  keepHeader = true;
  header.style.transform = 'translateY(0)';
}
  // === Details Animations ===
  details.forEach(detail => {
    const summary = detail.querySelector('summary');
    const content = detail.querySelector('.content');
    if (!summary || !content) return;

    summary.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = detail.hasAttribute('open');

      if (isOpen) {
        const currentHeight = content.scrollHeight;
        content.style.height = currentHeight + 'px';
        content.style.transition = 'none';
        requestAnimationFrame(() => {
          content.style.transition = 'height 0.4s ease, opacity 0.4s ease, padding 0.4s ease';
          content.style.height = '0px';
          content.style.opacity = '0';
          content.style.paddingTop = '0px';
          content.style.paddingBottom = '0px';
        });
        content.addEventListener('transitionend', function cleanup() {
          detail.removeAttribute('open');
          content.style.height = '';
          content.style.transition = '';
          content.style.opacity = '';
          content.style.paddingTop = '';
          content.style.paddingBottom = '';
          content.removeEventListener('transitionend', cleanup);
        }, { once: true });
      } else {
        detail.setAttribute('open', '');
        const targetHeight = content.scrollHeight;
        content.style.height = '0px';
        content.style.opacity = '0';
        content.style.paddingTop = '0px';
        content.style.paddingBottom = '0px';
        content.style.transition = 'none';
        requestAnimationFrame(() => {
          content.style.transition = 'height 0.4s ease, opacity 0.4s ease, padding 0.4s ease';
          content.style.height = targetHeight + 'px';
          content.style.opacity = '1';
          content.style.paddingTop = '15px';
          content.style.paddingBottom = '15px';
        });
        content.addEventListener('transitionend', function cleanup() {
          content.style.height = '';
          content.style.transition = '';
          content.style.opacity = '';
          content.style.paddingTop = '';
          content.style.paddingBottom = '';
          content.removeEventListener('transitionend', cleanup);
        }, { once: true });
      }
    });
  });

  // === Footer ===
  if (footer) {
    footer.innerHTML = `
<div class="footer-content">
  <div class="footer-section">
      <h3>Contact Information</h3>
      <p><strong><i class="fa fa-map-pin" aria-hidden="true"></i>
              Address:</strong><br>
          <a href="https://www.google.com/maps/place//@40.242637,-76.2156168,17z">
              415 E Mount Airy Road<br>Stevens, PA 17578
          </a>
      </p>
      <p><strong><i class="fa fa-phone" aria-hidden="true"></i>
              Phone:</strong> <a href="tel:7173363730">(717) 336-3730</a></p>
      <p><strong><i class="fa fa-fax" aria-hidden="true"></i>
              Fax:</strong> <a href="tel:7173365189">(717) 336-5189</a></p>
  </div>

  <div class="footer-section">
      <h3>Our Services</h3>
      <ul>
          <li><a href="hot-buffet">Hot Buffet Catering</a></li>
          <li><a href="hor-doeuvres">Hors d'oeuvres</a></li>
          <li><a href="custom-menu">Custom Menus</a></li>
          <li><a href="events">Event Planning</a></li>
      </ul>
  </div>

  <div class="footer-section">
      <h3>About Us</h3>
      <p>Established in 2002, we've been serving Lancaster County with authentic BBQ and exceptional catering
          services for over 20 years.</p>
      <div class="certifications">
          <span class="cert-badge">Licensed & Certified</span>
          <span class="cert-badge">Chamber Member</span>
      </div>
  </div>
</div>

<div class="footer-bottom">
  <p class="stuff">Established in 2002</p>
  <pre class="dot">&#8226;</pre>
  <p class="stuff">
    <a href="https://www.google.com/search?q=Chamber+of+Commerce+R1116275">
      Chamber of Commerce R1116275
    </a>
  </p>
  <pre class="dot">&#8226;</pre>
  <p class="stuff">Fully Licensed and Food Certified</p>
  <pre class="dot">&#8226;</pre>
  <p class="stuff">&copy; 2025 Big John Nolt's BBQ and Catering</p>
  <pre class="dot">&#8226;</pre>
  <p class="stuff">All Rights Reserved</p>
  <pre class="dot">&#8226;</pre>
  <p class="stuff">Website by Isaac Boyd</p>
</div>

    `;
  }

  // === Event Type Selector ===
  if (eventType && otherEvent) {
    eventType.addEventListener("change", () => {
      otherEvent.style.display = (eventType.value === "other") ? "block" : "none";
    });
  }

  // === Multi-step Form ===
  window.nextSection = function(section) {
    const progress = document.getElementById('progress');
    progress.style.display = 'none';
    const currentSection = document.querySelector('.form-section.active');
    const nextSection = document.getElementById(`section${section}`);
    const progressSteps = document.querySelectorAll('.progress-step');
    if (currentSection) currentSection.classList.remove('active');
    if (nextSection) nextSection.classList.add('active');
    progressSteps.forEach((step, index) => {
      if (index < section) {
        step.classList.add('active');
        progress.value += 33.33333333333333;
      }else {
        step.classList.remove('active');
        progress.value -= 33.33333333333333;
      }
      
    });
  };

  // === Hero Image Parallax ===
  function heroImageMove() {
    const image = document.querySelector('.bg-image');
    if (!image) return;
    const y = window.scrollY;
    image.style.transform = `translateY(${y / 3}px)`;
  }

  // === Back to Top Button ===
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
      backToTopBtn.style.backgroundColor = window.scrollY > 510 ? 'rgb(78, 205, 196)' : 'transparent';
      backToTopBtn.style.color = window.scrollY > 510 ? 'black' : 'transparent';
      backToTopBtn.innerHTML = `<i class="fa-solid fa-arrow-up" style="color: #000000;"></i>`;
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Carousel ===
  let index = 0;
  const slideCount = slides.length;
  let autoSlide = null;
  if (slideCount > 0) slides[0].classList.add('active');

  function showSlide(i) {
    if (slideCount === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    index = (i + slideCount) % slideCount;
    slides[index].classList.add('active');
    if (track) {
      track.style.transition = 'transform 0.7s ease';
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  function startAutoSlide() { if(slideCount > 1) autoSlide = setInterval(() => showSlide(index + 1), 4000); }
  function stopAutoSlide() { if (autoSlide) clearInterval(autoSlide); }

  if (slideCount > 1) startAutoSlide();
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); showSlide(index - 1); startAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); showSlide(index + 1); startAutoSlide(); });

  // Swipe support
  if (track) {
    let startX = 0, currentX = 0, isDragging = false;
    track.addEventListener('touchstart', (e) => {
      stopAutoSlide();
      startX = e.touches[0].clientX;
      currentX = startX;
      isDragging = true;
      track.style.transition = 'none';
    });
    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      track.style.transform = `translateX(${-index * 100 + (deltaX / track.offsetWidth) * 100}%)`;
    });
    track.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      const diff = currentX - startX;
      const threshold = track.offsetWidth / 4;
      track.style.transition = 'transform 0.7s ease';
      if (Math.abs(diff) > threshold) showSlide(index + (diff < 0 ? 1 : -1));
      else showSlide(index);
      startAutoSlide();
    });
  }

  // === Phone Number Formatter ===
  if (phoneInput) {
    phoneInput.addEventListener('input', e => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 3 && value.length <= 6) value = value.replace(/(\d{3})(\d+)/, '($1) $2');
      else if (value.length > 6) value = value.replace(/(\d{3})(\d{3})(\d+)/, '($1) $2-$3');
      e.target.value = value;
    });
  }

  // === Scroll Behavior ===
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (header) {
      if (currentScroll > lastScroll && currentScroll > 150 && !stayOpen) {
        header.style.transform = 'translateY(-100%)';
        header.style.backgroundColor = 'transparent';
        header.style.position = 'fixed';
      } else if (currentScroll < lastScroll) {
        header.style.transform = 'translateY(0)';
        header.style.position = 'fixed';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      }
    }
    heroImageMove();
    lastScroll = currentScroll;
  });

  console.log(window.innerWidth <= 1200 ? "Mobile script running" : "Desktop script running");
});
