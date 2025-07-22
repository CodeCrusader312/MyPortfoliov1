// AOS Initialization
AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out"
});

// Page Loader + Start Typed Animation
window.addEventListener("load", () => {
  // Fade out the loader
  document.getElementById("loader-wrapper").classList.add("fade-out");

  // ✨ Start the typing animation
  startSecondTyped();
});


function startSecondTyped() {
  var typed = new Typed("#typed-output", {
    strings: [
      "UI/UX Designer",
      "Web Developer",
      "Software Engineer"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
  });
}

const sections = document.querySelectorAll("section, #header, #about, #services, #portfolio, #contact");
const navLinks = document.querySelectorAll("nav ul li a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active-section");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active-section");
        }
      });
    }
  });
}, {
  threshold: 0.6
});

sections.forEach(section => {
  observer.observe(section);
});

// Animate underline every time section is entered
const subtitleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const title = entry.target.querySelector('.sub-title');
    if (title) {
      if (entry.isIntersecting) {
        title.classList.remove('animate-underline'); // reset first
        void title.offsetWidth; // force reflow (this re-triggers animation)
        title.classList.add('animate-underline');
      }
    }
  });
}, {
  threshold: 0.6
});

document.querySelectorAll('#about, #services, #portfolio, #contact').forEach(section => {
  subtitleObserver.observe(section);
});




// Custom Cursor
const cursor = document.querySelector('.cursor');
const hoverTargets = document.querySelectorAll('.service-box, .work');

document.addEventListener('mousemove', (e) => {
    const cursorSize = 150;
    const cursorRadius = cursorSize / 2;
    const cursorX = e.clientX - cursorRadius;
    const cursorY = e.clientY - cursorRadius;

    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    let isOverlapping = false;

    hoverTargets.forEach((box) => {
        const rect = box.getBoundingClientRect();
        const overlaps = cursorX + cursorSize > rect.left &&
            cursorX < rect.right &&
            cursorY + cursorSize > rect.top &&
            cursorY < rect.bottom;

        if (overlaps) isOverlapping = true;
    });

    cursor.classList.toggle('behind', isOverlapping);
});

// Tab System
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Mobile Menu
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// Auto-close mobile nav when clicking links
document.querySelectorAll("#sidemenu li a").forEach(link => {
    link.addEventListener("click", () => {
        closemenu();
    });
});

// Form Submission
function showThanks() {
    alert("Thank you for your message, Keifer will get back to you soon! 😊");
}

VanillaTilt.init(document.querySelectorAll(".flip-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3
  });

  // ==================== TOUCH INTERACTIONS ====================
// Handle flip card taps
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', function() {
    if (window.matchMedia("(pointer: coarse)").matches) {
      this.classList.toggle('active');
    }
  });
});

// Handle portfolio item taps
document.querySelectorAll('.work').forEach(work => {
  work.addEventListener('click', function() {
    if (window.matchMedia("(pointer: coarse)").matches) {
      // Close any other open work items
      document.querySelectorAll('.work').forEach(w => {
        if (w !== this) w.classList.remove('active');
      });
      this.classList.toggle('active');
    }
  });
});

// Close portfolio layer when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.work') && window.matchMedia("(pointer: coarse)").matches) {
    document.querySelectorAll('.work').forEach(work => {
      work.classList.remove('active');
    });
  }
});

// ==================== FLIP CARD INTERACTIONS ====================
document.querySelectorAll('.flip-card').forEach(card => {
  // For touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    card.addEventListener('click', function(e) {
      // Prevent triggering if clicking a link inside
      if (e.target.closest('a')) return;
      
      // Close other open cards first
      document.querySelectorAll('.flip-card').forEach(c => {
        if (c !== this) c.classList.remove('active');
      });
      
      // Toggle this card
      this.classList.toggle('active');
    });
  }
  
  // For desktop - ensure hover works normally
  else {
    card.addEventListener('mouseleave', function() {
      this.classList.remove('active');
    });
  }
});