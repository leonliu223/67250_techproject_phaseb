

var now = new Date();
var hour = now.getHours();

function greeting(h) {
  var greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;

  if (h < 5 || h >= 20) {
    greetingEl.innerHTML = "Good night — Welcome to MonoMuse";
  } else if (h < 12) {
    greetingEl.innerHTML = "Good morning — Welcome to MonoMuse";
  } else if (h < 18) {
    greetingEl.innerHTML = "Good afternoon — Welcome to MonoMuse";
  } else {
    greetingEl.innerHTML = "Good evening — Welcome to MonoMuse";
  }
}

greeting(hour);

function addYear() {
  var yearEl = document.getElementById("copyYear");
  if (yearEl) {
    yearEl.innerHTML = "&copy; " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
  }
}
