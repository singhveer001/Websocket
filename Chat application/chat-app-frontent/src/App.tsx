import { useEffect, useRef, useState } from 'react'

function App() {
  const [messages, setMessages] = useState(["Hello There"])
  const [msg, setMsg] = useState("");
  //@ts-ignore
  const wsRef = useRef();  

  useEffect(()=> {
    const ws = new WebSocket("ws://localhost:8080")

    ws.onmessage = (event) => {
          setMessages(m => [...m, event.data]);
    }
    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type : "join",
        payload : {
          roomId : "red"
        }
      }))
    }

    return () => {
      ws.close()
    }
  },[])

  return (
    <div className='h-screen bg-white text-black'>
      <div className='h-[85vh] overflow-y-auto'>
        {messages.map((message, index) => (
          <div className='m-8' key={index}>
            <span className='bg-gray-400 text-black rounded p-2'>
              {message}
            </span>
          </div>
        ))}
      </div>
      <div className='w-full bg-white flex border-t border-gray-300'>
        <input
          value={msg}
          onChange={ (e) => setMsg(e.target.value)}
          type="text"
          placeholder='Enter your chat'
          className='flex-1 text-black p-4 m-4 bg-gray-100 rounded'
        />
        <button onClick={()=> {
          if (!msg?.trim()) return;
          //@ts-ignore
          wsRef.current.send(JSON.stringify({
            type : "chat",
            payload : {
              message : msg
            }
          }))
          setMsg("");
        }} className='bg-blue-600 text-white p-4 m-4 rounded'>Send Message</button>
      </div>
    </div>

  )
}

export default App
