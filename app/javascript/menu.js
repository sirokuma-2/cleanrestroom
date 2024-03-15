window.addEventListener("turbo:load", function () {
  const hamburgerMenuLoggedIn = document.getElementById(
    "hamburger-menu-logged-in"
  );
  const hamburgerMenuLoggedOut = document.getElementById(
    "hamburger-menu-logged-out"
  );

  const navRightLoggedIn = document.getElementById("nav-right-logged-in");
  const navRightLoggedOut = document.getElementById("nav-right-logged-out");

  const hamburgerMenu = hamburgerMenuLoggedIn || hamburgerMenuLoggedOut;
  const navRight = navRightLoggedIn || navRightLoggedOut;

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", function () {
      var isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      navRight.style.display = isExpanded ? "none" : "block";

      // アイコンの切り替え
      this.querySelector(".icon-hamburger").style.display = isExpanded
        ? "inline-block"
        : "none";
      this.querySelector(".icon-close").style.display = isExpanded
        ? "none"
        : "inline-block";
    });
  }
});
