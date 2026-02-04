// Elements
const body = document.body;
const themeBtn = document.getElementById('theme-btn');
const langBtn = document.getElementById('lang-btn');
const mobileMenuBtn = document.getElementById('mobile-toggle');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

// Theme Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeBtn) themeBtn.querySelector('i').className = 'fa-solid fa-sun';
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeBtn.querySelector('i').className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// Language Logic (Dropdown)
const langDropdown = document.querySelector('.lang-dropdown');
const langMenu = document.getElementById('lang-menu');
const langItems = langMenu.querySelectorAll('li');

// Toggle Dropdown
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
});

// Close Dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

// Handle Language Selection
langItems.forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        setLanguage(lang);
        langDropdown.classList.remove('active');
    });
});

function setLanguage(lang) {
    const isArabic = lang === 'ar';
    const newDir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.dir = newDir;
    document.documentElement.lang = lang;

    // Update Button Appearance
    const currentFlag = langBtn.querySelector('.flag-img');
    const currentText = langBtn.querySelector('.lang-text');
    
    if (lang === 'en') {
        currentFlag.src = 'images/Englihsvg.svg';
        currentFlag.alt = 'USA';
        currentText.textContent = 'EN';
    } else {
        currentFlag.src = 'images/Arbic.svg';
        currentFlag.alt = 'Syria';
        currentText.textContent = 'AR';
    }

    // Update Selected Item Style
    langItems.forEach(item => {
        item.classList.remove('selected');
        if (item.getAttribute('data-lang') === lang) {
            item.classList.add('selected');
        }
    });

    // Update Page Content
    updateContent(lang);
}

function updateContent(lang) {
    const attr = lang === 'en' ? 'data-en' : 'data-ar';
    document.querySelectorAll(`[${attr}]`).forEach(el => {
        if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.getAttribute(`${attr}-placeholder`);
        } else {
            el.textContent = el.getAttribute(attr);
        }
    });
}

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active'); // Slide in
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active'); // Slide out
});

// Close menu when clicking link
document.querySelectorAll('.mobile-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Mobile Menu Language Dropdown
const langBtnMobile = document.getElementById('lang-btn-mobile');
const langMenuMobile = document.getElementById('lang-menu-mobile');
const langDropdownMobile = langBtnMobile?.parentElement;

if (langBtnMobile && langMenuMobile) {
    // Toggle Mobile Language Dropdown
    langBtnMobile.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdownMobile.classList.toggle('active');
    });

    // Handle Mobile Language Selection
    langMenuMobile.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.getAttribute('data-lang');
            setLanguage(lang);
            langDropdownMobile.classList.remove('active');
            
            // Update mobile button appearance
            const currentFlagMobile = langBtnMobile.querySelector('.flag-icon img');
            const currentTextMobile = langBtnMobile.querySelector('.lang-text');
            
            if (lang === 'en') {
                currentFlagMobile.src = 'images/Englihsvg.svg';
                currentFlagMobile.alt = 'EN';
                currentTextMobile.textContent = 'EN';
            } else {
                currentFlagMobile.src = 'images/Arbic.svg';
                currentFlagMobile.alt = 'AR';
                currentTextMobile.textContent = 'AR';
            }
        });
    });
}

// Mobile Theme Toggle
const themeBtnMobile = document.getElementById('theme-btn-mobile');
if (themeBtnMobile) {
    themeBtnMobile.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        
        // Update both desktop and mobile theme icons
        const iconClass = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        if (themeBtn) themeBtn.querySelector('i').className = iconClass;
        if (themeBtnMobile) themeBtnMobile.querySelector('i').className = iconClass;
        
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// Countdown Timer Logic
function startCountdown() {
    // Set a dynamic target date (e.g., 6 days from now) just for display
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 6); // Add 6 days

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Reset if expired (looping timer for demo)
            targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 6);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (dEl) dEl.innerText = days < 10 ? '0' + days : days;
        if (hEl) hEl.innerText = hours < 10 ? '0' + hours : hours;
        if (mEl) mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (sEl) sEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
}

// Start timer on load
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});

// Scroll to Top Button Logic
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Custom Slow Smooth Scroll Function
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    if (!targetElement) return;

    var header = document.querySelector('.pro-header');
    var headerOffset = header ? header.offsetHeight : 0;
    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Ease in-out function
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Apply smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;

        e.preventDefault();
        smoothScroll(targetId, 1500); // 1.5 seconds duration

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
});

// Mobile Testimonials Carousel
const reviewsGrid = document.querySelector('.reviews-grid');
const reviewCards = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let currentSlide = 0;
let carouselInterval;

function startCarousel() {
    // Only run on mobile (<= 768px)
    if (window.innerWidth <= 768 && reviewCards.length > 0) {
        if (!carouselInterval) {
            carouselInterval = setInterval(() => {
                currentSlide++;
                if (currentSlide >= reviewCards.length) {
                    currentSlide = 0;
                }
                updateCarousel();
            }, 3000); // 3 seconds
        }
    } else {
        // Reset if desktop
        stopCarousel();
        resetCarousel();
    }
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function updateCarousel() {
    // Remove active class from all cards
    reviewCards.forEach((card, index) => {
        card.classList.remove('active');
    });
    
    // Add active class to current card
    if (reviewCards[currentSlide]) {
        reviewCards[currentSlide].classList.add('active');
    }
}

function resetCarousel() {
    currentSlide = 0;
    reviewCards.forEach(card => {
        card.style.transform = ''; // Clear inline styles
        card.classList.remove('active');
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    // Restart auto-play timer
    stopCarousel();
    startCarousel();
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= reviewCards.length) {
        currentSlide = 0;
    }
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = reviewCards.length - 1;
    }
    goToSlide(currentSlide);
}

// Initialize carousel
if (reviewsGrid && reviewCards.length > 0) {
    // Set first card as active initially
    if (reviewCards[0]) {
        reviewCards[0].classList.add('active');
    }
    
    startCarousel();
    
    // Arrow click handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        startCarousel();
    });
}
