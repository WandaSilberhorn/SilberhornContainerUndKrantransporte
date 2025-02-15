 // Funktion für modale Bildanzeige
    // Funktion für das globale Modal

    export function initializeGlobalModal() {
        const modal = document.getElementById('modal');
        const modalSlider = modal.querySelector('.modal-slider');  // Container für Bilder
        const modalButtonsContainer = modal.querySelector('.modal-buttons'); // Container für Buttons
        const closeModalButton = modal.querySelector('.close');

        let modalSlides = [];
        let modalButtons = [];

        function updateModal(index) {
            modalSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                modalButtons[i].classList.remove('active');
            });
            modalSlides[index].classList.add('active');
            modalButtons[index].classList.add('active');
        }

        // Eventlistener zum Öffnen des Modals für jedes Produkt
        document.querySelectorAll('.produkt').forEach(produkt => {
            produkt.querySelectorAll('.slide').forEach((slide, index) => {
                slide.addEventListener('click', () => {
                    // Zunächst Modal-Inhalt löschen
                    modalSlider.innerHTML = "";
                    modalButtonsContainer.innerHTML = "";

                    // Neue Bilder aus dem geklickten Produkt in das Modal übertragen
                    const produktSlides = produkt.querySelectorAll('.slide');

                    produktSlides.forEach((produktSlide, i) => {
                        // Bild für das Modal erstellen -> hmtl Code generieren
                        const img = document.createElement('img');
                        img.src = produktSlide.src;
                        img.classList.add('modal-slide');
                        if (i === 0) img.classList.add('active'); // Erstes Bild aktiv setzen
                        modalSlider.appendChild(img);
                    });

                    // Buttons für die Navigation erstellen
                    produktSlides.forEach((_, i) => {
                        const button = document.createElement('button');
                        button.classList.add('modal-btn');
                        if (i === 0) button.classList.add('active'); // Erster Button aktiv setzen
                        button.dataset.index = i;
                        modalButtonsContainer.appendChild(button);
                    });

                    // Neue Event Listener setzen
                    modalSlides = modal.querySelectorAll('.modal-slide');
                    modalButtons = modal.querySelectorAll('.modal-btn');

                    modalButtons.forEach((button, i) => {
                        button.addEventListener('click', () => updateModal(i));
                    });

                    // Modal anzeigen
                    modal.style.display = 'flex';
                    modal.classList.add('zoom');
                });
            });
        });

        // Modal schließen
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.classList.remove('zoom');
        });
    }

    // initializeGlobalModal();