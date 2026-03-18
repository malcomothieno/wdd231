document.addEventListener('DOMContentLoaded', () => {
    // Fetch weather data (assuming this code is already in place)

    // Fetch company spotlights
    const jsonUrl = 'data/members.json';

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            const members = data.filter(member => member.membership_level <= 3);
            shuffleArray(members);
            const spotlightContainer = document.getElementById('spotlights-container');
            members.slice(0, 3).forEach(member => {
                spotlightContainer.innerHTML += `
                    <div class="spotlight">
                        <img src="images/${member.image}" alt="${member.name}">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>Phone: ${member.phone}</p>
                        <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
                    </div>
                `;
            });
        });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }
});
