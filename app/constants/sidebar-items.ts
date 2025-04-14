import { Contact, Share2 } from "lucide-react";

export const sidebarItems = [
  {
    title: "Home",
    items: [
      {
        title: "Friends",
        url: "/profile/friends",
        icon: Contact,
      },
      {
        title: "Shared Games",
        url: "/profile/shared-games",
        icon: Share2,
      },
    ],
  },
];
