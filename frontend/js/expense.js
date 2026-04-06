// // frontend/js/expense.js

// const API_URL = "http://localhost:3000/api"; // backend API base

// // function to add expense
// async function addExpense() {
//     const title = document.getElementById("title").value;
//     const amount = parseFloat(document.getElementById("amount").value);
//     const user_id = 1; // replace with actual logged-in user ID

//     if (!title || !amount) {
//         alert("Please fill all fields");
//         return;
//     }

//     try {
//         const response = await fetch(`${API_URL}/expense`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ user_id, title, amount })
//         });

//         const data = await response.json();
//         alert(data.message || "Expense added");
//         fetchExpenses(user_id); // refresh list
//     } catch (err) {
//         console.error(err);
//     }
// }

// // function to get expenses
// async function fetchExpenses(user_id) {
//     try {
//         const response = await fetch(`${API_URL}/expense/${user_id}`);
//         const expenses = await response.json();

//         const list = document.getElementById("list");
//         list.innerHTML = "";

//         expenses.forEach(exp => {
//             const li = document.createElement("li");
//             li.textContent = `${exp.title} - $${exp.amount}`;
//             list.appendChild(li);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

// // logout function (example)
// function logout() {
//     alert("Logout clicked");
// }

// // expose addExpense to global scope so onclick works
// window.addExpense = addExpense;

// // on page load, fetch user expenses
// fetchExpenses(1); // replace 1 with actual logged-in user ID










// let editingId = null; // store the ID of the expense being edited

// // Add or update expense
// async function addOrUpdateExpense() {
//     const title = document.getElementById("title").value.trim();
//     const amount = parseFloat(document.getElementById("amount").value);
//     const user_id = 1; // replace with actual logged-in user ID

//     if (!title || !amount) {
//         alert("Please fill all fields");
//         return;
//     }

//     try {
//         let url = `${API_URL}/expense`;
//         let method = "POST";
//         let body = JSON.stringify({ user_id, title, amount });

//         if (editingId) {
//             // update existing expense
//             url = `${API_URL}/expense/${editingId}`;
//             method = "PUT";
//             body = JSON.stringify({ title, amount });
//         }

//         const response = await fetch(url, {
//             method,
//             headers: { "Content-Type": "application/json" },
//             body
//         });

//         const data = await response.json();
//         alert(data.message || (editingId ? "Expense updated" : "Expense added"));

//         // reset form
//         document.getElementById("title").value = "";
//         document.getElementById("amount").value = "";
//         editingId = null;
//         document.getElementById("saveBtn").textContent = "Add";

//         fetchExpenses(user_id);
//     } catch (err) {
//         console.error(err);
//     }
// }

// // Fetch expenses
// async function fetchExpenses(user_id) {
//     try {
//         const response = await fetch(`${API_URL}/expense/${user_id}`);
//         const expenses = await response.json();

//         const list = document.getElementById("list");
//         list.innerHTML = "";

//         expenses.forEach(exp => {
//             const li = document.createElement("li");
//             li.textContent = `${exp.title} - $${exp.amount}`;

//             // Edit button
//             const editBtn = document.createElement("button");
//             editBtn.textContent = "Edit";
//             editBtn.style.marginLeft = "10px";
//             editBtn.onclick = () => editExpense(exp);

//             // Delete button
//             const delBtn = document.createElement("button");
//             delBtn.textContent = "Delete";
//             delBtn.style.marginLeft = "5px";
//             delBtn.onclick = () => deleteExpense(exp.id, user_id);

//             li.appendChild(editBtn);
//             li.appendChild(delBtn);

//             list.appendChild(li);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

// // Edit expense
// function editExpense(expense) {
//     document.getElementById("title").value = expense.title;
//     document.getElementById("amount").value = expense.amount;
//     editingId = expense.id;
//     document.getElementById("saveBtn").textContent = "Update";
// }

// // Delete expense
// async function deleteExpense(id, user_id) {
//     if (!confirm("Are you sure you want to delete this expense?")) return;

//     try {
//         const response = await fetch(`${API_URL}/expense/${id}`, { method: "DELETE" });
//         const data = await response.json();
//         alert(data.message || "Expense deleted");
//         fetchExpenses(user_id);
//     } catch (err) {
//         console.error(err);
//     }
// }

// // Logout function
// function logout() {
//     alert("Logout clicked");
// }

// // expose globally
// window.addOrUpdateExpense = addOrUpdateExpense;

// // load expenses on page load
// fetchExpenses(1); // replace 1 with actual logged-in user ID




// frontend/js/expense.js

const API_URL = "http://localhost:3000/api"; 

// 1. Get the actual logged-in user ID from localStorage
const getUserId = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
        // If no user is found, send them back to login
        window.location.href = "login.html";
        return null;
    }
    return userId;
};

let editingId = null;

// ================= LOAD DATA =================
window.onload = () => {
    const userId = getUserId();
    if (userId) fetchExpenses(userId);
};

// ================= FETCH EXPENSES =================
async function fetchExpenses(user_id) {
    try {
        const response = await fetch(`${API_URL}/expense/${user_id}`);
        const expenses = await response.json();

        const list = document.getElementById("list");
        list.innerHTML = "";

        expenses.forEach(exp => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${exp.title} - $${parseFloat(exp.amount).toFixed(2)}</span>
                <div class="btn-group">
                    <button onclick='editExpense(${JSON.stringify(exp)})'>Edit</button>
                    <button onclick="deleteExpense(${exp.id})">Delete</button>
                </div>
            `;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Fetch Error:", err);
    }
}

// ================= ADD / UPDATE =================
async function addOrUpdateExpense() {
    const userId = getUserId();
    const titleInput = document.getElementById("title");
    const amountInput = document.getElementById("amount");
    const saveBtn = document.getElementById("saveBtn");

    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!title || isNaN(amount)) {
        alert("Please enter a valid title and amount");
        return;
    }

    try {
        let url = `${API_URL}/expense`;
        let method = "POST";
        // Payload includes the dynamic userId
        let body = { user_id: userId, title, amount };

        if (editingId) {
            url = `${API_URL}/expense/${editingId}`;
            method = "PUT";
            body = { title, amount };
        }

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert(editingId ? "Updated successfully" : "Added successfully");
            
            // Reset Form
            titleInput.value = "";
            amountInput.value = "";
            editingId = null;
            saveBtn.textContent = "Add";
            
            fetchExpenses(userId);
        }
    } catch (err) {
        console.error("Save Error:", err);
    }
}

// ================= EDIT =================
function editExpense(expense) {
    document.getElementById("title").value = expense.title;
    document.getElementById("amount").value = expense.amount;
    editingId = expense.id;
    document.getElementById("saveBtn").textContent = "Update";
}

// ================= DELETE =================
async function deleteExpense(id) {
    const userId = getUserId();
    if (!confirm("Delete this expense?")) return;

    try {
        const response = await fetch(`${API_URL}/expense/${id}`, { method: "DELETE" });
        if (response.ok) {
            fetchExpenses(userId);
        }
    } catch (err) {
        console.error("Delete Error:", err);
    }
}

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("user_id"); // Clear the session
    window.location.href = "login.html";
}

// Expose functions globally
window.addOrUpdateExpense = addOrUpdateExpense;
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
window.logout = logout;