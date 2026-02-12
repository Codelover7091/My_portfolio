const username = "vishalyadav7091";

const projectsContainer = document.getElementById("projects");

async function loadProjects() {
  projectsContainer.innerHTML = "<p>Loading projects...</p>";

  try {
    const response = await fetch(
      https://api.github.com/users/${username}/repos
    );

    if (!response.ok) {
      throw new Error(GitHub API Error: ${response.status});
    }

    const repos = await response.json();

    if (!repos.length) {
      projectsContainer.innerHTML = "<p>No public repositories found.</p>";
      return;
    }

    projectsContainer.innerHTML = "";

    repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .forEach(repo => {
        const card = document.createElement("div");
        card.style.border = "1px solid #ddd";
        card.style.padding = "10px";
        card.style.margin = "10px 0";

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>
          <a href="${repo.html_url}" target="_blank">View Project</a>
        `;

        projectsContainer.appendChild(card);
      });

  } catch (error) {
    projectsContainer.innerHTML =
      "<p style='color:red;'>Failed to load GitHub projects.</p>";
    console.error(error);
  }
}

loadProjects();
