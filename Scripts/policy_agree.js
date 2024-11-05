// Check if the "agreedToTerms" cookie is set
document.addEventListener('DOMContentLoaded', () => {
    if (getCookie("agreedToTerms") === "true") {
        document.getElementById("agree-checkbox").checked = true;
        document.getElementById("agree-checkbox").disabled = true;
        alert("You have already agreed to the terms and conditions.");
    }
});

// Function to submit agreement
function submitAgreement() {
    const checkbox = document.getElementById("agree-checkbox");
    if (checkbox.checked) {
        setCookie("agreedToTerms", "true", 30); // Cookie expires in 30 days
        alert("Thank you for agreeing to the terms and conditions.");
        checkbox.disabled = true; // Disable checkbox after agreeing
    } else {
        alert("Please agree to the terms and conditions.");
    }
}

// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
