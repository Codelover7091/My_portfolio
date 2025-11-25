// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // === Fetch GitHub Repositories ===
  const repoContainer = document.getElementById("repos");

  async function loadRepos() {
    if (!repoContainer) return;

    try {
      const response = await fetch("https://api.github.com/users/Codelover7091/repos");

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      let repos = await response.json();

      // Sort by last updated date (descending) and take top 6
      repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
      const topRepos = repos.slice(0, 6);

      // Render repos
      repoContainer.innerHTML = topRepos.map(r => `
        <div class="repo-card">
          <h5><a href="${r.html_url}" target="_blank" rel="noopener noreferrer">${r.name}</a></h5>
          <p class="text-muted small">${r.description || "No description available."}</p>
          <a href="${r.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary mt-auto">View on GitHub</a>
        </div>
      `).join("");

    } catch (err) {
      console.error("Error loading repos:", err);
      repoContainer.innerHTML = "<p class='text-center text-danger'>❗ Failed to load projects. Please 🌐 connect to the Internet.</p>";
    }
  }

  loadRepos();

  // === EmailJS Form Submission ===
  emailjs.init("w-GXO4uF5MltdLmRS");

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      btnText.textContent = "Sending...";
      btnSpinner.style.display = "inline-block";
      status.innerHTML = "";

      const params = {
        from_name: document.getElementById("name").value,
        reply_to: document.getElementById("email").value,
        message: document.getElementById("message").value
      };

      emailjs.send('service_k3cqr0g', 'template_561m0hx', params)
        .then(() => {
          status.innerHTML = '<div class="alert alert-success mt-3">✅ Message sent successfully! I\'ll get back to you soon.</div>';
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          status.innerHTML = '<div class="alert alert-danger mt-3">❌ Failed to send message. Please try again later.</div>';
        })
        .finally(() => {
          btnText.textContent = "Send Message 🚀";
          btnSpinner.style.display = "none";
        });
    });
  }

  // === Live Time in Footer ===
  const timeElement = document.getElementById('live-time');

  function updateTime() {
    if (timeElement) {
      const now = new Date();
      timeElement.textContent = now.toLocaleTimeString();
    }
  }

  setInterval(updateTime, 1000);
  updateTime(); // Initial call

  // === Close Mobile Nav After Link Click ===
  document.querySelectorAll('.navbar-nav a').forEach(anchor => {
    anchor.addEventListener('click', function () {
      const navCollapse = document.getElementById('navbarNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        // Use Bootstrap's collapse method to close the menu
        const bsCollapse = new bootstrap.Collapse(navCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    });
  });
});
