import { useTheme } from "../../components/theme-provider";
import { useMemo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope, dark, stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";


const RandomWelcomeText = [
  "🔥 Ready to crack some coding challenges? Let’s solve it together!",
  "🚀 Think. Code. Optimize. What’s your next problem to solve?",
  "🧠 Every problem has a solution. Let’s find yours!"
]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getRandomText = () => {
  const randomIndex = getRandomInt(RandomWelcomeText.length);
  return RandomWelcomeText[randomIndex];
}

const MessageComponent = ({ msg, index, messageRef }) => {
  const randomMessage = useMemo(() => getRandomText(), []);
  function getThumbnail(url) {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url?.match(youtubeRegex);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : `https://www.google.com/s2/favicons?domain=${new URL(url)?.hostname}`;
  }

  // const validTestCases = (msg?.text?.test_cases ?? []).filter(
  //   (test) => test?.input && (test?.expected_output || test?.output)
  // );

  const { theme } = useTheme()

  return (
    <div ref={messageRef}
      className={`w-full font-montserrat p-4 text-sm break-words rounded-lg ${msg.role === "user"
        ? "bg-yellow-400 text-white rounded-br-none"
        : "dark:bg-zinc-800 bg-gray-200 dark:text-gray-200 rounded-bl-none"
        }`}
    >
      {msg.role === "user" && <p>{msg?.text}</p>}
      {msg.role === "error" && <p className="bg-red-500 p-2">{msg?.text}</p>}
      {msg.role === "bot" && index === 0 && <p> {randomMessage} </p>}

      {msg.role === "bot" && index > 0 && (
        <div className="flex flex-col space-y-3">
          {/* Title */}
          <h6 className="font-semibold text-lg">🚀 {msg.text?.title}</h6>

          {/* Problem Statement */}
          <p className="font-medium">🧩 {msg.text?.problem_statement}</p>

          {/* Difficulty */}
          <p className="font-normal">⚙️ Difficulty: {msg.text?.difficulty}</p>

          {/* Best Practices */}
          {msg.text?.best_practices?.length > 0 && (
            <div>
              <h6 className="font-semibold mt-2">✅ Best Practices:</h6>
              <ul className="list-disc pl-5">
                {(msg.text.best_practices ?? []).map((practice, i) => (
                  <li key={i}>{practice}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Complete Code */}
          {msg.text?.completeCode && (
            <div className="dark:bg-gray-900 rounded-lg p-2 overflow-x-auto">
              <SyntaxHighlighter style={theme === "dark" ? anOldHope : stackoverflowLight}>
                {msg.text?.completeCode}
              </SyntaxHighlighter>
            </div>
          )}

          {/* Pitfalls */}
          {msg.text?.pitfalls?.length > 0 && (
            <div>
              <h6 className="font-semibold mt-2">❌ Common Pitfalls:</h6>
              <ul className="list-disc pl-5">
                {(msg.text?.pitfalls ?? []).map((pitfall, i) => (
                  <li key={i}>{pitfall}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps (Fixed Alignment & Overflow) */}
          {msg.text?.steps?.map((step, i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-md space-y-2 w-full"
            >
              <h6 className="font-semibold text-lg text-yellow-600">🔢 {step?.step}</h6>
              <p className="font-normal">
                <span className="font-semibold">📌 Description:</span> {step?.description}
              </p>
              <p className="font-normal">
                <span className="font-semibold">📝 Explanation:</span> {step?.explanation}
              </p>
              <p className="font-normal">
                <span className="font-semibold">🛠️ Best Practices:</span> {step?.best_practices}
              </p>
              <p className="font-normal">
                <span className="font-semibold">🚫 Pitfalls:</span> {step?.pitfalls}
              </p>
              <p className="font-normal">
                <span className="font-semibold">{step?.test_cases && `🧪 Test Cases:`}</span> {step?.test_cases}
              </p>
              {step?.code && (
                <div className="dark:bg-gray-900 p-2 rounded-lg overflow-x-auto">
                  <h4 className="font-semibold text-red-500">📝 Code:</h4>
                  <SyntaxHighlighter style={theme === "dark" ? anOldHope : stackoverflowLight}>{step?.code}</SyntaxHighlighter>
                </div>
              )}
            </div>
          ))}

          {/* Test Cases */}
          {/* {validTestCases?.length > 0 && (
            <div>
              <h6 className="font-semibold mt-2">🧪 Test Cases:</h6>
              <ul className="list-disc pl-5">
                {(validTestCases ?? []).map((test, i) => (
                  <li key={i}>
                    <strong>Input:</strong> {test?.input}
                    <br />
                    <strong>Expected Output:</strong> {test?.expected_output || test?.output}
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {/* Relevant Links */}
          {msg?.text?.relevant_links?.length > 0 && (
            <div>
              <h6 className="font-semibold mt-2">📺 Watch on YouTube & Read Blogs:</h6>
              <div className="space-y-4">
                {(msg.text?.relevant_links ?? []).map((video, i) => (
                  <div key={i} className="dark:bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
                    <img
                      className="rounded w-16 h-16 object-cover"
                      src={getThumbnail(video)}
                      alt="Thumbnail"
                    />
                    <a
                      href={video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline break-all"
                    >
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
