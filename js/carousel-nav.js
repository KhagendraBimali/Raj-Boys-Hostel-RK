document.addEventListener('DOMContentLoaded', function() {
  // Initialize Owl Carousels
  function initCarousels() {
    // Initialize main carousel
    if ($('.home-slider').length) {
      $('.home-slider').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 0,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: false,
        dots: false,
        autoplayHoverPause: false,
        items: 1,
        navText: ['<span class="icon-arrow_back"></span>','<span class="icon-arrow_forward"></span>']
      });
    }

    // Initialize rooms carousel
    if ($('.js-carousel-1').length) {
      $('.js-carousel-1').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 }
        }
      });
    }

    // Initialize testimonials carousel
    if ($('.js-carousel-2').length) {
      $('.js-carousel-2').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplayHoverPause: true,
        items: 1
      });
    }
  }

  // Function to update carousel navigation
  function updateCarouselNav() {
    const carousels = document.querySelectorAll('.owl-carousel');
    
    carousels.forEach(carousel => {
      const existingNav = carousel.querySelectorAll('.custom-carousel-nav');
      existingNav.forEach(nav => nav.remove());
      
      const navContainer = document.createElement('div');
      navContainer.className = 'custom-carousel-nav';
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-nav-btn carousel-prev';
      prevBtn.innerHTML = '&larr;';
      prevBtn.setAttribute('aria-label', 'Previous');
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-nav-btn carousel-next';
      nextBtn.innerHTML = '&rarr;';
      nextBtn.setAttribute('aria-label', 'Next');
      
      navContainer.appendChild(prevBtn);
      navContainer.appendChild(nextBtn);
      carousel.appendChild(navContainer);
      
      const $carousel = $(carousel);
      
      prevBtn.addEventListener('click', () => {
        $carousel.trigger('prev.owl.carousel');
      });
      
      nextBtn.addEventListener('click', () => {
        $carousel.trigger('next.owl.carousel');
      });
    });
  }
  
  // Initialize carousels and navigation
  $(document).ready(function() {
    initCarousels();
    
    // Add a small delay to ensure carousels are initialized
    setTimeout(function() {
      updateCarouselNav();
      
      // Re-run when window is resized
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          updateCarouselNav();
        }, 250);
      });
    }, 100);
  });
  
  // Re-run when carousel is initialized or refreshed
  $(document).on('initialized.owl.carousel refreshed.owl.carousel', updateCarouselNav);
});
