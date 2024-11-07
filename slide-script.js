var slideIndex = 0;
var timer1, timer;
var slides = document.getElementsByClassName("slides");
var dots = document.getElementsByClassName("dot");

function showSlides() {//called by automatic slideshow
    clearTimeout(timer1);//clear previously set timer 

    //clear styles
    for (var i = 0; i < slides.length; i++)
        slides[i].style.display = "none";           
    for (var i = 0; i < dots.length; i++) 
        dots[i].className = dots[i].className.replace(" active", "");
    
    //reset slideIndex
    if (++slideIndex == slides.length)
        slideIndex = 0;

    //reset styles
    slides[slideIndex].style.display = "block"; 
    dots[slideIndex].className += " active";
    
    //reset timer
    timer1 = setTimeout(showSlides, 3000);
}

function showSlide(n) {//called when user manually choose particular slide
    //clear previously set timers
    clearTimeout(timer1);
    clearTimeout(timer);

    //clear styles
    for (var i = 0; i < slides.length; i++) 
        slides[i].style.display = "none";
    for (var i = 0; i < dots.length; i++) 
        dots[i].className = dots[i].className.replace(" active", "");

    //reset slideIndex
    if (n == slides.length)
        slideIndex = 0; 
    if (n < 0)
        slideIndex = slides.length;

    //reset styles
    slides[slideIndex].style.display = "block"; 
    dots[slideIndex].className += " active";

    //reset timer for automatic slideshow
    timer = setTimeout(showSlides, 10000);
}