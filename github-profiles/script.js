const APIURL = "https://api.github.com/users/";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// getUser('shreyasikhar');

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();
    if(respData) {
        addReposToCard(respData);
    }
}

function createUserCard(user) {
    let cardHTML = "";
    if(user.id) {
        cardHTML = `
        <div class="card">
            <a href="${user.html_url}" target="_blank">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </a>    
            <div class="user-info">
                <h2>
                    <a href="${user.html_url}" target="_blank">${user.name === null ? "Name not available" : user.name}</a>
                </h2>
                <p>${user.bio === null ? 'bio not available': user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Public Repos</strong></li>
                </ul>
                <div class="repos" id="repos"></div>
            </div>
        </div>    
    `;
    }
    else {
        cardHTML = `<h3 class="msg">Sorry, No User Found</h3>`;
    }

    main.innerHTML = cardHTML;
    
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9)
    .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.innerText = repo.name; 
        repoEl.href = repo.html_url; 
        repoEl.target = "_blank"; 

        reposEl.appendChild(repoEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;
    if(user) {
        getUser(user);

        search.value = "";
    }
});