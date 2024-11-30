//Global Variables
//Target Profile Information overview class
const profileOverview = document.querySelector(".overview");
const username = "brhynold";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const reposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


//Get user data from GitHub User API
const getUserData = async function () {
    const userData = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await userData.json();
    displayProfileInfo(data);
};
getUserData();

//Now that we have it, let's display the GitHub User Data
const displayProfileInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
`;
  profileOverview.append(div);  
  gitRepoData();
};
// Get the users list of repos next so that it can be displayed
const gitRepoData = async function() {
  const getRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await getRepos.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
  const repoItem = document.createElement("li");
  repoItem.classList.add("repo");
  repoItem.innerHTML = `<h3>${repo.name}</h3>`;
  repoList.append(repoItem);
}
};
//Allow users to click the repo name to see more info about each one
repoList.addEventListener("click", function (e) {
if (e.target.matches("h3")) {
  const repoName = e.target.innerText;
  getRepoInfo(repoName);
}
});
const getRepoInfo = async function (repoName) {
  const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchRepoInfo.json();
  console.log(repoInfo);
  
  //Grab specifics from the repos about languages used, and turn them into an array
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
//Now we want to display the repo properties when a user clicks one of the H3 elements

  displayRepoInfo(repoInfo, languages);
};
const displayRepoInfo = function (repoInfo, languages) {
  reposButton.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repoSection.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};

//Allow users to navigate back to the Github Profile overview from the repo details page

reposButton.addEventListener("click", function() {
  repoSection.classList.remove("hide");
  repoData.classList.add("hide");
  reposButton.classList.add("hide");
});

//Let's add search functionality
filterInput.addEventListener("input", function (e) {
 const searchText = e.target.value;
 const repos = document.querySelectorAll(".repo");
 const searchLowerText = searchText.toLowerCase();

 for (const repo of repos) {
  const repoLowerText = repo.innerText.toLowerCase();
 if (repoLowerText.includes(searchLowerText)) {
  repo.classList.remove("hide");
 } else {
  repo.classList.add("hide");
 }
}
});