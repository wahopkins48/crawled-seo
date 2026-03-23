/**
 * Navigation & Mobile Menu Toggle
 */
function toggleMenu() {
  const navbar = document.getElementById('myNavbar');
  const links = navbar.querySelector('.nav-links');
  const icon = navbar.querySelector('.hamburger-icon');
  
  links.classList.toggle('active');
  icon.classList.toggle('active');
  
  // Prevent scrolling when menu is open on mobile
  if (links.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

// Close menu when clicking a nav link or clicking outside the menu
document.addEventListener('click', function(e) {
  const navbar = document.getElementById('myNavbar');
  const links = navbar.querySelector('.nav-links');
  const icon = navbar.querySelector('.hamburger-icon');
  const isClickInside = navbar.contains(e.target);

  if (!isClickInside && links.classList.contains('active')) {
    links.classList.remove('active');
    icon.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Close if a specific nav-link is clicked
  if (e.target.classList.contains('nav-link') && window.innerWidth <= 768) {
    links.classList.remove('active');
    icon.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/**
 * Modal Functionality (Audit Modal)
 */
const modal = document.getElementById('auditModal');
const openModalBtn = document.getElementById('openAuditModal');
const closeModalBtn = document.getElementById('closeModal');
const auditForm = document.getElementById('auditForm');

if (openModalBtn) {
  openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

// Close modal when clicking backdrop or pressing Escape
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/**
 * Form Handling
 */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Note: Formspree handles the actual redirect/submission.
    // We can add a simple "Sending..." state here if desired.
    console.log('Contact form submitted to Formspree');
  });
}

if (auditForm) {
  auditForm.addEventListener('submit', () => {
    console.log('Audit form submitted to Formspree');
  });
}

/**
 * Scroll Effects
 */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Animate elements on scroll using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('Crawled SEO site initialized.');
});
