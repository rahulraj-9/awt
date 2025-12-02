// Ensure jQuery is loaded before execution
$(document).ready(function() {
    
    // --- AUTHENTICATION LOGIC (Used on register.html and login.html) ---

    // Registration Handler
    $("#registerBtn").click(() => {
        const username = $("#regUser").val();
        const password = $("#regPass").val();

        // Basic validation
        if (!username || !password) {
            $("#regMsg").text("Username and password are required.").removeClass("success").addClass("error");
            return;
        }

        $.post('/register', { username, password }, res => {
            if (res.success && res.redirect) {
                // Success: Redirect to the login page
                $("#regMsg").text("Registration successful! Redirecting to login...").removeClass("error").addClass("success");
                setTimeout(() => {
                    window.location = res.redirect; 
                }, 1000);
            } else {
                // Failure: Display error message
                $("#regMsg").text(res.message).removeClass("success").addClass("error");
            }
        });
    });

    // Login Handler
    $("#loginBtn").click(() => {
        const username = $("#logUser").val();
        const password = $("#logPass").val();

        $.post('/login', { username, password }, res => {
            if (res.success && res.redirect) {
                // Success: Redirect to the protected To-Do page
                window.location = res.redirect;
            } else {
                // Failure: Display error message
                $("#logMsg").text(res.message).removeClass("success").addClass("error");
            }
        });
    });

    
    // --- TO-DO LOGIC (Used only on todolist.html) ---

    if (window.location.pathname === "/todolist") {
        loadTodos();
    }

    // Load Todos Function
    function loadTodos() {
        $.get('/todos', todos => {
            $("#todoList").empty();
            todos.forEach(t => {
                $("#todoList").append(`
                    <li>
                        <span style="flex-grow: 1;" class="${t.done ? 'completed' : ''}">${t.text}</span>
                        <div>
                            <button onclick="toggleTodo('${t._id}')">${t.done ? 'Undo' : 'Done'}</button>
                            <button onclick="deleteTodo('${t._id}')">Delete</button>
                        </div>
                    </li>
                `);
            });
        }).fail(function(xhr) {
             // Handle unauthorized access (e.g., if session expires while on the page)
             if (xhr.status === 401) {
                 window.location.href = '/login.html';
             }
        });
    }

    // Add Todo
    $("#addBtn").click(() => {
        const task = $("#todoInput").val();
        if (task.trim() === '') return;
        
        $.post('/todos', { text: task }, () => {
            $("#todoInput").val('');
            loadTodos();
        });
    });

    // Toggle (Done/Undo)
    window.toggleTodo = function(id) {
        $.post('/todos/toggle', { id }, loadTodos);
    };

    // Delete
    window.deleteTodo = function(id) {
        $.post('/todos/delete', { id }, loadTodos);
    };
});