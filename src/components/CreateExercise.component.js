import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Axios from 'axios'

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeFormField = this.onChangeFormField.bind(this);
     this.onChangeDate = this.onChangeDate.bind(this);
     this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/users/').then(res => {
      if(res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.username),
          username: res.data[0].username
        })
      }
    })
  }


    onChangeFormField(e) {
      const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });   
  }

  onChangeDuration(e){
    this.setState({duration: e.target.value})
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    console.log('exercise: ', exercise);
    Axios.post('http://localhost:5000/exercises/add', exercise)
    .then(res=>console.log(res.data))

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select
              name="username"
              ref="userInput"
              required
              className="form-control"
              defaultValue={this.state.username}
              onChange={this.onChangeFormField}
            >
              {this.state.users.map(user => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              name="description"
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeFormField}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              date="duration"
              type="number"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
    
          <div className="form-group">
            <label>Date:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}
