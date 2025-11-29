// -------------------------------
// Utility Functions
// -------------------------------
const getLocalUsers = () => JSON.parse(localStorage.getItem("users")) || [];
const saveLocalUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

// -------------------------------
// Load users from API (first time)
// -------------------------------
const loadUsersFromAPI = async () => {
    if (!localStorage.getItem("users")) {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await res.json();
        saveLocalUsers(users);
    }
    renderUsers();
};

// -------------------------------
// Create User
// -------------------------------
const createUser = () => {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();

    if (!name || !email) return alert("Enter both name and email!");

    const users = getLocalUsers();

    const newUser = {
        id: Date.now(),
        name,
        email
    };
    
    users.push(newUser);
    saveLocalUsers(users);
    renderUsers();
};

// -------------------------------
// Update User
// -------------------------------
const updateUser = (id) => {
    const newName = prompt("Enter new name:");
    const newEmail = prompt("Enter new email:");

    if (!newName || !newEmail) return;

    const users = getLocalUsers();
    const user = users.find(u => u.id === id);

    user.name = newName;
    user.email = newEmail;

    saveLocalUsers(users);
    renderUsers();
};

// -------------------------------
// Delete User
// -------------------------------
const deleteUser = (id) => {
    let users = getLocalUsers();
    users = users.filter(u => u.id !== id);

    saveLocalUsers(users);
    renderUsers();
};

// -------------------------------
// Render UI
// -------------------------------
const renderUsers = () => {
    const container = document.getElementById("userList");
    const users = getLocalUsers();

    container.innerHTML = ""; // clear

    users.forEach(user => {
        const div = document.createElement("div");
        div.className = "user";

        div.innerHTML = `
            <strong>${user.name}</strong> (${user.email})
            <button onclick="updateUser(${user.id})">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
        `;

        container.appendChild(div);
    });
};

// -------------------------------
// Events
// -------------------------------
document.getElementById("addBtn").addEventListener("click", createUser);

// -------------------------------
// Start App
// -------------------------------
loadUsersFromAPI();
