import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar.component';

import CreateExercise from './components/CreateExercise.component';
import CreateUser from './components/CreateUser.component';
import EditExercise from './components/EditExercise.component';
import ExerciseList from './components/ExercisesList.component';

function App() {
  return (
    <div className="bg-info vh-100 vw-100">
      <Router>
        {' '}
        <Navbar />
        <div className="container">
          <br />
          <div className="card shadow-sm">
            <div class="card-body">
              <Route path="/" exact component={ExerciseList} />
              <Route path="/edit/:id" component={EditExercise} />
              <Route path="/create" component={CreateExercise} />
              <Route path="/user" component={CreateUser} />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
