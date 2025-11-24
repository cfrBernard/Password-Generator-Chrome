const slider = document.getElementById("password-length");
const display = document.getElementById("length-display");
const popup = document.getElementById("popup-feedback");

const lowercaseCheckbox = document.getElementById("include-lowercase");
const uppercaseCheckbox = document.getElementById("include-uppercase");
const numbersCheckbox = document.getElementById("include-numbers");
const specialCheckbox = document.getElementById("include-special");

const openSettingsBtn = document.getElementById("open-extension-settings");

// Save options
function saveOptions() {
    chrome.storage.sync.set({
        passwordLength: parseInt(slider.value),
        includeLowercase: lowercaseCheckbox.checked,
        includeUppercase: uppercaseCheckbox.checked,
        includeNumbers: numbersCheckbox.checked,
        includeSpecial: specialCheckbox.checked
    }, () => {
        showPopup("Settings saved!");
    });
}

function showPopup(message) {
    popup.textContent = message;
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
    }, 1200); // Hide after 1,2s
}

// Slider
slider.addEventListener("input", () => {
    display.textContent = slider.value;
    saveOptions();
});

// Checkbox
[lowercaseCheckbox, uppercaseCheckbox, numbersCheckbox, specialCheckbox].forEach(cb => {
    cb.addEventListener("change", saveOptions);
});

// Load config
chrome.storage.sync.get([
    "passwordLength",
    "includeLowercase",
    "includeUppercase",
    "includeNumbers",
    "includeSpecial"
], (data) => {
    slider.value = data.passwordLength ?? 12;
    display.textContent = data.passwordLength ?? 12;
    lowercaseCheckbox.checked = data.includeLowercase ?? true;
    uppercaseCheckbox.checked = data.includeUppercase ?? true;
    numbersCheckbox.checked = data.includeNumbers ?? true;
    specialCheckbox.checked = data.includeSpecial ?? true;
});

// Open Extension Settings
openSettingsBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openExtensionSettings" });
});
