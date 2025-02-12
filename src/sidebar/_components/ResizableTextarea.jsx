import { Clipboard, Send } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../../components/ui/button";

const ResizableTextarea = ({ onChange, onKeyDown, value, handleSend }) => {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange({ target: { value: value + text } }); // ✅ Append to value instead of separate state
    } catch (err) {
      console.error("Clipboard read failed", err);
    }
  };

  return (
    <div className="w-full max-w-xl fixed bottom-0 flex flex-row justify-center items-center
    border border-yellow-300 rounded-lg px-3 py-2 resize-none focus:outline-none
    bg-gray-200 dark:bg-zinc-800 focus:ring-2 focus:ring-yellow-500">
      <Button variant="outline" onClick={handlePaste}
        className="dark:bg-zinc-900 bg-gray-200 dark:hover:bg-zinc-950 rounded-full px-[10px] py-4">
        <Clipboard />
      </Button>
      <TextareaAutosize
        minRows={1}
        maxRows={6}
        value={value} // ✅ Always use the controlled value
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full px-3 py-2 resize-none focus:outline-none bg-transparent text-sm
        dark:text-gray-200 font-montserrat"
        placeholder="Type or paste your code here..."
      />
      <Button variant="outline" onClick={handleSend}
        className="dark:bg-zinc-900 bg-gray-200 dark:hover:bg-zinc-950 rounded-full px-[10px] py-4">
        <Send />
      </Button>
    </div>
  );
};


export default ResizableTextarea;
