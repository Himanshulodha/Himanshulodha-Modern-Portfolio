import { Calistoga } from "next/font/google";

const calistoga = Calistoga({
    variable: "--font-calistoga",
    weight: '400',
    subsets: ['latin'],
});

export default function About() {
    return (
        <div className="max-w-3xl m-auto p-4 pt-8 pb-8">
            <h1 className={`font-bold text-5xl dark:text-white text-black mb-8 ${calistoga.className}`}>About Me</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Hi, I’m Himanshu Lodha, a Data Visionary and AI Innovator driven by the belief that data is the new form of imagination.<br/>
                To me, every dataset tells a story — one that, when decoded, can redefine how humanity interacts with technology. I don’t just analyze information; I design intelligent ecosystems where data evolves into knowledge, and knowledge into decision-making power.<br/><br/>
                I graduated with a B.Tech in Artificial Intelligence and Data Science, where my fascination for algorithms transformed into a purpose — to create systems that learn, adapt, and elevate human capability. My journey has been fueled by curiosity, experimentation, and a relentless desire to push beyond the boundaries of what AI can do.<br/><br/>
                I see myself not merely as a developer or engineer, but as a data architect for the future — someone building the digital frameworks that will shape how the world thinks, learns, and connects.
            </p>
            <h2 className="text-2xl font-semibold mb-2 mt-8">⚙️ What I Create</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">My projects are born from a blend of logic and vision — using AI not as a tool, but as a collaborator.</p>
            <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 mb-6">
                <li><b>🧠 Intelligent Systems:</b> Fine-tuned open-weight LLMs with LoRA/QLoRA to enhance reasoning on domain-specific command tasks. Built RAG-based Knowledge Assistant APIs with LangChain, enabling contextual understanding across vast knowledge bases.</li>
                <li><b>🔍 Predictive Models:</b> Engineered a Sales Forecasting Engine with Flask, Python, and ML that achieved 90% accuracy, optimizing retail analytics workflows.</li>
                <li><b>🗣️ Conversational AI:</b> Created a Voice Bot Web App integrating ChatGPT and ElevenLabs TTS, giving technology a human-like voice and empathy.</li>
                <li><b>🌐 Web Intelligence:</b> Designed and deployed full-stack applications with React, Next.js, and Django, merging intelligent backends with modern, fluid interfaces.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2 mt-8">🚀 Vision & Philosophy</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                The future isn’t written in code; it’s written in data — and those who understand it will shape the world.<br/>
                I envision a future where:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Machines don’t just predict but perceive.</li>
                <li>Data pipelines are not static scripts, but living networks that adapt in real time.</li>
                <li>Human creativity and artificial intelligence merge seamlessly — building systems that think with us, not for us.</li>
            </ul>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                My mission is to turn that vision into reality — by designing AI that is responsible, interpretable, and alive with purpose.
            </p>
            <h2 className="text-2xl font-semibold mb-2 mt-8">🧩 Technical Universe</h2>
            <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 mb-6">
                <li><b>Programming Languages:</b> Python, C++, SQL</li>
                <li><b>Frameworks & Tools:</b> Flask, Django</li>
                <li><b>Machine Learning & AI:</b> Scikit-learn, TensorFlow, PyTorch, Hugging Face, LangChain</li>
                <li><b>Data Engineering:</b> Pandas, NumPy, Data Cleaning, Feature Engineering</li>
                <li><b>Generative AI:</b> LLMs, Prompt Engineering, LoRA/QLoRA Fine-Tuning</li>
                <li><b>Cloud & DevOps:</b> AWS, GitHub Actions, Docker</li>
                <li><b>Databases:</b> MySQL, MongoDB, Pinecone, ChromaDB, FAISS</li>
                <li><b>Visualization:</b> Matplotlib, Seaborn, Plotly</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2 mt-8">🎓 Education</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                <b>Bachelor of Technology (B.Tech)</b><br/>
                Major: Artificial Intelligence and Data Science<br/>
                Graduated: 2025<br/>
                Throughout my degree, I focused on integrating theory with application — transforming classroom concepts into real-world solutions powered by AI.
            </p>
            <h2 className="text-2xl font-semibold mb-2 mt-8">🌠 My Ethos</h2>
            <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 mb-6">
                <li><b>Learn Relentlessly:</b> Technology never stops evolving — and neither do I.</li>
                <li><b>Build Boldly:</b> Every idea deserves to be built, tested, and reimagined.</li>
                <li><b>Think Humanly:</b> Data may be binary, but innovation is deeply human.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2 mt-8">💻 Coding Profiles</h2>
            <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 mb-6">
                <li>LeetCode: <a href="https://leetcode.com/u/Lodha11/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">leetcode.com/himanshulodha</a></li>
                <li>HackerRank: <a href="https://www.hackerrank.com/profile/himanshulodha331" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">hackerrank.com/profile/himanshulodha331</a></li>
                <li>Codeforces: <a href="https://codeforces.com/profile/Lodha11" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">codeforces.com/profile/Lodha11</a></li>
                <li>GeeksforGeeks: <a href="https://www.geeksforgeeks.org/user/himanshulodha3302/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">geeksforgeeks.org/user/himanshulodha3302</a></li>
            </ul>

            <h2 className="text-2xl font-semibold mb-2 mt-8">🏆 Achievements</h2>
            <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 mb-6">
                <li>Achieved a max rating of 1514 on LeetCode, solving 550+ problems and earning 11 badges.</li>
                <li>Solved 500+ problems and earned 5★ badges on HackerRank.</li>
                <li>Completed Large Language Models (LLMs) certification from IIT Madras.</li>
                <li>Secured 4th position at the Rajasthan IT Day Hackathon (SIH).</li>
                <li>Coursera Certified in Data Science and Machine Learning.</li>
                <li>HackerRank Certified in Python and SQL.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-2 mt-8">💬 Let’s Connect</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">📧 Email: <a href="mailto:himanshulodha@gmail.com" className="text-blue-600 dark:text-blue-400 underline">himanshulodha@gmail.com</a></p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">💼 LinkedIn: <a href="https://www.linkedin.com/in/himanshu-lodha-2nd-350b92216/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">linkedin.com/in/himanshulodha</a></p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">💻 GitHub: <a href="https://github.com/Himanshulodha" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">github.com/himanshulodha</a></p>
        </div>
    );
}
