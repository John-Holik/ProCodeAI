import { useTheme } from './ThemeContext';

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
        <p>{content}</p>
      </div>
    </div>
  );
}

