import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar.component';

import CreateExercise from './components/CreateExercise.component';
import CreateUser from './components/CreateUser.component';
import EditExercise from './components/EditExercise.component';
import ExerciseList from './components/ExercisesList.component';

const styles = {
  background: {
    background: 'radial-gradient( yellow, #f06d06)',
    position: 'relative'
    // top: '4rem'
  }
};

function App() {
  return (
    <div className="">
      <Router>
        <Navbar />
        <div className="vh-100 w-100 px-4" style={styles.background}>
          <br />
          <div className="card shadow-sm">
            <div className="card-body">
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
