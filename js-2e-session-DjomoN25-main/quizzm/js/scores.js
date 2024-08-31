document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost/quizzm/_api/api.php?action=getTopScores')
        .then(response => response.ok ? response.json() : Promise.reject('Erreur HTTP, statut ' + response.statusText))
        .then(data => {
            const scoresTableBody = document.querySelector('#scoresTable tbody');
            scoresTableBody.innerHTML = data.map((score, index) => {
                const className = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
                return `
                    <tr class="${className}">
                        <td>${index + 1}</td>
                        <td>${score.name}</td>
                        <td>${parseFloat(score.normalized_score).toFixed(2)} /20</td>
                    </tr>
                `;
            }).join('');
        })
        .catch(error => console.error('Erreur lors de la récupération des scores:', error));
});
