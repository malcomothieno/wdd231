document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    const visitMessage = document.getElementById('visit-message');
    const cardsContainer = document.getElementById('discover-cards');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = Date.now();

    if (navButton && primaryNav) {
        navButton.addEventListener('click', () => {
            const isOpen = primaryNav.classList.toggle('open');
            navButton.setAttribute('aria-expanded', String(isOpen));
        });
    }

    if (!lastVisit) {
        visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysSinceLastVisit = Math.round((currentTime - Number(lastVisit)) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = 'Back so soon! Awesome!';
        } else if (daysSinceLastVisit === 1) {
            visitMessage.textContent = 'You last visited 1 day ago.';
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', String(currentTime));

    async function loadDiscoverCards() {
        try {
            const response = await fetch('data/discover.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const cards = await response.json();
            cardsContainer.innerHTML = '';

            cards.forEach((card, index) => {
                const article = document.createElement('article');
                article.className = `discover-card area-card${index + 1}`;

                article.innerHTML = `
                    <img src="images/${card.image}" alt="${card.name}" loading="lazy" width="84" height="84">
                    <h3>${card.name}</h3>
                    <address class="card-address">${card.address}</address>
                    <p class="card-description">${card.description}</p>
                    <a class="card-link" href="${card.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
                `;

                cardsContainer.appendChild(article);
            });
        } catch (error) {
            cardsContainer.innerHTML = '<p>Unable to load discover cards right now.</p>';
            console.error('Error loading discover cards:', error);
        }
    }

    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    generateCalendar(currentMonth, currentYear);

    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        generateCalendar(currentMonth, currentYear);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        generateCalendar(currentMonth, currentYear);
    });

    function generateCalendar(month, year) {
        const calendarMonthYear = document.getElementById('calendar-month-year');
        const calendarDays = document.getElementById('calendar-days');

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        calendarMonthYear.textContent = `${monthNames[month]} ${year}`;
        calendarDays.innerHTML = '';

        dayNames.forEach((dayName) => {
            const dayNameCell = document.createElement('div');
            dayNameCell.className = 'calendar-day-name';
            dayNameCell.textContent = dayName;
            calendarDays.appendChild(dayNameCell);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i += 1) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarDays.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            calendarDays.appendChild(dayCell);
        }
    }

    loadDiscoverCards();
});
