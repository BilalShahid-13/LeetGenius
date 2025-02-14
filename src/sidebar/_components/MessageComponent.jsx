import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope, dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const MessageComponent = ({ msg, index }) => {
  function getThumbnail(url) {
    // Check if it's a YouTube link
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(youtubeRegex);

    if (match) {
      // Extract video ID and return YouTube thumbnail
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    } else {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}`;
    }
  }
  return (
    <div
      className={`w-full font-montserrat p-2 text-sm break-words ${msg.role === "user"
        ? "bg-yellow-500 text-white rounded-br-none rounded-lg"
        : "dark:bg-zinc-800 bg-gray-200 dark:text-gray-200 rounded-bl-none rounded-lg"
        }`}
    >
      {msg.role === "user" && <p>{msg?.text}</p>}
      {msg.role === "error" && <p className="bg-red-500">{msg?.text}</p>}
      {msg.role === "bot" && index === 0 && <p> Hello! How can I help you?</p>}


      {msg.role === "bot" && index > 0 && (
        <div className="flex flex-col justify-start items-start gap-2">
          {/* Title */}
          <h6 className="font-semibold text-lg">🚀 {msg.text?.title}</h6>

          {/* Problem Statement */}
          <p className="font-medium">🧩 {msg.text?.problem_statement}</p>
          {/* difficulty */}
          <p className="font-normal">⚙️ Difficulty: {msg.text?.difficulty}</p>

          {/* Best Practices */}
          {msg.text?.best_practices?.length > 0 && (
            <div>
              <h6 className="font-semibold mt-2">✅ Best Practices:</h6>
              <ul className="list-disc pl-4">
                {msg?.text?.best_practices?.map((practice, i) => (
                  <li key={i}>{practice}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Complete Code */}
          {msg.text?.completeCode && (
            <div className="bg-gray-900 rounded-lg w-full overflow-x-auto">
              <SyntaxHighlighter style={dark}>
                {msg.text?.completeCode}
              </SyntaxHighlighter>
            </div>
          )}

          {/* Pitfalls */}
          {msg.text?.pitfalls?.length > 0 && (
            <div>
              <h6 className="font-semibold mt-2">❌ Common Pitfalls:</h6>
              <ul className="list-disc pl-4">
                {msg.text?.pitfalls?.map((pitfall, i) => (
                  <li key={i}>{pitfall}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {msg.text?.steps?.map((step, i) => (
            <div
              key={i}
              className="flex flex-col justify-start items-start p-2 border-l-4 border-yellow-500"
            >
              <h6 className="font-semibold">{step?.step} 🔢</h6>
              <p className="font-normal">📌
                <span className="font-semibold">Description:&nbsp;</span>
                {step?.description}
              </p>
              <p className="font-normal">
                <span className="font-semibold">📝 Explanation:&nbsp;</span>
                {step?.explanation}
              </p>
              <p className="font-normal">
                <span className="font-semibold">🛠️ Best Practices:&nbsp;</span>
                {step?.best_practices}
              </p>
              <p className="font-normal">
                <span className="font-semibold">🚫 Pitfalls:&nbsp;</span>
                {step?.pitfalls}
              </p>
              <p className="font-normal">
                <span className="font-semibold">🧪 Test Cases:&nbsp;</span>
                {step?.test_cases}
              </p>
              {step?.code && (
                <div
                className="bg-gray-900 rounded-lg overflow-x-scroll">
                  <span className="font-semibold">📝 Code: </span>
                  <SyntaxHighlighter style={anOldHope}>
                    {step?.code}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ))}

          {/* test cases */}
          {msg.text?.test_cases?.length > 0 && (
            <div>
              <h6 className="font-semibold mt-2">🧪 Test Cases:</h6>
              <ul className="list-disc pl-4">
                {msg.text?.test_cases?.map((test, i) => (
                  <ul key={i}>
                    <li>Input: {test?.input}</li>
                    <li>Expected Output: {test?.expected_output}</li>
                  </ul>
                ))}
              </ul>
            </div>
          )}

          {msg?.text?.relevant_links?.length > 0 && (
            <div>
              <h6 className="font-semibold mt-2">📺 Watch on YouTube & Read Blogs:</h6>
              <div className="space-y-4"> {/* Adds spacing between items */}
                {msg.text?.relevant_links.map((video, i) => (
                  <div key={i} className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
                    <img className="rounded"
                      src={getThumbnail(video)} alt="Thumbnail" />
                    <a href={video} target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline break-all">
                      {video}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default MessageComponent;