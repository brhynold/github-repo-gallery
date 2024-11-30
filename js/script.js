//Global Variables
//Target Profile Information overview class
const profileOverview = document.querySelector(".overview");
const username = "brhynold";
const repoList = document.querySelector(".repo-list");

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
  getRepoData();
};

const getRepoData = async function() {
  const repoData = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repos = await repoData.json();
  displayRepos(repos);
};

const displayRepos = function (repos) {

  for (const repo of repos) {
  const repoItem = document.createElement("li");
  repoItem.classList.add("repo");
  repoItem.innerHTML = `<h3>${repo.name}</h3>`;
  repoList.append(repoItem);
}
};