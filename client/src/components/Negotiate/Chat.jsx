import React from 'react'
import './chat.css'

export default function Chat() {
  return (
    <div className='chatui'>
      <nav>
        <header>
            <h1>person chatting with</h1>
        </header>
      </nav>
      <main className='chats-display'>
        <h1>chats display</h1>
      </main>
      <footer className='chatbar'>
        <textarea name="negotiate" id="chat" placeholder='enter text'></textarea>
        <button>Send</button>
      </footer>
    </div>
  )
}
