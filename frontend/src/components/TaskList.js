import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, X, Check, Clock, Circle } from 'lucide-react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/task';

const STATUS_OPTIONS = ['not started', 'pending', 'completed'];


export default function TaskList({ onLogout }) {
  const token = localStorage.getItem('token');
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'not started' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const result = await getTasks(token);
      if (result.error) setError(result.error);
      else setTasks(result);
    } catch {
      setError('Failed to load tasks');
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '', status: 'not started' });
    setEditId(null);
    setError('');
    setShowForm(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      if (editId) await updateTask(editId, form, token);
      else await createTask(form, token);
      resetForm();
      fetchTasks();
    } catch {
      setError('Could not save task');
    }
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description || '', status: task.status });
    setEditId(task._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch {
      setError('Could not delete task');
    }
  };

  const handleStatusChange = async (task, status) => {
    try {
      await updateTask(task._id, { status }, token);
      fetchTasks();
    } catch {
      setError('Could not update status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <Check size={16} className="text-success" />;
      case 'pending': return <Clock size={16} className="text-warning" />;
      case 'not started': return <Circle size={16} className="text-muted" />;
      default: return <Circle size={16} className="text-muted" />;
    }
  };

  const groupedTasks = {
    'not started': tasks.filter(task => task.status === 'not started'),
    'pending': tasks.filter(task => task.status === 'pending'),
    'completed': tasks.filter(task => task.status === 'completed')
  };

  const statusConfig = {
    'not started': {
      title: 'Not Started',
      bgColor: 'bg-light',
      borderColor: 'border-secondary',
      icon: <Circle size={20} className="text-muted" />
    },
    'pending': {
      title: 'In Progress',
      bgColor: 'bg-warning-subtle',
      borderColor: 'border-warning',
      icon: <Clock size={20} className="text-warning" />
    },
    'completed': {
      title: 'Completed',
      bgColor: 'bg-success-subtle',
      borderColor: 'border-success',
      icon: <Check size={20} className="text-success" />
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
        <div className="container-fluid">
          <h1 className="navbar-brand mb-0 h1 fw-bold">Task Board</h1>
          <div className="d-flex">
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary me-3 d-flex align-items-center"
            >
              <Plus size={16} className="me-2" />
              New Task
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-outline-secondary"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Error Message */}
      {error && (
        <div className="container mt-3">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editId ? 'Edit Task' : 'Create New Task'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Task Title</label>
                    <input
                      name="title"
                      placeholder="Enter task title..."
                      value={form.title}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      name="description"
                      placeholder="Add a description..."
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>
                          {statusConfig[status].title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary flex-fill"
                    >
                      {editId ? 'Update Task' : 'Create Task'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-secondary flex-fill"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Columns */}
      <div className="container-fluid py-4">
        <div className="row g-4">
          {STATUS_OPTIONS.map(status => (
            <div key={status} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className={`card-header ${statusConfig[status].bgColor} ${statusConfig[status].borderColor} border-bottom-2`}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      {statusConfig[status].icon}
                      <h5 className="card-title mb-0 ms-2 fw-bold">
                        {statusConfig[status].title}
                      </h5>
                    </div>
                    <span className="badge bg-white text-dark border">
                      {groupedTasks[status].length}
                    </span>
                  </div>
                </div>

                <div className="card-body" style={{ minHeight: '400px' }}>
                  {groupedTasks[status].length === 0 ? (
                    <div className="text-center py-5">
                      <div className="text-muted">
                        No {statusConfig[status].title.toLowerCase()} tasks
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {groupedTasks[status].map(task => (
                        <div
                          key={task._id}
                          className="card border shadow-sm task-card"
                          style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '';
                          }}
                        >
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 
                                className={`card-title mb-0 ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : ''}`}
                              >
                                {task.title}
                              </h6>
                              <div className="d-flex task-actions" style={{ opacity: 0, transition: 'opacity 0.2s' }}>
                                <button
                                  onClick={() => handleEdit(task)}
                                  className="btn btn-sm btn-outline-primary me-1 p-1"
                                  style={{ width: '28px', height: '28px' }}
                                >
                                  <Edit3 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(task._id)}
                                  className="btn btn-sm btn-outline-danger p-1"
                                  style={{ width: '28px', height: '28px' }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>

                            {task.description && (
                              <p className="card-text small text-muted mb-3" 
                                 style={{ 
                                   display: '-webkit-box',
                                   WebkitLineClamp: 2,
                                   WebkitBoxOrient: 'vertical',
                                   overflow: 'hidden'
                                 }}>
                                {task.description}
                              </p>
                            )}

                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                {getStatusIcon(task.status)}
                                <small className="text-muted fw-medium ms-2">
                                  {statusConfig[task.status].title}
                                </small>
                              </div>
                              <select
                                value={task.status}
                                onChange={e => handleStatusChange(task, e.target.value)}
                                className="form-select form-select-sm"
                                style={{ width: 'auto', fontSize: '12px' }}
                              >
                                {STATUS_OPTIONS.map(st => (
                                  <option key={st} value={st}>
                                    {statusConfig[st].title}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .task-card:hover .task-actions {
          opacity: 1 !important;
        }
        .border-bottom-2 {
          border-bottom-width: 2px !important;
        }
        .navbar-brand {
          color: #495057 !important;
        }
      `}</style>
    </div>
  );
}