let slideIndex = 0;
let slideInterval;

// === СЛАЙДЕР ===
// Функция для запуска/перезапуска автопрокрутки
function startSlideShow() {
    const slides = document.getElementsByClassName("slides");
    clearInterval(slideInterval); // Очищаем предыдущий интервал перед запуском нового
    slideInterval = setInterval(() => {
        showSlide(slideIndex + 1);
    }, 5000);
}

// Главная функция для показа слайда
function showSlide(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    // Скрываем все слайды
    for (let slide of slides) {
        slide.style.display = "none";
    }
    // Убираем активный класс со всех точек
    for (let dot of dots) {
        dot.className = dot.className.replace(" active", "");
    }
    // Корректируем индекс
    slideIndex = (n + slides.length) % slides.length;
    // Показываем нужный слайд
    slides[slideIndex].style.display = "flex";
    // Активируем соответствующую точку
    dots[slideIndex].className += " active";

    // Перезапускаем автопрокрутку после ручного переключения
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

    // Чтобы закрыть при клике вне меню
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
        threshold: 0.1, // Элемент считается видимым, когда 10% его площади в зоне видимости
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
