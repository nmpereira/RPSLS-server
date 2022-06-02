console.log("Instinc is the best!");
            const display = document.querySelector("#display");
            document
                .querySelector("form")
                .addEventListener("click", async (e) => {
                    if (e.target.classList.contains("btn")) {
                        const id = e.target.getAttribute("id");
                        const raw = await fetch(`/random?user=${id}`);
                        let res = await raw.json();
                        display.textContent = `${res.logic}, ${res.winner} wins!`;
                    }
                });