import React, { useState } from 'react';
import { signup, login } from '../services/auth';
import { User, Lock, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';

export default function SignupLogin({ onAuth }) {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = isSignup ? await signup(form) : await login(form);
      if (data.error) {
        setError(data.error);
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        onAuth();
      }
    } catch {
      setError('Server error. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setError('');
    setIsSignup(!isSignup);
    setForm({ firstName: '', lastName: '', username: '', password: '' });
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: "'Segoe UI', system-ui, sans-serif"
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            {/* Header */}
            <div className="text-center mb-4">
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white'
                }}
              >
                {isSignup ? (
                  <UserPlus size={32} />
                ) : (
                  <LogIn size={32} />
                )}
              </div>
              <h2 className="fw-bold text-white mb-2" style={{ fontSize: '2rem' }}>
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-white-50 mb-0">
                {isSignup 
                  ? 'Sign up to start managing your tasks' 
                  : 'Sign in to your account to continue'
                }
              </p>
            </div>

            {/* Form Card */}
            <div className="card shadow-lg border-0" style={{ borderRadius: '16px' }}>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {isSignup && (
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label fw-semibold small">First Name</label>
                        <div className="position-relative">
                          <input
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="form-control ps-5"
                            style={{ borderRadius: '8px', paddingLeft: '2.5rem' }}
                          />
                          <User 
                            size={16} 
                            className="position-absolute text-muted"
                            style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-semibold small">Last Name</label>
                        <div className="position-relative">
                          <input
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="form-control ps-5"
                            style={{ borderRadius: '8px', paddingLeft: '2.5rem' }}
                          />
                          <User 
                            size={16} 
                            className="position-absolute text-muted"
                            style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Username</label>
                    <div className="position-relative">
                      <input
                        name="username"
                        placeholder="Enter your username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="form-control ps-5"
                        style={{ borderRadius: '8px', paddingLeft: '2.5rem' }}
                      />
                      <User 
                        size={16} 
                        className="position-absolute text-muted"
                        style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Password</label>
                    <div className="position-relative">
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="form-control ps-5 pe-5"
                        style={{ borderRadius: '8px', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                      />
                      <Lock 
                        size={16} 
                        className="position-absolute text-muted"
                        style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-link position-absolute text-muted p-0"
                        style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none' }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2" role="alert">
                      <small className="mb-0 fw-medium">{error}</small>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn w-100 text-white fw-semibold py-3"
                    style={{
                      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  >
                    {isLoading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <div 
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          style={{ width: '1rem', height: '1rem' }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Processing...
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center">
                        {isSignup ? (
                          <UserPlus size={18} className="me-2" />
                        ) : (
                          <LogIn size={18} className="me-2" />
                        )}
                        {isSignup ? 'Create Account' : 'Sign In'}
                      </div>
                    )}
                  </button>
                </form>

                {/* Switch Mode */}
                <div className="text-center mt-4">
                  <p className="text-muted small mb-2">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                  </p>
                  <button
                    onClick={switchMode}
                    className="btn btn-link p-0 fw-semibold"
                    style={{ color: '#4f46e5', textDecoration: 'none' }}
                  >
                    {isSignup ? 'Sign in instead' : 'Create new account'}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            {/* <div className="text-center mt-4">
              <p className="text-white-50 small mb-0">
                © 2024 Task Manager. Built for productivity.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}