//Header und Footer ins DOM einfügen
export function loadHeaderAndFooter() {
    fetch("./header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#header-placeholder").innerHTML = data;
            highlightActiveMenu();
        })
        .catch(err => console.error("Fehler beim Laden des Headers:", err));

    fetch("./footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#footer-placeholder").innerHTML = data;
        })
        .catch(err => console.error("Fehler beim Laden des Footers:", err));
}

//aktuellen Menupunkt highlighten
export function highlightActiveMenu() {
    const header = document.querySelector("header");
    if (!header) return;

    const currentPage = document.body.getAttribute("data-page");
    const menuLinks = document.querySelectorAll("header .main-navigation ul li a");

    menuLinks.forEach(link => {
        if (link.getAttribute("data-page") === currentPage && !link.classList.contains("hovermenu")) {
            link.classList.add("active");
        }
    });

    dropdown();
}

export function dropdown(){
    const dropdown = document.querySelector(".hovermenu");
    const menuItem = dropdown.previousElementSibling; // <a class="uns">

    dropdown.addEventListener("mouseenter", () => {
        const isVisible = window.getComputedStyle(dropdown).display !== "none"; // Sicherstellen, dass es sichtbar ist
        console.log(isVisible);

        if (isVisible) {
            menuItem.focus();
        } else {
            menuItem.blur();
        }
    });

    dropdown.addEventListener("mouseleave", () => {
        menuItem.blur();
    });
    
 }
