document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user");
    const nameInput = document.getElementById("name");
    const messageParagraph = document.getElementById("message");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Empêche l'envoi du formulaire par défaut

        const name = nameInput.value.trim();
        if (!name) {
            messageParagraph.textContent = "Vous devez remplir tous les champs !";
            return;
        }

        fetch('http://localhost/quizzm/_api/api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, type: 'inscription' })
        })
        .then(response => response.ok ? response.json() : Promise.reject('Erreur HTTP, statut ' + response.status))
        .then(data => {
            if (data.status === 'success') {
                localStorage.setItem('user', data.user);
                window.location.href = 'views/exercises.php';
            } else {
                messageParagraph.textContent = data.message;
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            messageParagraph.textContent = "Une erreur s'est produite lors de l'envoi des données.";
        });
    });
});

    
    
    