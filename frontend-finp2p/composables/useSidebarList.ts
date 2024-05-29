export function useSidebarList() {
  const sidebarItems = [
    {
      isTitle: false,
      name: "Dashboard",
      icon: "heroicons:home-solid",
      link: "/app/",
      subItems: [],
    },
    {
      isTitle: false,
      name: "Utilizadores",
      link: "/app/utilizadores",
      icon: "heroicons:user-group-solid",
      subItems: [],
    },
    {
      isTitle: false,
      name: "Projectos",
      link: "/app/projectos",
      icon: "heroicons:folder-solid",
      subItems: [],
    },
    {
      isTitle: false,
      name: "Feedback",
      link: "/app/feedback",
      icon: "heroicons:chat-bubble-left-right-solid",
      subItems: [],
    },
  ];

  const sidebarListUser = [
    {
      isTitle: false,
      name: "Dashboard",
      icon: "heroicons:home-solid",
      link: "/app/home",
      subItems: [],
    },
    {
      isTitle: false,
      name: "Meus Projectos",
      link: "/app/meus-projectos",
      icon: "heroicons:folder-solid",
      subItems: [],
    },
  ];

  return { sidebarItems, sidebarListUser };
}
