export default function CheckinCard({ checkin }) {
  return (
    <div className="checkin-card">
      <div className="checkin-card-header">
        <strong>{checkin.user_name}</strong>
        <span className="date">{checkin.date}</span>
      </div>
      <div className="checkin-card-body">
        <p><span className="label">Done:</span> {checkin.done_text}</p>
        <p><span className="label">Doing:</span> {checkin.doing_text}</p>
        {checkin.blockers_text && (
          <p><span className="label">Blockers:</span> {checkin.blockers_text}</p>
        )}
      </div>
    </div>
  );
}