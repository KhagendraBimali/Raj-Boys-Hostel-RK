(function($) {
  'use strict';

  // Mobile menu toggle
  $('.site-menu-toggle').click(function(){
    var $this = $(this);
    if ($('body').hasClass('menu-open')) {
      $this.removeClass('open');
      $('.js-site-navbar').fadeOut(400);
      $('body').removeClass('menu-open');
    } else {
      $this.addClass('open');
      $('.js-site-navbar').fadeIn(400);
      $('body').addClass('menu-open');
    }
  });

  // Dropdown menu
  $('nav .dropdown').hover(function(){
    var $this = $(this);
    $this.addClass('show');
    $this.find('> a').attr('aria-expanded', true);
    $this.find('.dropdown-menu').addClass('show');
  }, function(){
    var $this = $(this);
    $this.removeClass('show');
    $this.find('> a').attr('aria-expanded', false);
    $this.find('.dropdown-menu').removeClass('show');
  });

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      disable: 'mobile'
    });
  }

  // Initialize Owl Carousels if they exist
  if ($.fn.owlCarousel) {
    // Home slider
    if ($('.home-slider').length) {
      $('.home-slider').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: true,
        autoplayHoverPause: true,
        items: 1,
        autoHeight: true,
        navText: ["<span class='ion-chevron-left'></span>", "<span class='ion-chevron-right'></span>"],
        responsive: {
          0: { items: 1, nav: false },
          600: { items: 1, nav: false },
          1000: { items: 1, nav: true }
        }
      });
    }

    // Testimonial carousel
    if ($('.js-carousel-2').length) {
      $('.js-carousel-2').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        margin: 30,
        nav: true,
        dots: false,
        autoHeight: false,
        items: 3,
        navText: ['<span class="sr-only">Previous</span>', '<span class="sr-only">Next</span>'],
        responsive: {
          0: { items: 1, nav: false, dots: true },
          768: { items: 2, nav: true, dots: false },
          992: { items: 3, nav: true, dots: false }
        }
      });
    }
  }

  // Smooth scrolling
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    if ($target.length) {
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 800, 'swing');
    }
  });

  // Stellar.js for parallax
  if ($.fn.stellar) {
    $(window).stellar({
      responsive: false,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: 'scroll'
    });
  }

  // Window scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.js-site-header').addClass('scrolled');
    } else {
      $('.js-site-header').removeClass('scrolled');
    }
  });

  // Form submission
  $('#reservationForm').on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    var $submitBtn = $form.find('button[type="submit"]');
    var $spinner = $form.find('.spinner-border');
    var $message = $('#formMessage');
    
    // Show loading state
    $submitBtn.prop('disabled', true);
    $spinner.removeClass('d-none');
    $message.removeClass('alert-danger alert-success').text('Submitting...');
    
    // Simulate form submission (replace with actual AJAX call)
    setTimeout(function() {
      $spinner.addClass('d-none');
      $message.addClass('alert alert-success').text('Thank you! Your reservation has been received.');
      $form[0].reset();
      $submitBtn.prop('disabled', false);
    }, 1500);
  });

})(jQuery);
