"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {Home,User, PlusCircle,ClipboardList} from "lucide-react";
import { useState } from "react";


export default function Sidebar() {
  const pathname = usePathname();
  const [expanded,setExpanded]= useState(false);

  const linkClass = (path: string) =>
    `flex items-center gap-3 p-2 rounded transition-all 
     ${pathname === path ? "bg-gray-700 text-white" : "hover:bg-gray-700"}`;

  return (
    <aside className={`bg-gray-900 text-white h-screen fixed top-0 left-0 transition-all duration-300 overflow-y-auto ${expanded ? "w-60 p-6" : "w-20 p-4"}`}
    onMouseEnter={()=> setExpanded(true)}
    onMouseLeave={()=> setExpanded(false)}
    >
      {/*Logo*/}
      <h1 className={`font-bold mb-6 transition-opacity overflow overflow-hidden hidden ${expanded ? "text-3xl opacity-100" : "opacity-0 w-0 h-0"}
      `}>
        AI Assistent
      </h1>

    {/*Navigation */}
      <nav className="flex flex-col gap-4 p-4">
        <Link href="/" className={linkClass("/")}>
          {expanded && <span>Home</span>}
          {!expanded && <span className="text-sm">🏠</span>}
        </Link>

        <Link href="/dashboard" className={linkClass("/dashboard")}>
          {expanded && <span>Dashboard</span>}
          {!expanded && <span className="text-sm">📊</span>}
        </Link>

        <Link href="/Tasks" className={linkClass("/Tasks")}>
          {expanded && <span>Tasks</span>}
          {!expanded && <span className="text-sm">📝</span>}
        </Link>

        <Link href="/Notes" className={linkClass("/Notes")}>
          {expanded && <span>Notes</span>}
          {!expanded && <span className="text-sm">🗒️</span>}
        </Link>
        <Link href="/Calendar" className={linkClass("/Calendar")}>
          {expanded && <span>Calendar</span>}
          {!expanded && <span className="text-sm">📅</span>}
        </Link>
        <Link href="/FocusTimer" className={linkClass("/FocusTimer")}>
          {expanded && <span>FocusTimer</span>}
          {!expanded && <span className="text-sm">⏲️</span>}
        </Link>
        <Link href="/Profile" className={linkClass("/Profile")}>
          {expanded && <span>Profile</span>}
          {!expanded && <span className="text-sm">👤</span>}
        </Link>
      </nav>
    </aside>
  );
}
