// script.js

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // ===== Smooth scroll for navigation links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without jumping
        history.pushState(null, null, this.getAttribute("href"));
      }
    });
  });

  // ===== Handle browser back/forward buttons =====
  window.addEventListener("popstate", () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // ===== Sticky header on scroll =====
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ===== EmailJS contact form =====
  emailjs.init("550z8LSb-9-eLMeRM"); // Replace with your Public Key

  const form = document.getElementById("contact-form");

  // Create a message element for form feedback
  const formMessage = document.createElement("p");
  formMessage.style.textAlign = "center";
  formMessage.style.marginTop = "10px";
  form.appendChild(formMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formMessage.textContent = "Sending...";
    formMessage.style.color = "blue";

    emailjs.sendForm("service_x400i3m", "template_sfev71b", this)
      .then(() => {
        formMessage.textContent = "✅ Message sent successfully!";
        formMessage.style.color = "green";
        this.reset();
      })
      .catch((err) => {
        formMessage.textContent = "❌ Failed to send. Try again.";
        formMessage.style.color = "red";
        console.error(err);
      });
  });

});

// ===== Scroll to top on page reload =====
window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, null, "#home"); // optional
  }, 50); // small delay to ensure DOM is ready
});
