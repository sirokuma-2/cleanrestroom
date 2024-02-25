window.addEventListener("load", function () {
  const hamburgerMenuLoggedIn = document.getElementById(
    "humburger-menu-logged-in"
  );
  const hamburgerMenuLoggedOut = document.getElementById(
    "humburger-menu-logged-out"
  );

  const navRightLoggedIn = document.getElementById("nav-right-logged-in");
  const navRightLoggedOut = document.getElementById("nav-right-logged-out");

  const humburgerMenu = hamburgerMenuLoggedIn || hamburgerMenuLoggedOut;
  const navRight = navRightLoggedIn || navRightLoggedOut;

  console.log(humburgerMenu);

  if (humburgerMenu) {
    humburgerMenu.addEventListener("click", function (e) {
      navRight.style.display = "block";
      humburgerMenu.style.display = "none";
      e.stopPropagation();
    });
  }

  document.addEventListener("click", function (e) {
    if (navRight.style.display === "block" && e.target !== humburgerMenu) {
      navRight.style.display = "none";
      if (humburgerMenu) {
        humburgerMenu.style.display = "block";
      }
    }
  });
});
