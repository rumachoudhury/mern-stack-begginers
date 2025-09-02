import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router";
// import { Message } from "../../node_modules/esbuild/lib/main.d";

export default function Navbar() {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className=" mx-auto max-w-7xl px-4 p-4">
        <div className="flex items-center justify-between gap-1 lg:gap-0">
          <h1 className="text-4xl font-bold text-primary font-serif ">MyApp</h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <Plus className="size-5" />
              <span>New Message</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
