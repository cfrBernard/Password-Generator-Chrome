chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openExtensionSettings") {
        chrome.tabs.create({ url: `chrome://extensions/?id=${chrome.runtime.id}` });
    }
});
