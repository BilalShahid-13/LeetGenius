import { motion } from "framer-motion";
import { Clipboard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import ResizableTextarea from "./ResizableTextarea";
import gsap from "gsap";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);
  const clipboardRef = useRef([]);
  const [clipboardToggler, setClipboardToggler] = useState(null); // 👈 Set null instead of false

  useEffect(() => {
    if (!hasUserTyped) return;

    const chatContainer = chatContainerRef.current;
    const isNearBottom =
      chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight;

    if (isNearBottom) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, hasUserTyped]);

  const handleSend = () => {
    if (!input.trim()) return;

    setHasUserTyped(true);
    setMessages([...messages, { role: "user", text: input }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "This is a sample AI response!" }
      ]);
    }, 1000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setInput((prev) => prev + text);
  };

  useEffect(() => {
    if (clipboardToggler !== null && clipboardRef.current[clipboardToggler]) {
      gsap.fromTo(
        clipboardRef.current[clipboardToggler],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power4.inOut' }
      );
    }
  }, [clipboardToggler]);

  return (
    <div ref={chatContainerRef} className="w-full mx-auto shadow-lg overflow-y-scroll">
      <div className="h-96 overflow-y-auto p-4 flex flex-col mb-8">
        {messages.map((msg, i) => (
          <motion.div
            key={i}

            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setClipboardToggler(i)}
            onMouseLeave={() => setClipboardToggler(null)}
            className="mb-2 p-2 rounded-lg max-w-[75%] flex flex-col gap-1"
            style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start" }}
          >
            <div className="flex items-center gap-2">
              {msg.role === "bot" && (
                <img
                  src="icons/brain-bulb.svg"
                  width={30}
                  height={30}
                  className="bg-gray-950 p-2 rounded-full"
                  alt="AI icon"
                />
              )}
              <code
                className={`font-montserrat p-2 text-sm break-words ${msg.role === "user"
                    ? "bg-yellow-500 text-white rounded-br-none rounded-lg"
                    : "dark:bg-zinc-800 bg-gray-200 dark:text-gray-200 rounded-bl-none rounded-lg"
                  }`}
              >
                {msg.text}
              </code>
            </div>

            {clipboardToggler === i && msg.role === "bot" && (
              <div className="w-full flex justify-start">
                <Button
                  ref={(el) => (clipboardRef.current[i] = el)}
                  variant="outline"
                  onClick={() => copyToClipboard(msg.text)}
                  className="dark:bg-zinc-900 bg-gray-200 dark:hover:bg-zinc-950 rounded-full px-[10px] py-4"
                >
                  <Clipboard size={17} />
                </Button>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <ResizableTextarea
        value={input}
        handleSend={handleSend}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
    </div>
  );
}
