//Global Variables
//Target Profile Information overview class
const profileOverview = document.querySelector(".overview");
const username = "brhynold";

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
};
