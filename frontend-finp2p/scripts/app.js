document.addEventListener("DOMContentLoaded", () => {
  new PerfectScrollbar(".header-message-list");
  new PerfectScrollbar(".header-notifications-list");

  document
    .querySelector(".mobile-search-icon")
    .addEventListener("click", () => {
      document.querySelector(".search-bar").classList.add("full-search-bar");
    });

  document.querySelector(".search-close").addEventListener("click", () => {
    document.querySelector(".search-bar").classList.remove("full-search-bar");
  });

  document
    .querySelector(".mobile-toggle-menu")
    .addEventListener("click", () => {
      document.querySelector(".wrapper").classList.add("toggled");
    });

  document.querySelector(".toggle-icon").addEventListener("click", () => {
    if (document.querySelector(".wrapper").classList.contains("toggled")) {
      document.querySelector(".wrapper").classList.remove("toggled");
      document.querySelector(".sidebar-wrapper").removeEventListener("mouseover", toggleSidebarHover);
      document.querySelector(".sidebar-wrapper").removeEventListener("mouseout", toggleSidebarHover);
    } else {
      document.querySelector(".wrapper").classList.add("toggled");
      document.querySelector(".sidebar-wrapper").addEventListener("mouseover", toggleSidebarHover);
      document.querySelector(".sidebar-wrapper").addEventListener("mouseout", toggleSidebarHover);
    }
  });

  function toggleSidebarHover() {
    document.querySelector(".wrapper").classList.toggle("sidebar-hovered");
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      document.querySelector(".back-to-top").style.display = "block";
    } else {
      document.querySelector(".back-to-top").style.display = "none";
    }
  });

  document.querySelector(".back-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  });

  // Adicionar lógica para ajustar a barra de rolagem e ajustar a cor do topbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      document.querySelector(".topbar").classList.add("bg-dark");
    } else {
      document.querySelector(".topbar").classList.remove("bg-dark");
    }
  });

  // Adicionar lógica para o menu metisMenu
  document.querySelector("#menu").metisMenu();

  // Adicionar lógica para alternar a visibilidade de vários elementos
  document
    .querySelectorAll(
      ".chat-toggle-btn, .chat-toggle-btn-mobile, .email-toggle-btn, .email-toggle-btn-mobile, .compose-mail-btn, .compose-mail-close, .switcher-btn, .close-switcher"
    )
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetClass = btn.getAttribute("data-target-class");
        document
          .querySelector(targetClass)
          .classList.toggle(targetClass.replace(".", ""));
      });
    });

  // Adicionar lógica para alternar temas
  document
    .querySelectorAll(
      "#theme1, #theme2, #theme3, #theme4, #theme5, #theme6, #theme7, #theme8, #theme9, #theme10, #theme11, #theme12"
    )
    .forEach((themeBtn) => {
      themeBtn.addEventListener("click", () => {
        document.body.className = `bg-theme ${themeBtn.id}`;
      });
    });
});
