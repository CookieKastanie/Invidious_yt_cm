const instanceUrl = 'https://invidious.fdn.fr';

const parseVideoId = url => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'open_in_invidious',
        title: 'Ouvrir dans Invidious', 
        contexts:['all'],
        documentUrlPatterns: ["*://*.youtube.com/*"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if(info.menuItemId === 'open_in_invidious' && info.linkUrl) {
        const id = parseVideoId(info.linkUrl);
        if(id) await chrome.tabs.create({url: `${instanceUrl}/watch?v=${id}`});
    }
});
