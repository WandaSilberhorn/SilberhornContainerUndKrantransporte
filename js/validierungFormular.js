export function validateFormular() {
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Verhindert das direkte Absenden des Formulars
         // Vor jeder Überprüfung vorherige Fehlermeldungen entfernen
         clearErrors();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("telefonnummer").value.trim();
        let betreff = document.getElementById("betreff").value.trim();
        let message = document.getElementById("message").value.trim();
        
        let errorMessage = [];
        let errorPlace = []; // Sollte ein HTML-Element sein

        // Betreff prüfen
        if (betreff === "") {
            errorMessage.push("Bitte geben Sie einen Betreff an");
            errorPlace.push("betreff");
            if (!errorPlace) errorPlace = document.getElementById("betreff");
        }

        // Nachricht prüfen
        if (message === "") {
            errorMessage.push("Was möchten Sie uns mitteilen?");
            errorPlace.push("message");
            if (!errorPlace) errorPlace = document.getElementById("message");
        }

        // Name prüfen (darf keine Zahlen enthalten)
        if (name === "" || /\d/.test(name)) {
            errorMessage.push("Bitte geben Sie einen Namen an");
            errorPlace.push("name");
            if (!errorPlace) errorPlace = document.getElementById("name");
        }

        // E-Mail-Validierung
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailPattern)) {
            errorMessage.push("Bitte geben Sie eine Email an");
            errorPlace.push("email");
            if (!errorPlace) errorPlace = document.getElementById("email");
        }

        // Telefonnummer (optional, falls eingegeben, muss sie korrekt sein)
        let phonePattern = /^[0-9+\-\s()]*$/;
        if (phone !== "" && !phone.match(phonePattern)) {
            errorPlace.push("telefonnummer");
            if (!errorPlace) errorPlace = document.getElementById("telefonnummer");
        }

        // Falls Fehler vorhanden sind, anzeigen und Fokus setzen
        if (errorMessage.length !== 0) {
            showMessage(errorMessage, errorPlace);
            return false;
        }

        // Falls keine Fehler vorhanden sind, Formular absenden
        document.getElementById("contactForm").submit();
    }); 
}

// Funktion zur Anzeige der Fehlermeldung
export function showMessage(errorMessage, errorPlace) {
    console.log(errorMessage);

    for (let i = 0; i < errorPlace.length; i++) {
            // const element = errorPlace[i];
            let feedback = document.createElement("p");
            feedback.id = "feedback";
            let fieldId = errorPlace[i]; 
            let label = document.querySelector(`label[for='${fieldId}']`);
            console.log(fieldId);
            label.appendChild(feedback);
            feedback.textContent = errorMessage[i];
            console.log(document.getElementById(fieldId));
            
            document.getElementById(fieldId).style.border = ".20em solid #000dff";
    }    
}

function clearErrors() {
        // Alle bestehenden Fehlermeldungen entfernen
        document.querySelectorAll("#feedback").forEach(feedback => feedback.remove());
       
        // Alle Eingabefelder wieder in den Normalzustand versetzen
        document.querySelectorAll("#contactForm input, #contactForm textarea").forEach(field => {
            field.style.border = ".20em solid #151E2B"; // Standard-Rahmen zurücksetzen
        });
    }