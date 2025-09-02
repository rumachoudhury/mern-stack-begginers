import { ArrowLeftIcon, ArrowLeftRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
// import axios from "axios";
import api from "../lib/axios";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      await api.post("/message", {
        title,
        content,
      });
      toast.success("Message created successfully");
      navigate("/");
    } catch (error) {
      // toast.error("Error creating message", error);
      console.log("Error creating message", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're sending requests too quickly.", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Error creating message");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto p-4">
          <Link to={"/"} className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" />
            Back to Message
          </Link>

          <div className="card bg bg-base-100 glass">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Message</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter message title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Enter message content"
                    className="textarea textarea-bordered"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
