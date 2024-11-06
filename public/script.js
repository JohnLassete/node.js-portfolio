async function fetchProjects() {
  const response = await fetch("/projects");
  const projects = await response.json();
  const projectList = document.getElementById("project-list");
  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <img src="${project.image}" alt="${project.title}" style="width: 100%;">
        <a href="${project.link}" target="_blank">View Project</a>
    `;
    projectList.appendChild(projectDiv);
  });
}

fetchProjects();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for reaching out!");
  });
