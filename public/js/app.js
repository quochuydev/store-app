let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
let header = document.querySelector(".header-2");

if (menu) {
  menu.addEventListener("click", () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
  });

  window.onscroll = () => {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");

    if (window.scrollY > 150) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  };
}

$(document).ready(function () {
  $("button").on("click", function () {
    $(".card-holder").append(
      '<div class="card w-100"><div class="card-body">multiple cards</div></div>'
    );
  });
});

$("body").on("click", ".mega-dropdown", function (e) {
  return e.stopPropagation();
});
