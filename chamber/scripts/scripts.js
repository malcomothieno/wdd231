document.addEventListener('DOMContentLoaded', () => {
    const memberList = document.getElementById('member-list');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    let members = [];
    let currentView = 'grid'; // Initialize the current view as grid

    async function fetchMembers() {
        const response = await fetch('data/members.json');
        members = await response.json();
        displayMembers(members, currentView); // Pass the current view to the displayMembers function
    }

    function displayMembers(members, view) {
        memberList.innerHTML = '';
        memberList.className = view === 'grid' ? 'grid-view' : 'list-view';
        members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add(view === 'grid' ? 'member-card' : 'member-list-item');
            memberDiv.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}">${member.website}</a></p>
            `;
            memberList.appendChild(memberDiv);
        });
    }

    gridViewBtn.addEventListener('click', () => {
        currentView = 'grid'; // Update the current view to grid
        displayMembers(members, currentView);
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
        currentView = 'list'; // Update the current view to list
        displayMembers(members, currentView);
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });

    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            themeToggleBtn.textContent = 'Light Mode';
        } else {
            themeToggleBtn.textContent = 'Dark Mode';
        }
    });

    fetchMembers();

    // Display current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Display last modified date in footer
    document.getElementById('last-modified').textContent = document.lastModified;
});
