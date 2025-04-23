import { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import ChatBox from './components/ChatBox';
import SettingsModal from './components/SettingsModule';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <ThemeProvider>
            <div className="min-h-screen flex bg-white dark:bg-vscode-bg text-black dark:text-vscode-text transition-colors duration-300"> {/* Sidebar */}
        <aside className="w-64 bg-gray-200 dark:bg-[#1b1b1b] p-4 shadow-md flex-shrink-0">
          <h2 className="text-lg font-bold mb-4">🗂 Previous Chats</h2>
          <ul className="space-y-2">
            <li className="hover:bg-gray-300 dark:hover:bg-[#2c2c2c] p-2 rounded cursor-pointer">Chat 1</li>
            <li className="hover:bg-gray-300 dark:hover:bg-[#2c2c2c] p-2 rounded cursor-pointer">Chat 2</li>
            <li className="hover:bg-gray-300 dark:hover:bg-[#2c2c2c] p-2 rounded cursor-pointer">Chat 3</li>
          </ul>
        </aside>

        {/* Main Chat Area */}
        <main className="flex flex-col flex-grow items-center justify-start p-4">
          <div className="w-[calc(100%-16rem)] max-w-screen-xl"> {/* Chatbox Size (Currently Custom 64px from sidebar) */}
            {/*Settings Button*/}
            <button 
              onClick={() => setShowSettings(true)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-vscode-panel hover:bg-[#3a3a3a] text-vscode-text rounded-full shadow transition"
              aria-label="Open settings"
            >
              ⚙️
            </button>

            <ChatBox />
            <SettingsModal show={showSettings} onClose={() => setShowSettings(false)} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;



