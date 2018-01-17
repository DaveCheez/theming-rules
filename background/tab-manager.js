class TabManager {
  constructor({ onSelectionChanged, onUpdated }) {
    this.map = new Map();
    chrome.tabs.onActivated.addListener(async function({ tabId }) {
      let tab = await browser.tabs.get(tabId);
      onSelectionChanged(tab);
    });

    chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
      await onUpdated(tab, changeInfo);
      if (tab.active) {
        await onSelectionChanged(tab);
      }
    });
  }
}