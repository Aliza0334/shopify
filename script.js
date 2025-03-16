 function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
}

 //contact form 

(function () {
    emailjs.init('0XbPgCRLmVYvdpIXn'); // Replace with your User ID

    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = this;
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        const messageDiv = document.getElementById('formMessage');

        clearErrors();

        let isValid = true;
        const userName = nameField.value.trim();
         const userEmail = emailField.value.trim(); 
      const userMessage = messageField.value.trim();


        if (!userName) {
            showError(nameField, 'Please Enter Your Name');
            isValid = false;
        }
        if (!userEmail) {
            showError(emailField, 'Please Enter Your Email');
            isValid = false;
        } else if (!validateEmail(userEmail)) {
            showError(emailField, 'Invalid email format');
            isValid = false;
        }
        if (!messageField.value.trim()) {
            showError(messageField, 'Please Write Your Message');
            isValid = false;
        }

        if (!isValid) return;

    showMessage('Message sent successfully!', 'success');

        // Send the message to your email
        emailjs.send("service_37gd5px", "template_hb3fo3o", {
            from_name: userName,
            from_email: userEmail,
            from_message: messageField.value.trim(),
            to_email: 'alizadeveloper1@gmail.com' // Your email
        }).then(() => {
            form.reset();

            console.log("Calling sendAutoReply with:", userEmail, userName);

        
            if (userEmail) {
                setTimeout(() => sendAutoReply(userEmail, userName), 2000);
            } else {
                console.error("Auto-reply not sent: userEmail is empty.");
            }
        }, (error) => {
            showMessage('Something went wrong. Please try again.', 'danger');
            console.error(error);
        });
    });

    function sendAutoReply(userEmail, userName) {
        if (!userEmail) {
            console.error('Auto-reply error: Recipient email is empty.');
            return;
        }

        emailjs.send("service_37gd5px", "template_4b3lp15", {
            user_name: userName,
            to_email: userEmail,
            from_email: "alizadeveloper1@gmail.com",
            reply_to: "alizadeveloper1@gmail.com"
        }).then(() => {
            console.log('Auto-reply sent successfully to:', userEmail);
        }, (error) => {
            console.error('Auto-reply failed:', error);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(inputField, message) {
        let errorDiv = document.createElement('div');
        errorDiv.className = 'text-danger small mt-1 error-message';
        errorDiv.textContent = message;
        inputField.parentNode.appendChild(errorDiv);
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
    }

    function showMessage(text, type) {
        const messageDiv = document.getElementById('formMessage');

        // Create a progress bar
        messageDiv.innerHTML = `<span>${text}</span>
                                <div class="progress-bar"></div>`;

        messageDiv.className = `message alert alert-${type} show-message`;

        // Trigger animation
        setTimeout(() => {
            messageDiv.classList.add('fade-out'); // Start fading out
        }, 2500); // Duration before fade starts

        // Hide message after animation
        setTimeout(() => {
            messageDiv.className = 'message'; // Reset classes
            messageDiv.innerHTML = ''; // Clear content
        }, 5000);
    }

})();



//Progres bars:
   document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".progress-bar").forEach(bar => {
        let width = bar.style.getPropertyValue("--progress-width"); // Get width from CSS variable
        setTimeout(() => {
            bar.style.width = width; // Apply correct width dynamically
        }, 500); // Small delay for better animation
    });
});



//active class for navbar
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.navbar a').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
    });
});
