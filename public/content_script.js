// fetch(browser.runtime.getURL("ToggleIconSidebar.html"))
//   .then((response) => response.text())
//   .then((html) => {
//     document.body.insertAdjacentHTML("beforeend", html);
//   });

// Function to get the selected language from LeetCode
function getSelectedLanguage() {
  // "position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(712px, 122px);"
  const language = document.getElementsByClassName(
    "rounded items-center whitespace-nowrap focus:outline-none inline-flex bg-transparent dark:bg-dark-transparent text-text-secondary dark:text-text-secondary active:bg-transparent dark:active:bg-dark-transparent hover:bg-fill-secondary dark:hover:bg-fill-secondary px-1.5 py-0.5 text-sm font-normal group"
  )[0].textContent;
  return language ? language.trim() : "Language not found";
}

// Send the selected language to your extension sidebar
function sendLanguageToSidebar() {
  const language = getSelectedLanguage();
  browser.runtime.sendMessage({ action: "updateLanguage", language });
}

setInterval(sendLanguageToSidebar, 3000);
