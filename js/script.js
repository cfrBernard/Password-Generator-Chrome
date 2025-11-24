const generateBtn = document.getElementById("generate");
const passwordBtn = document.getElementById("password-btn");
const settingsBtn = document.getElementById("settings-btn");
const flexBox = document.querySelector(".flex-box");

let currentPassword = ''; 
let hasGenerated = false;

let options = {
    passwordLength: 12,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecial: true
};

// Generate password based on selected options
function generatePassword(opts) {
    let chars = "";
    if (opts.includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (opts.includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (opts.includeNumbers) chars += "0123456789";
    if (opts.includeSpecial) chars += "!@#$%^&*()_-+=<>?";

    if (!chars) return "";

    let password = "";

    // Ensure at least one character from each selected category
    const categories = [];
    if (opts.includeLowercase) categories.push("abcdefghijklmnopqrstuvwxyz");
    if (opts.includeUppercase) categories.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (opts.includeNumbers) categories.push("0123456789");
    if (opts.includeSpecial) categories.push("!@#$%^&*()_-+=<>?");

    categories.forEach(cat => {
        password += cat[Math.floor(Math.random() * cat.length)];
    });

    // Fill the rest of the password
    for (let i = password.length; i < opts.passwordLength; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle characters
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Update displayed password
function updatePassword() {
    currentPassword = generatePassword(options);
    let displayPassword = currentPassword;
    if (displayPassword.length > 12) {
        displayPassword = displayPassword.slice(0, 12) + '…';
    }
    passwordBtn.textContent = displayPassword;
    passwordBtn.title = `Click to copy: ${currentPassword}`;
}

// Copy password to clipboard
passwordBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(currentPassword).then(() => {
        const oldText = passwordBtn.textContent;
        passwordBtn.textContent = "✅ Copied!";
        setTimeout(() => passwordBtn.textContent = oldText, 500);
    });
});

// Load options from storage
function loadOptions(callback) {
    chrome.storage.sync.get([
        "passwordLength",
        "includeLowercase",
        "includeUppercase",
        "includeNumbers",
        "includeSpecial"
    ], (data) => {
        options.passwordLength = data.passwordLength ?? 12;
        options.includeLowercase = data.includeLowercase ?? true;
        options.includeUppercase = data.includeUppercase ?? true;
        options.includeNumbers = data.includeNumbers ?? true;
        options.includeSpecial = data.includeSpecial ?? true;

        if (callback) callback();
    });
}

// Update options when storage changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync") {
        for (let key in changes) {
            if (key in options) options[key] = changes[key].newValue;
        }
        updatePassword();
    }
});

// Events
generateBtn.addEventListener("click", () => {
    flexBox.classList.add("active");
    updatePassword();

    if (!hasGenerated) {
        generateBtn.innerHTML = `<img src="assets/icons/redo.svg" alt="Regenerate" width="30" height="30">`;
        hasGenerated = true; 
    }
});

settingsBtn.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
});

// Initialize
loadOptions(updatePassword);
