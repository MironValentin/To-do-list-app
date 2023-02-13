import './App.css';
import { NewTaskForm } from './components/NewTaskForm';
import { Task } from './components/Task';

function App() {
  return (
    <div className="App">
      <NewTaskForm />
      <main>
        <section className="task-list">
          <h2>Tasks</h2>
          <div id="tasks">
            <Task />
            <Task />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
