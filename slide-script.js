// ===== Global variables =====  
let slideIndex = 0;
let slideInterval;
const slides = document.getElementsByClassName('slides');
const dots = document.getElementsByClassName('dot');

// ===== Slider functions =====
// Initialize/restart auto-scroll every 5 seconds
function startSlideShow() {
    if (slides.length === 0) return;

    clearInterval(slideInterval); // Clear previous interval before starting new one
    slideInterval = setInterval(() => {
        showSlide(slideIndex + 1);
    }, 5000);
}

// Hide all slides and show slide at index n
function showSlide(n) {
    if (slides.length === 0) return;
    
    // Hide all slides
    for (let slide of slides) {
        slide.style.display = 'none';
    }

    // Remove active class from all dots
    for (let dot of dots) {
        dot.classList.remove('active');
    }

    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    slides[slideIndex].style.display = 'flex';
    if (dots.length > 0) {
        dots[slideIndex].classList.add('active');
    }

    // Restart auto-scrolling after manual switching
    startSlideShow();
}

// Initialize navigation wrappers for buttons
function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

// Direct navigate to specific slide
function currentSlide(n) {
    showSlide(n);
}


// ===== MOBILE MENU FUNCTIONS =====
// Close mobile nav and updates ARIA state
function closeMenu() {
    const nav = document.querySelector('nav');
    const burger = document.getElementById('burger');
    if (nav && burger) {
        nav.classList.remove('show');
        burger.setAttribute('aria-expanded', 'false');
    }
}

// ===== INITIALIZATION ON PAGE LOAD =====
// All event listeners and observers are set up here
document.addEventListener('DOMContentLoaded', function () {
    try {
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotSpans = document.querySelectorAll('.dot');

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        dotSpans.forEach((dot, index) => {
            dot.addEventListener('click', () => currentSlide(index));
        });

        if (slides.length > 0) {
            showSlide(0);
        }

        const burger = document.getElementById('burger');
        const nav = document.querySelector('nav');

        if (burger && nav) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('show');
                const isExpanded = nav.classList.contains('show');
                burger.setAttribute('aria-expanded', isExpanded);
            });

            // Close when clicking outside the menu
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && 
                        !(e.target === burger || burger.contains(e.target)) &&
                        nav.classList.contains('show')) {
                    closeMenu();
                }
            });

            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', closeMenu);
            })
        }

        // Scroll to Top Button
        const scrollBtn = document.getElementById('scrollTopBtn');
        if (scrollBtn) {
            window.addEventListener('scroll', function() {
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    scrollBtn.style.display = 'flex';
                } else {
                    scrollBtn.style.display = 'none';
                }
            });

            scrollBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        const faders = document.querySelectorAll('.fade-in');

        if (faders.length > 0) {
            const appearOptions = { threshold: 0.15, rootMargin: '0px 0px -30px 0px' };
            const appearOnScroll = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, appearOptions);
            faders.forEach(fader => appearOnScroll.observe(fader));
        }

        const sections = [
            document.getElementById('about'),
            document.getElementById('education'),
            document.getElementById('projects'),
            document.getElementById('contacts')
        ].filter(s => s);

        const navLinks = [
            document.querySelector('nav a[href="#about"]'),
            document.querySelector('nav a[href="#education"]'),
            document.querySelector('nav a[href="#projects"]'),
            document.querySelector('nav a[href="#contacts"]')
        ].filter(l => l);

        function removeActiveClasses() {
            navLinks.forEach(link => link.classList.remove('active'));
        }

        function addActiveClass(index) {
            removeActiveClasses();
                if (navLinks[index] && sections[index]) {
                navLinks[index].classList.add('active');
            }
        }

        if (sections.length > 0 && navLinks.length > 0) {
            const sectionObserverOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = sections.findIndex(section => section === entry.target);
                        if (index !== -1) addActiveClass(index);
                    }
                });
            }, sectionObserverOptions);
            sections.forEach(section => sectionObserver.observe(section));

            window.addEventListener('scroll', () => {
                if (window.scrollY < 100) {
                    addActiveClass(0);
                }

                const pageHeight = document.documentElement.scrollHeight;
                const viewportHeight = window.innerHeight;
                const scrollPosition = window.scrollY;
                if (scrollPosition + viewportHeight >= pageHeight - 100) {
                    addActiveClass(2);
                }
            }, { passive: true });
        }

    } catch (error) {
        console.error('Initialization error: ', error);
    }
});
