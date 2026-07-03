import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState({ done: '', doing: '', blockers: '' });
  const [feed, setFeed] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchFeed();
  }, [navigate]);

  const fetchFeed = async () => {
    try {
      const { data } = await api.get('/api/checkins');
      setFeed(data.checkins ?? []);
    } catch {
      // not connected yet
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/checkins', checkin);
      setCheckin({ done: '', doing: '', blockers: '' });
      fetchFeed();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Pulse</h1>
        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          Log out
        </button>
      </header>

      <main className="dashboard-main">
        <section className="checkin-form">
          <h2>Today's Check-in</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="done">Done</label>
              <textarea
                id="done"
                value={checkin.done}
                onChange={(e) => setCheckin({ ...checkin, done: e.target.value })}
                rows={2}
                placeholder="What did you accomplish?"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="doing">Doing</label>
              <textarea
                id="doing"
                value={checkin.doing}
                onChange={(e) => setCheckin({ ...checkin, doing: e.target.value })}
                rows={2}
                placeholder="What are you working on?"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="blockers">Blockers</label>
              <textarea
                id="blockers"
                value={checkin.blockers}
                onChange={(e) => setCheckin({ ...checkin, blockers: e.target.value })}
                rows={2}
                placeholder="Any blockers?"
              />
            </div>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </section>

        <section className="feed">
          <h2>Team Feed</h2>
          {feed.length === 0 ? (
            <p className="empty">No check-ins yet today.</p>
          ) : (
            feed.map((c) => (
              <div key={c.id} className="checkin-card">
                <strong>{c.user_name}</strong>
                <p><span>Done:</span> {c.done_text}</p>
                <p><span>Doing:</span> {c.doing_text}</p>
                {c.blockers_text && <p><span>Blockers:</span> {c.blockers_text}</p>}
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}