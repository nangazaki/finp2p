interface ITestimonial {
  cover: string;
  name: string;
  role: string;
  stars: number;
  text: string;
}

export function useTestimonial() {
  const TESTIMONIALS: ITestimonial[] = [
    {
      cover:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
      name: "José Sebastião",
      role: "Empreendedor",
      stars: 5,
      text: "Encontrei solução para todas as minhas necessidades de design na Creative Tim. Eu os uso como freelancer em meus projetos de hobby para me divertir! E é realmente acessível, galera muito humilde !!!",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
      name: "Pedro João",
      role: "Empreendedor",
      stars: 4,
      text: "Encontrei solução para todas as minhas necessidades de design na Creative Tim. Eu os uso como freelancer em meus projetos de hobby para me divertir! E é realmente acessível, galera muito humilde !!!",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
      name: "José Sebastião",
      role: "Empreendedor",
      stars: 3,
      text: "Encontrei solução para todas as minhas necessidades de design na Creative Tim. Eu os uso como freelancer em meus projetos de hobby para me divertir! E é realmente acessível, galera muito humilde !!!",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
      name: "José Sebastião",
      role: "Empreendedor",
      stars: 5,
      text: "Encontrei solução para todas as minhas necessidades de design na Creative Tim. Eu os uso como freelancer em meus projetos de hobby para me divertir! E é realmente acessível, galera muito humilde !!!",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
      name: "José Sebastião",
      role: "Empreendedor",
      stars: 4,
      text: "Encontrei solução para todas as minhas necessidades de design na Creative Tim. Eu os uso como freelancer em meus projetos de hobby para me divertir! E é realmente acessível, galera muito humilde !!!",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80",
      name: "José Sebastião",
      role: "Empreendedor",
      stars: 5,
      text: "Encontrei solução para todas as minhas necessidades de design na Creative Tim. Eu os uso como freelancer em meus projetos de hobby para me divertir! E é realmente acessível, galera muito humilde !!!",
    },
  ];

  return { TESTIMONIALS };
}
