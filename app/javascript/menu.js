window.addEventListener("turbo:load", function () {
  const humburgerMenuLoggedIn = document.getElementById(
    "humburger-menu-logged-in"
  );
  const humburgerMenuLoggedOut = document.getElementById(
    "humburger-menu-logged-out"
  );

  const navRightLoggedIn = document.getElementById("nav-right-logged-in");
  const navRightLoggedOut = document.getElementById("nav-right-logged-out");

  const humburgerMenu = humburgerMenuLoggedIn || humburgerMenuLoggedOut;
  const navRight = navRightLoggedIn || navRightLoggedOut;

  if (humburgerMenu) {
    humburgerMenu.addEventListener("click", function () {
      // navRightの表示状態を切り替える
      if (navRight.style.display === "inline-block") {
        navRight.style.display = "none";
      } else {
        navRight.style.display = "inline-block";
      }
    });
  }
});
