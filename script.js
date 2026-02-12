const username = "vishalyadav7091";

const projectsContainer = document.getElementById("projects");

async function loadProjects() {
  try {
    const response = await fetch(
      https://api.github.com/users/${username}/repos
    );

    if (!response.ok) {
      throw new Error("GitHub API Error");
    }

    const repos = await response.json();

    // Clear old content
    projectsContainer.innerHTML = "";

    // Filter only public repos and sort by latest updated
    const filteredRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    filteredRepos.forEach(repo => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");

      projectCard.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "No description available"}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;

      projectsContainer.appendChild(projectCard);
    });

  } catch (error) {
    projectsContainer.innerHTML =
      "<p style='color:red;'>Unable to load projects right now.</p>";
    console.error(error);
  }
}

loadProjects();
