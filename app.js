// -------------------------------
// Utility Functions
// -------------------------------
const getLocalUsers = () => JSON.parse(localStorage.getItem("users")) || [];
const saveLocalUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

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
const createUser = async () => {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();

  if (!name || !email) return alert("Enter both name and email!");

  const users = getLocalUsers();

  const newUser = { id: Date.now(), name, email };

  // Use spread operator to add new user
  const updatedUsers = [...users, newUser];

  saveLocalUsers(updatedUsers);
  renderUsers();
};

// -------------------------------
// Update User
// -------------------------------
const updateUser = async (id) => {
  const newName = prompt("Enter new name:");
  const newEmail = prompt("Enter new email:");

  if (!newName || !newEmail) return;

  const users = getLocalUsers();

  // Use map + spread operator to update user immutably
  const updatedUsers = users.map((u) =>
    u.id === id ? { ...u, name: newName, email: newEmail } : u
  );

  saveLocalUsers(updatedUsers);
  renderUsers();
};

// -------------------------------
// Delete User
// -------------------------------
const deleteUser = async (id) => {
  const users = getLocalUsers();

  // Use filter + spread (optional) to remove user
  const updatedUsers = [...users.filter((u) => u.id !== id)];

  saveLocalUsers(updatedUsers);
  renderUsers();
};

// -------------------------------
// Render UI
// -------------------------------
const renderUsers = () => {
  const container = document.getElementById("userList");
  const users = getLocalUsers();

  container.innerHTML = ""; // clear

  users.forEach((user) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td style="padding:8px; border-bottom:1px solid #ddd;">${user.name}</td>
            <td style="padding:8px; border-bottom:1px solid #ddd;">${user.email}</td>
            <td style="padding:8px; border-bottom:1px solid #ddd;">
                <button class="editBtn" data-id="${user.id}">Edit</button>
                <button class="deleteBtn" data-id="${user.id}">Delete</button>
            </td>
        `;

    container.appendChild(tr);
  });

  container.querySelectorAll(".editBtn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      await nameexport.updateUser(id);
    });
  });
  container.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      await nameexport.deleteUser(id);
    });
  });
};

// -------------------------------
// Events
// -------------------------------
document.getElementById("addBtn").addEventListener("click", async () => {
  await nameexport.createUser();
});

// -------------------------------
// Start App
// -------------------------------
const nameexport = {
  getLocalUsers,
  saveLocalUsers,
  loadUsersFromAPI,
  createUser,
  updateUser,
  deleteUser,
  renderUsers,
};

export { nameexport };

nameexport.loadUsersFromAPI();
