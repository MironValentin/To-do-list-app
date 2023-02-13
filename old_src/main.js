window.addEventListener('load', () => {
	const tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;

		if (!task) {
			alert("Please fill out the task");
			return;
		}
		if (tasksArray === []) {

			window.localStorage.setItem("tasks", JSON.stringify([{name: task}]));
		} else {
			tasksArray.push({name: task});
			window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
		}
		createTask(task);
	});

	const createTask = (task) => {
		let selectedTask;
		// Create task div
		const task_el = document.createElement('div');
		task_el.classList.add('task');

		// Create task body
		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		// Append task body to task
		task_el.appendChild(task_content_el);

		// Create input
		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		// Append input to task body
		task_content_el.appendChild(task_input_el);

		// Create actions div
		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		// Create edit button
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		// Create delete button
		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';
		task_delete_el.name = task;

		// Append delete and edit button to actions div
		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		// Append actions div to task element
		task_el.appendChild(task_actions_el);

		// Append task div to task list 
		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				selectedTask = task_input_el.value;
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
				console.log(task_input_el.value);
				const updatedTaskArray =tasksArray.map(task => task.name === selectedTask ? {name: task_input_el.value} : task);
				window.localStorage.setItem("tasks", JSON.stringify(updatedTaskArray));
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);

			const taskName = e.target.name
			const tasks = JSON.parse(localStorage.getItem('tasks'));

			const result = tasks.filter(task => task.name != taskName );

			window.localStorage.setItem('tasks', JSON.stringify(result));
		});
	}


	tasksArray.map(task =>{
		// Display task
		createTask(task.name)
	})
});