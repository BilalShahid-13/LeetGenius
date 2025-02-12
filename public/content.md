

// Listen for messages from `background.js`
browser.runtime.onMessage.addListener((message, sendResponse) => {
  if (message.action === "openSidebar") {
    console.log("Received message to open sidebar");
    if (!document.getElementById("leetcode-sidebar")) {
      const sidebarDiv = document.createElement("div");
      sidebarDiv.id = "leetcode-sidebar";

      sidebarDiv.style.position = "fixed";
      sidebarDiv.style.top = "50px";
      sidebarDiv.style.right = "0px";
      sidebarDiv.style.backgroundColor = "#17171b";
      sidebarDiv.style.padding = "10px";
      sidebarDiv.style.zIndex = "9999";
      sidebarDiv.style.borderRadius = "10%";
      sidebarDiv.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";
      sidebarDiv.style.minWidth = "50px";
      sidebarDiv.style.minHeight = "50px";

      const iconUrl = browser.runtime.getURL("icons/brain-bulb.svg");

      sidebarDiv.innerHTML = `
        <button id="leetcode-btn" style="cursor: pointer; background: none; border: none;">
          <img src="${iconUrl}" alt="Sidebar Icon" width="24" height="24">
        </button>
      `;

      document.body.appendChild(sidebarDiv);
      sendResponse({ success: true, msg: "sucessfully created new element" });

      document
        .getElementById("leetcode-sidebar")
        .addEventListener("click", () => {
          console.log("Sending message to toggle sidebar...");
          browser.runtime
            .sendMessage({ action: "toggleSidebar" })
            .catch(console.error);
        });
    }
  }
});
