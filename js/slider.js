
// Funktion für Slider innerhalb eines Produkts
export function initializeSlider(produkt) {
    const slides = produkt.querySelectorAll('.slide');
    const buttons = produkt.querySelectorAll('.btn');

    function updateSlider(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            buttons[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        buttons[index].classList.add('active');
    }

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => updateSlider(index));
    });

    updateSlider(0); // Initiale Aktivierung des ersten Bildes
}

// Alle Produkte durchlaufen und individuellen Slider initialisieren
export function setupSliders() {
    document.querySelectorAll('.produkt').forEach(produkt => {
        initializeSlider(produkt);
    });
}




 //Funktion für den slider auf der Startseite:
 export function startSlider(){
    let index = 0;
    const slidesContainer = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".startSlide").length;

    function nextSlide() {
        let currentPage = document.body.getAttribute("data-page");
        if(currentPage === "home"){
            index = (index + 1) % totalSlides;
            slidesContainer.style.transform = `translateX(-${index * 100}vw)`;
        }
    }

    setInterval(nextSlide, 5000); // Alle 3 Sekunden wechselt das Bild
 }
 