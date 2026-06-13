// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('fa-bars');
    menuBtn.classList.toggle('fa-times');
});

// Close mobile menu on link click
document.querySelectorAll('.navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuBtn.classList.add('fa-bars');
        menuBtn.classList.remove('fa-times');
    });
});

// Header scroll effect & ScrollSpy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar .nav-link');

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // ScrollSpy
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        // Close other open items
        const currentlyActive = document.querySelector('.faq-item.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-up').forEach(element => {
    observer.observe(element);
});

// Dynamic Scroll Dots for horizontal sections (Mobile only via CSS)
const scrollContainers = document.querySelectorAll('.services-grid, .doctors-grid, .features-grid, .testimonials-grid');

scrollContainers.forEach(container => {
    // Create dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'scroll-dots';
    
    // Create dots based on children count
    const itemsCount = container.children.length;
    for (let i = 0; i < itemsCount; i++) {
        const dot = document.createElement('span');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dotsContainer.appendChild(dot);
    }
    
    // Insert dots container after the scroll container
    container.parentNode.insertBefore(dotsContainer, container.nextSibling);
    
    // Add scroll event listener to update active dot
    container.addEventListener('scroll', () => {
        // Calculate scroll percentage
        const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        // Find which index is most visible
        const activeIndex = Math.round(scrollPercentage * (itemsCount - 1));
        
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
});
