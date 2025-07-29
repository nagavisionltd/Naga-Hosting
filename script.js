// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  });
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    if (!this.classList.contains('featured')) {
      this.style.transform = 'translateY(0)';
    } else {
      this.style.transform = 'scale(1.05)';
    }
  });
});

// Mobile menu toggle (basic implementation)
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.classList.toggle('mobile-active');
}

// Add mobile menu styles dynamically
const mobileMenuStyles = `
  @media (max-width: 768px) {
    .nav-menu.mobile-active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      padding: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Add mobile menu button for smaller screens
if (window.innerWidth <= 768) {
  const navbar = document.querySelector('.navbar .container');
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.innerHTML = '☰';
  mobileMenuBtn.style.cssText = 'background: none; border: none; font-size: 1.5rem; cursor: pointer;';
  mobileMenuBtn.onclick = toggleMobileMenu;
  navbar.appendChild(mobileMenuBtn);
}

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Add loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});
