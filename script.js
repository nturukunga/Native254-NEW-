document.addEventListener("DOMContentLoaded", () => {
  // 1) Fade-Up Intersection Observer
  const fadeUpElements = document.querySelectorAll(".fade-up");
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  fadeUpElements.forEach(el => observer.observe(el));

  // 2) Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  const submitPrompt = document.getElementById("submitPrompt");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
      consent: document.getElementById("consent").checked,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        submitPrompt.style.display = "block";
        submitPrompt.textContent = "Your message has been submitted!";
        contactForm.reset();
        setTimeout(() => { submitPrompt.style.display = "none"; }, 3000);
      } else {
        alert(result.message || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your message.");
    }
  });
});
