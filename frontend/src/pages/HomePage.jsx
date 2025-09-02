import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
// import axios from "axios";
import MessageCard from "../components/MessageCard";
import api from "../lib/axios";

function HomePage() {
  const [isRatelimited, setIsRatelimited] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/message"); //api(axiosInstance) from axios.js file
        setMessages(res.data.data);
        setIsRatelimited(false);
      } catch (error) {
        if (error.response?.status === 429) setIsRatelimited(true);
        else console.error(error);
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

        {messages.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((message) => (
              <MessageCard key={message._id} message={message} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
