import { useEffect, useRef, useState } from 'react';
import { GridPatternDemo } from '../components/GridPatternDemo';
import { BoxReveal } from '../components/magicui/box-reveal';
import { ShinyButton } from '../components/magicui/shiny-button';
import { SparklesText } from '../components/magicui/sparkles-text';
import { TypingAnimation } from '../components/magicui/typing-animation';
import ChatBox from './_components/ChatBox';


const randomizeText = [
  {
    headline: "Welcome to LeetGenius!",
    des: "🚀 Your AI-powered coding assistant for smarter problem-solving!"
  },
  {
    headline: "Struggling with LeetCode?",
    des: "Let LeetGenius guide you with AI-driven insights!"
  },
  {
    headline: "Code smarter, not harder!",
    des: "LeetGenius is here to boost your problem-solving skills."
  },
];

const App = () => {
  const [heroText, setHeroText] = useState({ headline: '', des: '' });
  const headline = useRef();
  const des = useRef();
  const span = useRef();

  useEffect(() => {
    const randomIndex = getRandomInt(randomizeText.length);
    setHeroText(randomizeText[randomIndex]); // Now both headline and des are from the same index
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const color = {
    first: '#fef08a', second: '#facc15'
  }
  async function handleActivated(activeInfo) {
    try {
      const activeTab = await browser.tabs.get(activeInfo.tabId);
      if (activeTab.url && activeTab.url.includes("leetcode.com")) {
        console.log("LeetCode detected, opening sidebar...");
        setIsOnLeetCode(true)
      } else {
        setIsOnLeetCode(false)
      }
    } catch (error) {
      console.error("Error handling tab activation:", error);
    }
  }

  // Add listener for tab activation
  browser.tabs.onActivated.addListener(handleActivated);
  browser.tabs.onUpdated.addListener(handleActivated);

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleSidebar") {
      console.log("Toggling sidebar from background script...");

      browser.sidebarAction.toggle().catch((error) => {
        console.error("Error toggling sidebar:", error);
      });

      sendResponse({ status: "Sidebar toggled" });
    }
    return true; // Keeps the listener active
  });

  const [language, setLanguage] = useState("Loading...");
  const [isOnLeetCode, setIsOnLeetCode] = useState(false);
  useEffect(() => {
    const fetchLanguage = async () => {
      const data = await browser.storage.local.get("selectedLanguage");
      const sidebar = await browser.storage.local.get("toggleSidebar");
      console.log(sidebar);
      setLanguage(data.selectedLanguage || "Not detected");
    };

    fetchLanguage(); // Fetch initially

    // Listen for storage changes
    const handleStorageChange = (changes) => {
      if (changes.selectedLanguage) {
        setLanguage(changes.selectedLanguage.newValue || "Not detected");
      }
    };
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      if (tabs.length > 0) {
        fetchLanguage(); // Ensure language is fetched when the active tab changes
      }
    });
    browser.storage.onChanged.addListener(handleStorageChange);
    browser.tabs.onUpdated.addListener(() => fetchLanguage());
    browser.tabs.onActivated.addListener(() => fetchLanguage());

    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange);
      browser.tabs.onUpdated.removeListener(() => fetchLanguage());
      browser.tabs.onActivated.removeListener(() => fetchLanguage());

    };
  }, []);

  useEffect(() => {
    setIsOnLeetCode(window.location.href.includes("leetcode.com"));
  }, [window.location.href.includes("leetcode.com")]);

  const checkTabUrl = async () => {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (tabs.length > 0 && tabs[0].url.includes("leetcode.com")) {
        console.log('LeetCode detected, opening sidebar...');
        setIsOnLeetCode(true);
      } else {
        setIsOnLeetCode(false);
      }
    } catch (error) {
      console.error("Error fetching tab URL:", error);
    }
  };


  // Call this function when clicking the link
  const handleLinkClick = () => {
    setTimeout(() => {
      checkTabUrl();
    }, 3000); // Delay to allow LeetCode page to load
  };


  return (
    <>
      <GridPatternDemo>
        <div className='flex flex-col justify-center items-center gap-2 font-montserrat'>
          {/* <span>Ai Assistant</span> */}
          <SparklesText ref={span} text={'Ai Assistant'} colors={color} sparklesCount={4} className={'text-sm font-thin font-montserrat'} />
          <div className="flex flex-row items-center justify-center gap-2 " id='hero'>
            <img src="icons/brain-bulb.svg" alt="icon img" width={20} height={20} />
            <BoxReveal boxColor={"#eab308"} duration={0.5}>
              <h2 ref={headline} className='text-2xl font-montserrat font-semibold text-center text-yellow-400 capitalize'>{heroText.headline}</h2>
            </BoxReveal>
          </div>
          <TypingAnimation ref={des} className='text-base font-montserrat text-center px-4'>{heroText.des}</TypingAnimation>
        </div>

        {/* leetcode btn */}
        <div className="p-4 text-center">
          {isOnLeetCode ?
            <h4 className="mt-2 text-sm font-montserrat font-light
           dark:bg-yellow-500 bg-yellow-400 p-2 rounded-md">
              {language}
            </h4>
            :
            <a href="https://leetcode.com/problems/" onClick={handleLinkClick}
              target="_blank" rel="noopener noreferrer">
              <ShinyButton className={'text-zinc-600 text-xs font-montserrat'}>
                🚀 Ready to code? <br />
                <span className="underline font-montserrat">Visit LeetCode
                </span> to detect your language!
              </ShinyButton>
            </a>
          }
        </div>

        {/* <ResizableTextarea /> */}
        <ChatBox lang={language} />

      </GridPatternDemo >
    </>

  );
}

export default App;
