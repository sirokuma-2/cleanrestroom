window.addEventListener("load", function () {
  const hamburgerMenu = document.getElementById("humbuger-menu");
  const navRight = document.getElementById("nav-right");

  hamburgerMenu.addEventListener("click", function (event) {
    navRight.style.display = "block";
    hamburgerMenu.style.display = "none";
    event.stopPropagation();
  });

  document.addEventListener("click", function () {
    if (navRight.style.display === "block") {
      navRight.style.display = "none";
      hamburgerMenu.style.display = "block";
    }
  });
});
