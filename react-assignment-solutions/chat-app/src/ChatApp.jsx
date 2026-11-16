import { useState } from 'react';
import { Heart, Send, Smile } from 'lucide-react';

const USER_LIST = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin'];
const initialMessages = [
  { id: 1, user: 'Alan', text: 'Hey team! Welcome to the chat.', likes: 2 },
  { id: 2, user: 'Carol', text: 'Thanks, great to be here!', likes: 1 },
];

export default function ChatApp() {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState('');

  function sendMessage(event) {
    event.preventDefault();
    const message = text.trim();
    if (!message) return;
    const user = USER_LIST[Math.floor(Math.random() * USER_LIST.length)];
    setMessages(current => [...current, { id: `${Date.now()}-${Math.random()}`, user, text: message, likes: 0 }]);
    setText('');
  }

  function likeMessage(id) {
    setMessages(current => current.map(message => message.id === id ? { ...message, likes: message.likes + 1 } : message));
  }

  return <main className="chat-shell">
    <header className="chat-header"><div className="header-mark">✦</div><div><h1>Team chat</h1><p>Share ideas with your team</p></div><span className="online"><i /> Live room</span></header>
    <section className="message-list" aria-live="polite">
      {messages.map(message => <article className="message" key={message.id}>
        <div className={`avatar avatar-${message.user.toLowerCase()}`}>{message.user[0]}</div>
        <div className="message-content"><div className="message-meta"><strong>{message.user}</strong><span>{message.id <= 2 ? 'Earlier' : 'Just now'}</span></div><p>{message.text}</p></div>
        <button className="like-button" onClick={() => likeMessage(message.id)} aria-label={`Like message by ${message.user}`} title="Like"><Heart size={17} /><span>{message.likes}</span></button>
      </article>)}
      {messages.length === 0 && <div className="empty-state">No messages yet. Start the conversation!</div>}
    </section>
    <form className="composer" onSubmit={sendMessage}><label className="sr-only" htmlFor="message">Write a message</label><input id="message" value={text} onChange={e => setText(e.target.value)} placeholder="Write a message..." maxLength={500} /><span className="composer-icon"><Smile size={20}/></span><button type="submit" disabled={!text.trim()}><Send size={17}/> Send</button></form>
    <p className="hint">Press Enter to send · Messages are assigned to a random team member</p>
  </main>;
}
