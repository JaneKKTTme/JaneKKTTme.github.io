let slideIndex = 0;
let slideInterval;

// === SLIDER ===
// Function to start/restart auto-scrolling
function startSlideShow() {
    const slides = document.getElementsByClassName("slides");
    clearInterval(slideInterval); // Clear previous interval before starting new one
    slideInterval = setInterval(() => {
        showSlide(slideIndex + 1);
    }, 5000);
}

// Main function to display slide
function showSlide(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    // Hide all slides
    for (let slide of slides) {
        slide.style.display = "none";
    }
    // Remove active class from all dots
    for (let dot of dots) {
        dot.className = dot.className.replace(" active", "");
    }
    // Adjust index
    slideIndex = (n + slides.length) % slides.length;
    // Display the required slide
    slides[slideIndex].style.display = "flex";
    // Activate corresponding dot
    dots[slideIndex].className += " active";

    // Restart auto-scrolling after manual switching
    startSlideShow();
}

function currentSlide(n) {
    showSlide(n);
}


document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger");
    const nav = document.querySelector("nav");

    burger.addEventListener("click", () => {
        nav.classList.toggle("show");
    });

    // To close when clicking outside the menu
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && 
                !(e.target === burger || burger.contains(e.target)) &&
                nav.classList.contains("show")) {
            nav.classList.remove("show");
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
        });
    })

    showSlide(slideIndex);
    startSlideShow();

    // Scroll to Top Button
    const scrollBtn = document.getElementById("scrollTopBtn");
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    }

    scrollBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // Element is considered visible when 10% of its area is in viewport
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('fade');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});