browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "updateLanguage") {
    browser.storage.local.set({ selectedLanguage: message.language });
  }
  if (message.action === "toggleSidebar") {
    await browser.sidebarAction.open();
    await browser.sidebarAction.toggle();
  }
});