import { useEffect, useRef, useState } from 'react';
import { GridPatternDemo } from '../components/GridPatternDemo';
import { BoxReveal } from '../components/magicui/box-reveal';
import { SparklesText } from '../components/magicui/sparkles-text';
import { TypingAnimation } from '../components/magicui/typing-animation';
import ResizableTextarea from './_components/ResizableTextarea';
import { createRoot } from 'react-dom/client';
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
      console.log("Active Tab URL:", activeTab.url);
      console.log("Active Tab ID:", activeTab.id);

      if (activeTab.url && activeTab.url.includes("leetcode.com")) {
        console.log("LeetCode detected, opening sidebar...");

        // Send message to content script
        browser.tabs.sendMessage(activeTab.id, { action: "openSidebar" })
          .then((res) => { console.log("Response from content script:", res); })
          .catch((err) => { console.error("Error sending message:", err); });
      } else {
        console.log("Not a LeetCode tab.");
      }
    } catch (error) {
      console.error("Error handling tab activation:", error);
    }
  }

  // Add listener for tab activation
  browser.tabs.onActivated.addListener(handleActivated);

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

  return (
    <>
      <GridPatternDemo>
        <div className='flex flex-col justify-center items-center gap-2 font-montserrat'>
          {/* <span>Ai Assistant</span> */}
          <SparklesText ref={span} text={'Ai Assistant'} colors={color} sparklesCount={4} className={'text-sm font-thin font-montserrat'} />
          <div className="flex flex-row items-center justify-center gap-2 " id='hero'>
            <img src="icons/brain-bulb.svg" alt="icon img" width={20} height={20} />
            <BoxReveal boxColor={"#eab308"} duration={0.5}>
              <h2 ref={headline} className='text-2xl font-semibold text-center text-yellow-400 capitalize'>{heroText.headline}</h2>
            </BoxReveal>
          </div>
          <TypingAnimation ref={des} className='text-lg text-center px-4'>{heroText.des}</TypingAnimation>
          {/* <h6 className='text-lg text-center px-4'>{heroText.des}</h6> */}
        </div>

        {/* <ResizableTextarea /> */}
        <ChatBox />
      </GridPatternDemo>
    </>

  );
}

export default App;
