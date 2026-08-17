import "./site-status.css";

export function LoadingScreen() {
  return (
    <div className="site-status" role="status" aria-live="polite">
      <div className="site-status-spinner" aria-hidden="true" />
      <p className="site-status-text">Loading portfolio…</p>
    </div>
  );
}

export function ErrorScreen({ message, onRetry }) {
  return (
    <div className="site-status" role="alert">
      <p className="site-status-title">Couldn't load the site</p>
      <p className="site-status-text">{message || "Something went wrong reaching the server."}</p>
      <button type="button" className="btn btn-primary site-status-retry" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export function EmptyState({ children = "Nothing here yet." }) {
  return <p className="site-empty-state">{children}</p>;
}
