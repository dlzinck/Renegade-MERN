//importing React
import React from 'react';

//importing switch and route from router-dom
import { Switch, Route } from 'react-router-dom';

// components that will go everywhere will be nested here
function App() {
  return (
    
    <div className="App">     
      {/* Nav component will be placed here */}
      <nav>NAV</nav>

      {/* Routes will nest here with their corresponding components */}
      <Switch>

      </Switch>

      {/*  footer component will be placed here */}
      <footer>FOOTER</footer>
    </div>
    
    
  );
}

export default App;
