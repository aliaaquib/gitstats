async function getGitHubStats() {
    const username = document.getElementById('username').value;
    const resultContainer = document.getElementById('result');
    const leftProfile = document.getElementById('left-profile');
    const rightProfile = document.getElementById('right-profile');

    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const orgsResponse = await fetch(`https://api.github.com/users/${username}/orgs`);
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);

        const userData = await userResponse.json();
        const orgsData = await orgsResponse.json();
        const repoData = await reposResponse.json();

        if (userResponse.ok && orgsResponse.ok && reposResponse.ok) {
            // Update the left profile
            leftProfile.innerHTML = `
                <h2>${userData.login}</h2>
                <img src="${userData.avatar_url}" alt="Profile Picture" style="width: 100px; border-radius: 50%;"> 
                <h2>About</h2>
                <p id="user-bio">${userData.bio || 'Not available'}</p>
                <h2>Part of</h2>
                <p id="user-orgs">${orgsData.map(org => `<img src="${org.avatar_url}" alt="${org.login}" style="width: 50px; border-radius: 50%;">`).join('')}</p>
            `;

            // Update the right profile
            rightProfile.innerHTML = `
                <h2>Stats</h2>
                <p id="followers">Followers: ${userData.followers}</p>
                <p id="following">Following: ${userData.following}</p>
                <p id="repo-count">Total Repos: ${repoData.length}</p>
            `;
        } else {
            resultContainer.innerHTML = `<p style="color: red;">${userData.message || 'Error fetching data'}</p>`;
        }
    } catch (error) {
        resultContainer.innerHTML = `<p style="color: red;">Error fetching data</p>`;
    }
}
