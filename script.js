const form = document.getElementById('task-form');
const pendingList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');
const progressBar = document.getElementById('progress-bar');
const statusDisplay = document.getElementById('status-display');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = document.getElementById('newtask').value;
    const category = document.getElementById('category').value; 
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText} <small style="color: #8b949e;">[${category}]</small></span> 
        <div>
            <input type="checkbox" class="done-check">
            <button class="delete-btn">Delete</button>
        </div>
    `;
    
    pendingList.appendChild(li);
    updateDashboard();
    form.reset();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('li').remove();
        updateDashboard();
    }
});

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('done-check')) {
        const li = e.target.closest('li'); 
        if (e.target.checked) {
            li.classList.add('completed-anim');
            completedList.appendChild(li);
        } else {
            li.classList.remove('completed-anim');
            pendingList.appendChild(li);
        }
        updateDashboard();
    }
});

function updateDashboard() {
    const total = pendingList.children.length + completedList.children.length;
    const done = completedList.children.length;
    statusDisplay.textContent = `${done}/${total} Tasks Done`;
    progressBar.style.width = total === 0 ? '0%' : `${(done / total) * 100}%`;
}