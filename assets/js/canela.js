let clickCount = 0;
let currentUser = null;
let userData = [];

function CanelaBark() {
    clickCount++;
    document.getElementById("count").innerText = clickCount;

    if (currentUser) {
        currentUser.clicks = clickCount;
        updateRankingTable();
    }
}

function saveUserData() {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;
    
    if (name !== "" && country !== "") {
        currentUser = {
            name,
            country,
            clicks: 0 // Inicialmente los clics son 0
        };
        userData.push(currentUser);
        clickCount = 0;
        updateRankingTable();
    }
    document.getElementById("loginForm").reset();
}

function updateRankingTable() {
    const rankingData = document.getElementById("rankingData");
    rankingData.innerHTML = "";

    userData.sort((a, b) => b.clicks - a.clicks);

    userData.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${user.name}</td><td>${user.country}</td><td>${user.clicks}</td>`;
        rankingData.appendChild(row);
    });
}
