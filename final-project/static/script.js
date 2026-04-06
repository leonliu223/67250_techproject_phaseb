
var now = new Date();
var hour = now.getHours();

function greeting(h) {
  var greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;

  if (h < 5 || h >= 20) {
    greetingEl.innerHTML = "Good night &mdash; Welcome to MonoMuse";
  } else if (h < 12) {
    greetingEl.innerHTML = "Good morning &mdash; Welcome to MonoMuse";
  } else if (h < 18) {
    greetingEl.innerHTML = "Good afternoon &mdash; Welcome to MonoMuse";
  } else {
    greetingEl.innerHTML = "Good evening &mdash; Welcome to MonoMuse";
  }
}

greeting(hour);


function addYear() {
  var yearEl = document.getElementById("copyYear");
  if (yearEl) {
    yearEl.innerHTML =
      "&copy; " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
  }
}


function ActiveNav() {
  var navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(function (link) {
    if (link.classList.contains("hamburger")) return;
    if (window.location.href === link.href) {
      link.classList.add("active");
    }
  });
}

ActiveNav();


$(document).ready(function () {
  $("#readLess").click(function () {
    $("#longIntro").slideUp();
    $("#readLess").hide();
    $("#readMore").show();
  });

  $("#readMore").click(function () {
    $("#longIntro").slideDown();
    $("#readLess").show();
    $("#readMore").hide();
  });
});



function toggleNav() {
  var navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.classList.toggle("responsive");
  }
}


(function () {
  var slides = document.querySelectorAll(".slide");
  var dots = document.querySelectorAll(".dot");
  if (slides.length === 0) return;

  var slideIndex = 0;

  function showSlide(n) {
    slideIndex = ((n % slides.length) + slides.length) % slides.length;
    slides.forEach(function (s) {
      s.classList.remove("active");
    });
    dots.forEach(function (d) {
      d.classList.remove("active");
    });
    slides[slideIndex].classList.add("active");
    if (dots[slideIndex]) dots[slideIndex].classList.add("active");
  }

  var prevBtn = document.querySelector(".gallery-prev");
  var nextBtn = document.querySelector(".gallery-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      showSlide(slideIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      showSlide(slideIndex + 1);
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      showSlide(i);
    });
  });


  setInterval(function () {
    showSlide(slideIndex + 1);
  }, 5000);
})();


function updateTotal() {
  var qtyEl = document.getElementById("quantity");
  var totalEl = document.getElementById("totalAmount");
  if (!qtyEl || !totalEl) return;

  var qty = parseInt(qtyEl.value) || 0;
  if (qty < 0) qty = 0;
  if (qty > 10) qty = 10;
  var total = qty * 18;
  totalEl.textContent = "$" + total.toFixed(2);
}


function placeOrder() {
  var valid = true;


  document.querySelectorAll(".form-group").forEach(function (g) {
    g.classList.remove("has-error");
  });


  var date = document.getElementById("visitDate");
  if (date && !date.value) {
    showError(date, "Please select a visit date.");
    valid = false;
  }


  var type = document.getElementById("ticketType");
  if (type && !type.value) {
    showError(type, "Please select a ticket type.");
    valid = false;
  }


  var qty = document.getElementById("quantity");
  if (qty) {
    var q = parseInt(qty.value);
    if (!qty.value || isNaN(q) || q < 1 || q > 10) {
      showError(qty, "Enter a quantity between 1 and 10.");
      valid = false;
    }
  }


  var email = document.getElementById("email");
  if (email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailPattern.test(email.value)) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }
  }


  var zip = document.getElementById("zipCode");
  if (zip && zip.value) {
    if (!/^\d{5}$/.test(zip.value)) {
      showError(zip, "Zip code must be exactly 5 digits.");
      valid = false;
    }
  }

  if (!valid) return;


  var typeNames = { general: "General", student: "Student", member: "Member" };
  var total = parseInt(qty.value) * 18;

  sessionStorage.setItem("orderDate", date.value);
  sessionStorage.setItem("orderType", typeNames[type.value] || type.value);
  sessionStorage.setItem("orderQty", qty.value);
  sessionStorage.setItem("orderTotal", total.toFixed(2));
  sessionStorage.setItem("orderEmail", email.value);

  window.location.href = "confirmation.html";
}


function showError(inputEl, message) {
  var group = inputEl.closest(".form-group");
  if (group) {
    group.classList.add("has-error");
    var errMsg = group.querySelector(".error-msg");
    if (errMsg) errMsg.textContent = message;
  }
}


function loadConfirmation() {
  var fields = {
    confDate: "orderDate",
    confType: "orderType",
    confQty: "orderQty",
    confEmail: "orderEmail"
  };

  for (var id in fields) {
    var el = document.getElementById(id);
    if (el) {
      el.textContent = sessionStorage.getItem(fields[id]) || "\u2014";
    }
  }

  var totalEl = document.getElementById("confTotal");
  var totalVal = sessionStorage.getItem("orderTotal");
  if (totalEl) {
    totalEl.textContent = totalVal ? "$" + totalVal : "\u2014";
  }
}


window.addEventListener("load", function () {
  var mapEl = document.getElementById("map");
  if (!mapEl) return;

  var currentpage = L.map("map").setView([40.443406, -79.942981], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(currentpage);

  L.marker([40.443406, -79.942981])
    .addTo(currentpage)
    .bindPopup("<b>MonoMuse</b><br>5000 Forbes Ave<br>Pittsburgh, PA 15213")
    .openPopup();
});
