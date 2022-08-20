const App = () => {
  const items = [0, 1, 2];

  return <ul>
    {items.map(item => <li key={item}>{item}</li>)}
  </ul>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);