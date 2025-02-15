export function hoverfile(){
        const files = document.querySelectorAll(".file");
        files.forEach(file => {
        file.addEventListener("mouseenter", (e) => {
            console.log("mouseenter funktioniert");
            
            let tooltip = document.createElement("div");
            tooltip.innerText = "Hier Datenblatt herunterladen";
            tooltip.classList.add("tooltip");
    
            document.body.appendChild(tooltip);
            console.log(tooltip);
        });
    
        file.addEventListener("mouseleave", () => {
            document.querySelector(".tooltip")?.remove();
        });
    
        file.addEventListener("mousemove", (e) => {
            const tooltip = document.querySelector(".tooltip");
            if (tooltip) {
                tooltip.style.left = `${e.pageX + 10}px`;
                tooltip.style.top = `${e.pageY + 10}px`;
            }
        });
    }); 

};