import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
// import axios from "axios";
import MessageCard from "../components/MessageCard";
import api from "../lib/axios";
// import rateLimit from "../../../backend/src/config/upstash";
import toast from "react-hot-toast";

function HomePage() {
  const [isRatelimited, setIsRatelimited] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/message"); //api(axiosInstance) from axios.js file
        console.log(res.data);
        setMessages(res.data.data);
        setIsRatelimited(false);
      } catch (error) {
        console.log("Error fetching messages");
        console.log(error.rseponse);
        if (error.response?.status === 429) {
          setIsRatelimited(true);
        } else {
          toast.error("Failed to load message");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRatelimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading messages...
          </div>
        )}

        {/* {messages.length === 0 && rateLimit && <MessagesNotFound />} */}
        {messages.length === 0 && !loading && <MessagesNotFound />}

        {messages.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((message) => (
              <MessageCard
                key={message._id}
                message={message}
                setMessages={setMessages} // Pass setMessages to allow deletion
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
