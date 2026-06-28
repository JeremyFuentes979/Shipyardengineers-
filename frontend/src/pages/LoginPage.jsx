import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        await api.post('/api/auth/register', { name, email, password });
      }
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Pulse</h1>
        <h2>{isRegister ? 'Create Account' : 'Sign In'}</h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">{isRegister ? 'Register' : 'Sign In'}</button>
        </form>

        <p className="toggle">
          {isRegister ? (
            <>Already have an account?{' '}<button className="link" onClick={() => setIsRegister(false)}>Sign In</button></>
          ) : (
            <>Don't have an account?{' '}<button className="link" onClick={() => setIsRegister(true)}>Register</button></>
          )}
        </p>
      </div>
    </div>
  );
}