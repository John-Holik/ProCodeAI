import { useTheme } from './ThemeContext';

export default function SettingsModal({ show, onClose }) {
  const { theme, setTheme, fontSize, setFontSize, bubbleColor, setBubbleColor } = useTheme();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-vscode.panel text-black dark:text-vscode.text p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Settings</h2>

        <div className="mb-4">
          <label className="block font-semibold">Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="mt-1 w-full p-2 rounded border">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Font Size</label>
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="mt-1 w-full p-2 rounded border">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Bubble Color</label>
          <input type="color" value={bubbleColor} onChange={(e) => setBubbleColor(e.target.value)} className="w-full h-10 rounded" />
        </div>

        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
      </div>
    </div>
  );
}