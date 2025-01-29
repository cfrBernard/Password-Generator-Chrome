const generateBtn = document.getElementById("generate");
const passwordBtn = document.getElementById("password-btn");
const flexBox = document.querySelector(".flex-box");

let currentPassword = ''; 
let hasGenerated = false;

// Generate Password Function
function generatePassword(length = 12) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?";

    // Define the set of possible characters
    const allChars = lowercase + uppercase + numbers + specialChars;

    let password = "";

    // Add at least one uppercase letter, one lowercase letter, one number, and one special character
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest of the password with random characters
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle characters to avoid predictable structure
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

// Click Event on Generate Button
generateBtn.addEventListener("click", () => {

    flexBox.classList.add("active");

    // Generate and display password
    const newPassword = generatePassword();
    currentPassword = newPassword; 
    passwordBtn.textContent = newPassword;

    // Replace text with SVG after first click
    if (!hasGenerated) {
        generateBtn.innerHTML = `<img src="dev/redo.svg" alt="Regenerate" width="30" height="30">`;
        hasGenerated = true; 
    }
});

// Click Event on Password Button (Copy to Clipboard)
passwordBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordBtn.textContent).then(() => {
        passwordBtn.textContent = "Copied!"; 

        setTimeout(() => {
            passwordBtn.textContent = currentPassword;
        }, 500);
    });
});
