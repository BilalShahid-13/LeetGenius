import { motion } from "framer-motion";
import { Clipboard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import ResizableTextarea from "./ResizableTextarea";
import gsap from "gsap";
import { run } from "../../../api/GET/gemini";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import MessageComponent from "./MessageComponent";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSend = async () => {
    if (!input.trim()) return;

    setHasUserTyped(true);
    setMessages([...messages, { role: "user", text: input }]);
    setInput('');

    try {
      setLoading(true);
      const response = await run(input)
      console.log(response);
      if (response) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: response }
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "error", text: "Something went wrong" }
      ])
      console.error('error', error);
    } finally {
      setLoading(false)
    }

  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // setInput((prev) => prev + text);
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
            className="mb-2 p-2 rounded-lg max-w-[90%] flex flex-col gap-1"
            style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start" }}
          >
            <div className="flex items-start justify-start gap-2">
              {msg.role === "bot" && (
                <img
                  src="icons/brain-bulb.svg"
                  width={30}
                  height={30}
                  className="bg-gray-950 p-2 rounded-full"
                  alt="AI icon"
                />
              )}
              <MessageComponent msg={msg} index={i} error={msg.text}/>
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
        onLoading={loading}
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
