let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
let header = document.querySelector(".header-2");

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

let countDate = new Date("june 1, 2021 00:00:00").getTime();

function CountDown() {
  let now = new Date().getTime();
  gap = countDate - now;

  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let d = Math.floor(gap / day);
  let h = Math.floor((gap % day) / hour);
  let m = Math.floor((gap % hour) / minute);
  let s = Math.floor((gap % minute) / second);

  if (document.getElementById("day")) {
    document.getElementById("day").innerText = d;
  }

  if (document.getElementById("hour")) {
    document.getElementById("hour").innerText = h;
  }

  if (document.getElementById("minute")) {
    document.getElementById("minute").innerText = m;
  }

  if (document.getElementById("second")) {
    document.getElementById("second").innerText = s;
  }
}

setInterval(function () {
  CountDown();
}, 1000);

$(document).ready(function () {
  $("button").on("click", function () {
    console.log(123);
    $(".card-holder").append(
      '<div class="card w-100"><div class="card-body">multiple cards</div></div>'
    );
  });
});
