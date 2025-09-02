// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu elements
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobile-menu';
    mobileMenu.style.display = 'none';
    
    // Get all navigation items
    const navItems = document.querySelectorAll('.navbar-nav .nav-item');
    const navList = document.createElement('ul');
    navList.className = 'mobile-nav-list';
    
    // Clone and append navigation items
    navItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = item.innerHTML;
        // Add click handler to close menu when a link is clicked
        const link = li.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                closeMobileMenu();
                // Scroll to the target section after a small delay
                setTimeout(() => {
                    if (targetId && targetId !== '#') {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 70, // Adjust for fixed header
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 300);
            });
        }
        navList.appendChild(li);
    });
    
    mobileMenu.appendChild(navList);
    document.body.appendChild(mobileMenu);
    
    // Create and style the menu button
    const menuButton = document.querySelector('.js-site-menu-toggle');
    if (menuButton) {
        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileMenu.style.display === 'block') {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991.98) {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        mobileMenu.style.display = 'block';
        document.body.style.overflow = 'hidden';
        menuButton.classList.add('active');
    }
    
    function closeMobileMenu() {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = '';
        const menuButton = document.querySelector('.js-site-menu-toggle');
        if (menuButton) {
            menuButton.classList.remove('active');
            // Reset the hamburger icon
            const spans = menuButton.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }
    }
});
