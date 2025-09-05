import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

function MessageCard({ message, setMessages }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are shure you want to delete this message?")) return;

    try {
      await api.delete(`/message/${id}`);
      setMessages((prev) => prev.filter((message) => message._id !== id)); // Update the state to remove the deleted message
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Error deleting message", error);
    }
  };

  return (
    <Link
      to={`/message/${message._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-300 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{message.title}</h3>
        <p className="card-content">{message.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(message.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs"
              onClick={(e) => handleDelete(e, message._id)}
            >
              <Trash2Icon className="size-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MessageCard;
