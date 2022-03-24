const defaultInstanceUrl = 'https://invidious.fdn.fr';

const getInstantUrl = () => {
    return new Promise(result => {
        chrome.storage.local.get(['instanceUrl'], value => {
            if(value.instanceUrl) {
                result(value.instanceUrl);
            } else {
                chrome.storage.local.set({instanceUrl: defaultInstanceUrl}, () => {
                    result(defaultInstanceUrl);
                });
            }
        });
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'open_in_invidious',
        title: 'Ouvrir dans Invidious', 
        contexts:['all'],
        documentUrlPatterns: ['*://*.youtube.com/*']
    });

    getInstantUrl();
});

chrome.contextMenus.onClicked.addListener(info => {
    if(info.menuItemId === 'open_in_invidious' && info.linkUrl) {
        getInstantUrl().then(async instanceUrl => {
            const url = new URL(info.linkUrl);
            await chrome.tabs.create({url: `${instanceUrl}${url.pathname}${url.search}`});
        });
    }
});
