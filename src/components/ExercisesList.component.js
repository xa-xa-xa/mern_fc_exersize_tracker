import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ReactComponent as EditSVG } from '../icons/svg/edit-solid.svg';
import { ReactComponent as TrashSVG } from '../icons/svg/trash-alt-regular.svg';

const Exercise = props => {
  const iconsStyles = {
    icons: {
      height: '1rem',
      cursor: 'pointer',
      margin: '0 .5rem'
    },
    trashCan: {
      color: 'red',
      ':hover': {
        color: 'blue'
      }
    }
  };

  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${props.exercise._id}`}>
          <EditSVG style={iconsStyles.icons} />
        </Link>{' '}
        <>
          <TrashSVG
            style={{ ...iconsStyles.trashCan, ...iconsStyles.icons }}
            onClick={() => {
              props.deleteExercise(props.exercise._id);
            }}
          />
        </>
      </td>
    </tr>
  );
};

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/exercises/')
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(err => console.error(err));
  }

  deleteExercise(id) {
    Axios.delete('http://localhost:5000/exercises/' + id).then(res =>
      console.log(res.data)
    );
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  exercisesList() {
    return this.state.exercises.map(currExercise => (
      <Exercise
        exercise={currExercise}
        deleteExercise={this.deleteExercise}
        key={currExercise._id}
      />
    ));
  }

  render() {
    return (
      <>
        <h3 className="center">Logged Exercises</h3>
        <table className="table border">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </>
    );
  }
}
