const Notify = ({ error, setError }) => {
  setTimeout(() => {
    setError(null);
  }, 5000);
  return <div style={{ color: 'red' }}>{error}</div>;
};

export default Notify;
