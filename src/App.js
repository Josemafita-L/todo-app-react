import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
    if (error) setError("");
  };

  // Add or update task
  const handleAddOrUpdateTask = () => {
    if (task.trim() === "") {
      setError("Please enter a task!");
      return;
    }

    if (editingIndex !== null) {
      // Update existing task
      const updatedTasks = tasks.map((t, i) => 
        i === editingIndex ? task : t
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }
    
    setTask("");
    setError("");
  };

  // Delete task
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setTask("");
    }
  };

  // Edit task
  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditingIndex(index);
  };

  // Complete task
  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) => 
      i === index ? `${t} ✓` : t
    );
    setTasks(updatedTasks);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddOrUpdateTask();
    }
  };

  // Clear all tasks
  const handleClearAll = () => {
    setTasks([]);
    setEditingIndex(null);
    setTask("");
  };

  return (
    <div className="App">
      <div className="todo-container">
        <header className="app-header">
          <h1>
            <span className="todo-icon">📋</span>
            Task Manager
          </h1>
          <p className="app-subtitle">Organize your day, one task at a time</p>
        </header>

        {/* Input Section */}
        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              value={task}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className={`task-input ${error ? 'error' : ''}`}
              autoFocus
            />
            <button 
              onClick={handleAddOrUpdateTask} 
              className={`action-btn ${editingIndex !== null ? 'update-btn' : 'add-btn'}`}
            >
              {editingIndex !== null ? 'Update Task' : 'Add Task'}
            </button>
          </div>
          
          {error && (
            <div className="error-message shake">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
        </div>

        {/* Task Stats */}
        <div className="stats-section">
          <div className="stats-card">
            <span className="stats-label">Total Tasks</span>
            <span className="stats-value">{tasks.length}</span>
          </div>
          <div className="stats-card">
            <span className="stats-label">Completed</span>
            <span className="stats-value">
              {tasks.filter(t => t.includes('✓')).length}
            </span>
          </div>
        </div>

        {/* Task List */}
        <div className="task-list-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks yet</h3>
              <p>Start by adding your first task above!</p>
            </div>
          ) : (
            <>
              <div className="task-list-header">
                <h2>Your Tasks ({tasks.length})</h2>
                {tasks.length > 0 && (
                  <button 
                    onClick={handleClearAll}
                    className="clear-all-btn"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="task-list">
                {tasks.map((taskItem, index) => (
                  <div 
                    key={index} 
                    className={`task-item ${taskItem.includes('✓') ? 'completed' : ''} ${editingIndex === index ? 'editing' : ''}`}
                  >
                    <div className="task-content">
                      <span className="task-number">{index + 1}</span>
                      <span className="task-text">
                        {taskItem.replace(' ✓', '')}
                        {taskItem.includes('✓') && (
                          <span className="completed-badge">Completed</span>
                        )}
                      </span>
                    </div>
                    <div className="task-actions">
                      <button 
                        onClick={() => handleToggleComplete(index)}
                        className="icon-btn complete-btn"
                        title="Mark as complete"
                      >
                        {taskItem.includes('✓') ? '↶' : '✓'}
                      </button>
                      <button 
                        onClick={() => handleEditTask(index)}
                        className="icon-btn edit-btn"
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(index)}
                        className="icon-btn delete-btn"
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="tips-section">
          <div className="tip">
            <span className="tip-icon">💡</span>
            <span>Press <kbd>Enter</kbd> to quickly add tasks</span>
          </div>
          <div className="tip">
            <span className="tip-icon">🎯</span>
            <span>{tasks.length > 0 ? 'Keep going! ' : ''}Focus on one task at a time</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;