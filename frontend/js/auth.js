const API = "http://localhost:3000/api";


async function register() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // --- Validation Logic ---
    
    if (!name || name.length < 2) {
        alert("Please enter a valid name (at least 2 characters).");
        return;
    }

    // Basic Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 4) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    try {
        const response = await fetch(API + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            alert("Registered successfully!");
            window.location.href = "login.html";
        } else {
            const errorData = await response.json();
            alert("Registration failed: " + (errorData.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Something went wrong. Please try again later.");
    }
}


async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "dashboard.html";
    } else {
        alert("Login failed");
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}