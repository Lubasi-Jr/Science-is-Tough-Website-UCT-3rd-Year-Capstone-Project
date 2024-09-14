import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../hooks/useAuth";

export default function Discussion() {
  const [message, setMessage] = useState(""); // stores msg being sent
  const [channel, setChannel] = useState(null); //  store reference to the real time channel
  const { user } = useAuth();
  const [messages, setMessages] = useState([]); // store a list of {student, msg}

  async function onSend(event) {
    event.preventDefault();

    await channel.publish({
      type: "broadcast",
      event: "message",
      payload: { message: message },
    });
    // setNewMessage('')

    // if (!channel.current || message.trim().length === 0) return;
    // channel.current.send({
    //   type: "broadcast",
    //   event: "message",
    //   payload: { message: { message, user } },
    // });
    setMessage("");
  }

  useEffect(() => {
    const channel = supabase.channel("messages");
    setChannel(channel);
    // channel.current = supabase.channel("discussion", {
    //   config: {
    //     broadcast: {
    //       self: true,
    //     },
    //   },
    // });

    channel.subscribe((message) => {
      console.log("Fetching messages: ", message);
      
      setMessages((prev) => [...prev, message.payload]);
    });
    // if (!channel.current) {

    // we broadcast the messages to the current client
    //   channel.current
    //     .on("broadcast", { event: "message" }, ({ payload }) => {
    //       setMessages((prev) => [...prev, payload.message]);
    //     })
    //     .subscribe();
    // }

    return () => {
      //   channel?.unsubscribe();
      //   channel.current = null;
    };
  }, []);

  const currentUserStyle = {
    backgroundColor: "red",
    padding: "10px",
  };
  const otherUserStyle = {
    backgroundColor: "green",
    padding: "10px",
  };

  return (
    <>
      <section className="chat-section">
        <h4>Discussion Forum</h4>

        <div className="chat-box">
          {messages.length > 0 &&
            messages.map((msg, i) => (
              <div
                key={i}
                // style={
                //   user.id === msg.user.id ? currentUserStyle : otherUserStyle
                // }
              >
                Message Thing: {msg}
                {/* <strong>{msg.user}</strong> <span>21 Sept 2024</span>
              <p>{msg.message}</p> */}
              </div>
            ))}
          <div className="chat-item">
            <strong>Student 2</strong> <span>21 Sept 2024</span>
            <p>I learned so much from this content.</p>
          </div>
          <div className="chat-item">
            <strong>Student 8</strong> <span>23 Sept 2024</span>
            <p>Me Too. Definitely engaging!!!</p>
          </div>
        </div>
        <form onSubmit={onSend}>
          <textarea
            type="text"
            placeholder="Type your message..."
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            //   onKeyUp={(e) => {
            //     if (e.key === "Enter") {
            //       onSend();
            //     }
            //   }}
          />
          <button type="submit" className="">
            Send
          </button>
        </form>
      </section>
    </>
  );
}
