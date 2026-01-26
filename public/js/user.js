const openModal = (userId = null) => {
    const modal = document.querySelector("#userFormModal");
    const formTitle = document.querySelector("#formTitle");
    const saveBtn = document.querySelector("#saveBtn");
    const form = document.querySelector("#userForm");

    if (modal) {
        if (userId) {
            formTitle.textContent = "Edit User";
            saveBtn.textContent = "Update";
            form.dataset.userId = userId;

            fetch(`/users/${userId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        form.querySelector('[name="name"]').value = data.user.name || '';
                        form.querySelector('[name="email"]').value = data.user.email || '';
                    }
                })
                .catch(error => {
                    console.error('Error loading user:', error);
                });
        } else {
            formTitle.textContent = "Create User";
            saveBtn.textContent = "Create";
            form.reset();
            delete form.dataset.userId;
        }

        modal.classList.remove("hidden");
        console.log(`Modal opened for ${userId ? 'EDIT' : 'CREATE'}`);
    }
};
const closeModal = () => {
    const modal = document.querySelector("#userFormModal");
    if (modal) {
        modal.classList.add("hidden");
        console.log('Modal closed');
    }
};
const loadUsers = async () => {
    // Get search term if exists
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput ? searchInput.value.trim() : '';

    // Build URL with search parameter
    const url = searchTerm ? `/users?q=${encodeURIComponent(searchTerm)}` : '/users';

    try {
        const res = await fetch(url);
        const data = await res.json();
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        if (data.users.length === 0) {
            const message = searchTerm
                ? `No users found for "${searchTerm}"`
                : 'No users found';
            tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-gray-500">${message}</td></tr>`;
            return;
        }

        data.users.forEach(user => {
            const tr = document.createElement("tr");
            tr.id = `user-row-${user.id}`;
            tr.innerHTML = `
                <td class="px-2 py-2">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style="background: ${user.avatarColor};">
                        ${user.avatar}
                    </div>
                </td>
                <td class="px-2 py-2">${user.name}</td>
                <td class="px-2 py-2">${user.email}</td>
                <td class="px-2 py-2 flex justify-center gap-2">
                    <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onclick="openModal(${user.id})">Edit</button>
                    <button class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-red-500">Error loading users</td></tr>`;
    }
};
const saveOrUpdateUser = async () => {
    console.log('Saving/Updating user...');

    const form = document.querySelector("#userForm");
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;

    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }

    const userData = { name, email };
    const userId = form.dataset.userId;

    const url = userId ? `/users/${userId}` : '/users';
    const method = userId ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (res.ok) {
            closeModal();
            loadUsers();
        } else {
            alert(data.message || "Invalid data" );
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving user');
    }
};
const deleteUser = async (userId) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/users/${userId}`, { method: "DELETE" });
    if (res.ok) {
        document.getElementById(`user-row-${userId}`).remove();
    } else {
        const data = await res.json();
        alert(data.message);
    }
};

document.addEventListener("DOMContentLoaded", loadUsers);
