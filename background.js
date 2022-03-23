const instanceUrl = 'https://invidious.fdn.fr';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'open_in_invidious',
        title: 'Ouvrir dans Invidious', 
        contexts:['all'],
        documentUrlPatterns: ["*://*.youtube.com/*"]
    });
});

chrome.contextMenus.onClicked.addListener(async info => {
    if(info.menuItemId === 'open_in_invidious' && info.linkUrl) {
        const url = new URL(info.linkUrl);
        await chrome.tabs.create({url: `${instanceUrl}${url.pathname}${url.search}`});
    }
});
