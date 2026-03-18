document.addEventListener("DOMContentLoaded", () => {
    const events = [
        {
            title: "Network With Business",
            date: "feb 12, 2026",
            location: "Kampala International Conference Center",
            time: " 1:00 PM - 3:40 PM"
        },
        {
            title: "Big Enterpreneurs Minds",
            date: "feb 17, 2026",
            location: "Kololo airstrip grounds",
            time: "9:00 AM - 4:10 PM"
        },
        {
            title: "Tech Finder Expo",
            date: "feb 28, 2026",
            location: "Ntinda Confrence Home",
            time: "12:00 PM - 3:30 PM"
        },
        {
            title: "Innovaters Camp",
            date: "Mar 1, 2026",
            location: "Ntinda Beselfless Tech Center",
            time: "8:00 AM - 12:45 PM"
        },
        {
            title: "Uganda SkyRocket Business",
            date: "Jul 19, 2026",
            location: "Kampala City Square",
            time: "12:00 PM - 2:51 PM"
        },
        {
            title: "Start-up Camp",
            date: "Sept 23, 2026",
            location: "Freedom city grounds",
            time: "8:00 AM - 1:00 PM"
        }
    ];

    const eventsList = document.getElementById("events-list");

    events.forEach(event => {
        const eventItem = document.createElement("li");

        const eventTitle = document.createElement("h2");
        eventTitle.textContent = event.title;

        const eventDate = document.createElement("p");
        eventDate.textContent = `Date: ${event.date}`;

        const eventLocation = document.createElement("p");
        eventLocation.textContent = `Location: ${event.location}`;

        const eventTime = document.createElement("p");
        eventTime.textContent = `Time: ${event.time}`;

        eventItem.appendChild(eventTitle);
        eventItem.appendChild(eventDate);
        eventItem.appendChild(eventLocation);
        eventItem.appendChild(eventTime);

        eventsList.appendChild(eventItem);
    });
});
