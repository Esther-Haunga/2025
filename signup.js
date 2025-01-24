document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;
    const signupMessage = document.getElementById("signupMessage");

    if (password !== confirmPassword) {
        signupMessage.textContent = "Passwords do not match. Please try again.";
        signupMessage.classList.add("error");
        return;
    }

    // Send data to the backend
    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            signupMessage.textContent = result.message;
            signupMessage.classList.add("success");
            document.getElementById("signupForm").reset();

            // Redirect to the main page after successful sign-up
            window.location.href = "/main.html";  // Or wherever your main page is
        } else {
            signupMessage.textContent = result.error;
            signupMessage.classList.add("error");
        }
    } catch (error) {
        signupMessage.textContent = "An error occurred. Please try again.";
        signupMessage.classList.add("error");
    }
});
