
   export function highlightSection() {
        const sections = document.querySelectorAll("section"); // Alle Sektionen, die du tracken möchtest
        const navLinks = document.querySelectorAll(".nav-link");
    
        let currentSection = "";

           // Überprüfe, welche Sektion im Viewport sichtbar ist
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect(); // Position relativ zum Viewport
        const sectionHeight = section.offsetHeight;
        const viewportMiddle = window.innerHeight / 2;

        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            currentSection = section.getAttribute("id");
        }
    });

        // Entferne die aktive Klasse von allen Links
        navLinks.forEach((link) => {
            link.classList.remove("active");

            // Füge die aktive Klasse dem Link hinzu, der zur aktuellen Sektion gehört
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

            link.addEventListener("click", function(event) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);

                if(targetElement) {
                    const offset = 90; // Offset in Pixel, z. B. für eine feste Navbar
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: elementPosition - offset, behavior: "smooth", block: "center"});
                }

            })
        });
    }

    export function setupNavigation() {
        console.log("Navigation ist initialisiert");
        highlightSection(); // Initiale Markierung der aktiven Sektion
        window.addEventListener("scroll", highlightSection);
    }