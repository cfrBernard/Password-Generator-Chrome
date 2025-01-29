const generateBtn = document.getElementById("generate");
const passwordBtn = document.getElementById("password-btn");
const flexBox = document.querySelector(".flex-box");

// Generate Password Function
function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    // dev: oblige un minimum de spés/caps
    return password;
}

// Click Event on Generate Button
generateBtn.addEventListener("click", () => {
    // Activate layout transition
    flexBox.classList.add("active");

    // Generate and display password
    const newPassword = generatePassword();
    passwordBtn.textContent = newPassword;
});

// Click Event on Password Button (Copy to Clipboard)
passwordBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordBtn.textContent).then(() => {
        passwordBtn.textContent = "✅ Copied!";
        setTimeout(() => {
            // dev: garde le mdp en mémoire et réaffiche 
        }, 1000);
    });
});
