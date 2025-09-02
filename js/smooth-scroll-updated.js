document.addEventListener('DOMContentLoaded', function() {
  // Handle navigation for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only process internal anchor links
      if (href.startsWith('#section-')) {
        e.preventDefault();
        const targetId = href.substring(1); // Remove the '#'
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Get the current page path without hash
          const currentPath = window.location.pathname;
          
          // If we're on the homepage, just scroll to the section
          if (currentPath === '/' || currentPath.endsWith('index.html')) {
            instantScrollTo(targetElement);
          } else {
            // If we're on another page, redirect to the homepage with the hash
            window.location.href = '/' + (href === '#section-home' ? '' : href);
          }
        }
      }
    });
  });
  
  // Handle page load with hash in URL
  if (window.location.hash) {
    const targetId = window.location.hash;
    const targetElement = document.getElementById(targetId.substring(1));
    
    if (targetElement) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        instantScrollTo(targetElement);
      });
    }
  }
  
  // Completely instant scroll function
  function instantScrollTo(element) {
    // Calculate the position to scroll to (accounting for fixed header)
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    // Force instant scroll by directly setting scrollTop
    document.documentElement.scrollTop = offsetPosition;
    document.body.scrollTop = offsetPosition; // For older browsers
    
    // Update URL hash without adding to browser history
    if (history.replaceState) {
      history.replaceState(null, null, '#' + element.id);
    } else {
      window.location.hash = '#' + element.id;
    }
  }
});
