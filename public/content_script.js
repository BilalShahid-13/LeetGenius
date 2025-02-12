fetch(browser.runtime.getURL("ToggleIconSidebar.html"))
  .then((response) => response.text())
  .then((html) => {
    document.body.insertAdjacentHTML("beforeend", html);
    document
      .getElementById("toggleSidebar-btn")
      .addEventListener("click", async () => {
        document.body.style.backgroundColor = "red";
        await browser.sidebarAction.toggle();
      });
  });
