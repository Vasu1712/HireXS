// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
// import Navbar from './navbar';
// import Home from './home';
// import Jobs from './jobs';
// import Past from './past';
// import About from './about';

// const App = () => {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" exact component={Home} />
//                 <Route path="/jobs" component={Jobs} />
//                 <Route path="/past" component={Past} />
//                 <Route path="/about" component={About} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;

import React from 'react';
import './App.css';
import Navbar from './navbar';
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        
      </div>
    </div>
  );
}



export default App;
