document.addEventListener('DOMContentLoaded', function() {
  // Select all links with hashes
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Skip if it's a modal trigger or doesn't have a hash
      if (this.getAttribute('data-toggle') === 'modal' || 
          this.getAttribute('data-target') === '#reservation-form' ||
          this.getAttribute('href') === '#') {
        return;
      }

      // Prevent default anchor click behavior
      e.preventDefault();

      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }

      // Get the target element
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Calculate the target position with offset for fixed navbar
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      // Instant scroll to target
      window.scrollTo(0, targetPosition);

      // Update URL without adding to history
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        window.location.hash = targetId;
      }
    });
  });

  // Handle back/forward navigation
  window.addEventListener('popstate', function() {
    const targetId = window.location.hash;
    if (!targetId) return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    // Instant scroll for back/forward navigation
    window.scrollTo(0, targetPosition);
  });

  // Handle initial page load with hash
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo(0, targetPosition);
    }
  }
});
