document.addEventListener('DOMContentLoaded', (event) => {
    // For join.html
    if (document.getElementById('timestamp')) {
        document.getElementById('timestamp').value = new Date().toUTCString();
    }

    window.showModal = function() {
        document.getElementById('membershipModal').style.display = "block";
    };

    window.closeModal = function() {
        document.getElementById('membershipModal').style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == document.getElementById('membershipModal')) {
            document.getElementById('membershipModal').style.display = "none";
        }
    };

    // For thankyou.html
    const urlParams = new URLSearchParams(window.location.search);
    if (document.getElementById('firstName')) {
        document.getElementById('firstName').textContent = urlParams.get('first-name');
    }
    if (document.getElementById('lastName')) {
        document.getElementById('lastName').textContent = urlParams.get('last-name');
    }
    if (document.getElementById('email')) {
        document.getElementById('email').textContent = urlParams.get('email');
    }
    if (document.getElementById('mobilePhone')) {
        document.getElementById('mobilePhone').textContent = urlParams.get('mobile-phone');
    }
    if (document.getElementById('organization')) {
        document.getElementById('organization').textContent = urlParams.get('organization');
    }
    if (document.getElementById('timestamp')) {
        document.getElementById('timestamp').textContent = urlParams.get('timestamp');
    }
    document.getElementById('year').textContent = new Date().getFullYear();

    // Display last modified date in footer
    document.getElementById('last-modified').textContent = document.lastModified;
});
