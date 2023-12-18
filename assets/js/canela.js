// Variable para contar los clics en la imagen
let clickCount = 0;

// Variable para almacenar el usuario actual
let currentUser = null;

// Arreglo para almacenar los datos de usuario
let userData = [];

// Función que se ejecuta al hacer clic en la imagen
function CanelaBark() {
    clickCount++; // Incrementa el contador de clics
    document.getElementById("count").innerText = clickCount; // Actualiza la visualización del contador

    if (currentUser) {
        currentUser.clicks = clickCount; // Actualiza el número de clics del usuario actual
        updateRankingTable(); // Actualiza la tabla de clasificación
    }
}

// Función para guardar los datos del usuario ingresados en el formulario
function saveUserData() {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    const name = document.getElementById("name").value; // Obtiene el nombre ingresado
    const country = document.getElementById("country").value; // Obtiene el país ingresado
    
    if (name !== "" && country !== "") {
        let existingUserIndex = userData.findIndex(user => user.name === name && user.country === country);

        if (existingUserIndex !== -1) {
            // Si el usuario ya existe, se actualizan sus datos
            currentUser = userData[existingUserIndex];
        } else {
            // Si es un usuario nuevo, se crea un objeto con los datos y se agrega al arreglo
            currentUser = {
                name,
                country,
                clicks: 0 // Inicialmente los clics son 0
            };
            userData.push(currentUser); // Agrega el usuario al arreglo de datos
        }

        clickCount = 0; // Reinicia el contador de clics
        updateRankingTable(); // Actualiza la tabla de clasificación
    }
    document.getElementById("loginForm").reset(); // Reinicia el formulario
}
// Función para generar un ID aleatorio
function generateRandomId() {
    return Math.random().toString(36).substr(2, 9); // Genera un ID aleatorio
}
// Función para actualizar la tabla de clasificación
function updateRankingTable() {
    const rankingData = document.getElementById("rankingData");

    userData.sort((a, b) => b.clicks - a.clicks); // Ordena los usuarios por número de clics (de mayor a menor)

    // Limpia el contenido existente de la tabla
    rankingData.innerHTML = "";

    // Recorre los datos de usuario y los agrega a la tabla
    userData.forEach((user, index) => {
        const row = document.createElement("tr"); // Crea una nueva fila en la tabla

        // Asigna un ID aleatorio a cada usuario
        if (!user.id) {
            user.id = generateRandomId();
        }

        // Agrega celdas con los datos del usuario, incluyendo la posición
        row.innerHTML = `<td>${index + 1}</td><td>${user.name}</td><td>${user.country}</td><td>${user.clicks}</td><td>${user.id}</td>`;
        rankingData.appendChild(row); // Agrega la fila a la tabla
    });
}