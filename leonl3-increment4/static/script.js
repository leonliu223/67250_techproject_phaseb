
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


function ActiveNav() {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    if (window.location.href === link.href) {
      link.classList.add("active");
    }
  });
}

ActiveNav();



  // When the "Read Less" button is clicked
 $("#readLess").click(function(){ 
    $("#longIntro").hide(); // Hide the long introduction text
    $("#readLess").hide();  // Hide the "Read Less" button itself
    $("#readMore").show();  // Show the "Read More" button  

  });
  
// When the "Read More" button is clicked
  $("#readMore").click(function(){
    $("#longIntro").show();  // Show the long introduction text
    $("#readLess").show();   // Show the "Read Less" button
    $("#readMore").hide();   // Hide the "Read More" button  
  });



function showPurchaseForm(date) {
  var form = document.getElementById("purchaseForm");
  var dateLabel = document.getElementById("selectedDate");

  if (form) {
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth" });
  }
  if (dateLabel) {
    dateLabel.textContent = date;
  }
}

