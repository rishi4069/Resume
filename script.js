/**
 * Rishi Ranjan — Portfolio Interactions
 * Smooth navigation, active scroll-spy, mobile drawer, copy-to-clipboard toast
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navMenu.classList.remove("active");
      });
    });
  }

  // 2. Navbar Background Blur & Scroll State
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  }, { passive: true });

  // 3. Dynamic Current Year in Footer
  const currentYear = new Date().getFullYear();
  const yearEl = document.getElementById("year");
  const currentYearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = currentYear;
  if (currentYearEl) currentYearEl.textContent = currentYear;

  // 4. Scroll Spy (Highlight active section in navbar)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  function updateActiveNavLink() {
    let currentId = "";
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // 5. One-Click Copy Email to Clipboard with Toast Notification
  const copyBtn = document.getElementById("copyEmailBtn");
  const toast = document.getElementById("toast");

  if (copyBtn && toast) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email") || "rishi.satyendra@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        showToast("✓ Email copied to clipboard!");
      } catch (err) {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast("✓ Email copied to clipboard!");
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
});