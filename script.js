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

