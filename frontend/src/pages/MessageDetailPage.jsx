//
// ---
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const MessageDetailPage = () => {
  const [message, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get(`/message/${id}`);
        setMessages(res.data);
      } catch (error) {
        console.log("Error in fetching message", error);
        toast.error("Failed to fetch the message");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      await api.delete(`/message/${id}`);
      toast.success("Message deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the message:", error);
      toast.error("Failed to delete message");
    }
  };

  const handleSave = async () => {
    if (!message.title.trim() || !message.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/message/${id}`, message);
      toast.success("Message updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the message:", error);
      toast.error("Failed to update message");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Messages
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Message
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Message title"
                  className="input input-bordered"
                  value={message.title}
                  onChange={(e) =>
                    setMessages({ ...message, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your message here..."
                  className="textarea textarea-bordered h-32"
                  value={message.content}
                  onChange={(e) =>
                    setMessages({ ...message, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageDetailPage;
