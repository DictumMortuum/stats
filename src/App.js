import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const Index = () => <Button variant="contained" color="primary">
Hello World
</Button>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"><Button variant="contained" color="primary">
Hello World
</Button></Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </div>
  </Router>
);

export default AppRouter;
