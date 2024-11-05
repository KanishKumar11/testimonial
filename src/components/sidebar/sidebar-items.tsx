"use client";

import { LayoutDashboard, FileText, Settings } from "lucide-react";
import { NavMain } from "@/components/nav-main";

type Board = {
  _id: string;
  name: string;
};

type SidebarItemsProps = {
  boards: Board[];
};

export function SidebarItems({ boards }: SidebarItemsProps) {
  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Testimonial Boards",
      url: "/dashboard/boards",
      icon: FileText,
      items: boards.map((board) => ({
        title: board.name,
        url: `/dashboard/boards/${board._id}`,
      })),
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return <NavMain items={navItems} />;
}
