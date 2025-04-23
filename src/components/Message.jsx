import { useTheme } from './ThemeContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

function CodeBlock({ inline, className, children, ...props }) {
  const [copied, setCopied] = useState(false);

  const languageRegex = /language-(\w+)/;
  const match = languageRegex.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');
  const detectedLanguage = match ? match[1] : 'javascript';

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Inline code (no toolbar or copy)
  if (inline || !match) {
    return (
      <code className="bg-gray-300 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
        {children}
      </code>
    );
  }

  return (
    <div className="mb-4 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex justify-between items-center px-3 py-1 bg-emerald-600 text-white text-xs font-mono">
        <span>{detectedLanguage}</span>
        <button
          onClick={handleCopy}
          className="hover:text-gray-200 transition"
        >
          {copied ? '✅ Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code Block */}
      <SyntaxHighlighter
        style={oneDark}
        language={detectedLanguage}
        PreTag="div"
        className="text-sm"
        {...props}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
}


// Main Message Component
export default function Message({ role, content }) {
  const { fontSize, bubbleColor } = useTheme();

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }[fontSize];

  const isUser = role === 'user';

  return (
    <div className={`my-2 w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          px-4 py-2 rounded-lg max-w-[75%] ${fontSizeClass}
          ${isUser ? '' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'}
        `}
        style={{ backgroundColor: isUser ? bubbleColor : undefined }}
      >
        <ReactMarkdown components={{ code: CodeBlock }}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

