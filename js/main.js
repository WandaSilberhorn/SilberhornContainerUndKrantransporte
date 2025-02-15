import { setupSliders, startSlider } from "./slider.js";
import { loadHeaderAndFooter, dropdown } from "./header-footer.js";
import { initializeGlobalModal } from "./modal.js";
import { highlightSection, setupNavigation } from "./containernavigation.js";
import { validateFormular } from "./validierungFormular.js";
import { hoverfile } from "./hoverfile.js";


document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.body.getAttribute("data-page");
    loadHeaderAndFooter();
    if(currentPage === "container-mieten" || currentPage === "frischwassertank"){
        setupSliders();
        initializeGlobalModal();
    }

    if(currentPage === "contact"){
        validateFormular();
    }
    setupNavigation();
    startSlider();
    hoverfile();

});

   


