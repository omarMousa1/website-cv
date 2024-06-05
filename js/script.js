
// ################################ card slider ################################

const swiper = new Swiper(".group-of-testimonial-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: false,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        800: {
            slidesPerView: 2,
        },
        1110: {
            slidesPerView: 3,
        },
    },
});

// ################################ End: card slider ################################


// ################################ Exit nav bar ################################

const exitMenu = () => {
    document.getElementById('menu-toggle').checked = false;
};

document.getElementById('exit').addEventListener('click', exitMenu);

// ################################ End: Exit nav bar ################################


// ################################ validation form ################################

document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('url').value;
    const helpText = document.getElementById('text-box').value;
    const errorMessageDiv = document.getElementById('error-message');

    // Clear previous error messages
    errorMessageDiv.innerHTML = '';

    // Simple validation
    if (!name) {
        showError('Please enter your name.');
        return;
    }
    if (!email) {
        showError('Please enter your email.');
        return;
    }
    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    if (!helpText) {
        showError('Please enter how I can help.');
        return;
    }

    // Form is valid, submit the form (here we just log a message for demonstration)
    errorMessageDiv.style.color = 'green';
    errorMessageDiv.innerHTML = 'Form submitted successfully!';

    // Reset form (optional)
    document.getElementById('registration-form').reset();
});

// Function to display error messages
function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.color = 'red';
    errorMessageDiv.innerHTML = message;
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

// ################################ End: validation form ################################


// ################################ download resume ################################

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Omar Mousa CV-2.pdf';
    link.download = 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('resume').addEventListener('click', downloadResume);

// ################################ End: download resume ################################