# <img src="public/icons/brain-bulb.svg" alt="LeetGenius Logo" width="40"> **LeetGenius – AI-Powered Firefox Add-on for LeetCode**

LeetGenius is an **AI-powered coding assistant** designed to help developers solve **LeetCode problems** efficiently and effectively. It provides **accurate, well-explained code solutions, helpful hints, test cases**, and learning resources to improve problem-solving skills.

## **Features**

- AI ChatBot for LeetCode Hints & Explanations\*\*
- Step-by-Step Guides with Code, Best Practices & Pitfalls\*\*
- One-Click Clipboard Copy for Code Snippets\*\*
- Animated & Interactive UI with Framer Motion & GSAP\*\*
- Custom Resizable Textarea for Writing Code Easily\*\*
- Further Learning Suggestions (YouTube Videos & Blogs)\*\*

## **How LeetGenius Works**

LeetGenius follows a structured approach to solving problems:

- Provides a **step-by-step guide** to solve coding challenges.
- Explains **code with best practices and common pitfalls** to avoid.
- Recommends **test cases to validate solutions**.
- Suggests **YouTube videos and blogs** for further learning.

## **Tech Stack**

- **Frontend:** React (Manifest V3)
- **Animations:** Framer Motion, GSAP
- **UI Components:** Tailwind CSS, Lucide React
- **Browser API:** WebExtensions (Firefox)

## **Installation**

1. Clone the repository:
   ```sh
   git clone https://github.com/BilalShahid-13/LeetGenius.git
   ```
2. Navigate to the extension folder:
   ```sh
   cd LeetGenius
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Build the extension:
   ```sh
   npm run build
   ```
5. Load the extension into **Firefox:**
   - Open **about:debugging** in Firefox.
   - Click **"This Firefox"** > **"Load Temporary Add-on"**.
   - Select the **`manifest.json`** file inside the build folder.

## **AI Instructions (How LeetGenius Thinks)**

LeetGenius is designed to be an expert coding assistant. It follows these principles:

- Prioritizes clarity, correctness, and best practices.
- Encourages learning & understanding, not just copying code.
- Explains solutions with step-by-step guides, code examples & pitfalls.
- Suggests test cases, best practices, and additional resources.

### **Response Format**

LeetGenius provides structured responses with the following parameters:

- **Required:** `"step"`, `"description"`, `"explanation"`, `"code"`, `"further_learning"`
- **Optional:** `"best_practices"`, `"pitfalls"`, `"test_cases"`

### **Who Created LeetGenius?**

LeetGenius was created by **Bilal Shahid**.

- 🌍 **Portfolio:** [bilalshahid.vercel.app](https://bilalshahid.vercel.app/)
- 💼 **LinkedIn:** [linkedin.com/in/codingwithbilal-pro](https://www.linkedin.com/in/codingwithbilal-pro/)
- 🛠 **GitHub:** [github.com/BilalShahid-13](https://github.com/BilalShahid-13/)

## **Contributing**

Want to improve **LeetGenius**? Feel free to submit pull requests or open issues! 🚀

## **License**

This project is open-source and available under the **MIT License**.
