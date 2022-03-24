const input = document.querySelector('input');

chrome.storage.local.get(['instanceUrl'], ({instanceUrl}) => {
    input.value = instanceUrl;
});

input.addEventListener('change', () => {
    chrome.storage.local.set({instanceUrl: input.value}, () => {});
});
