import React, { Component } from 'react';
import Axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      submitted: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username
    };

    Axios.post('http://localhost:5000/users/add', user)
      .then(res => {
        console.log(res.data);
        this.setState({ username: '', submitted: true });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h3>
          Create New User{' '}
          {this.state.submitted ? (
            <span className="text-success">: user been created</span>
          ) : (
            ''
          )}
        </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-danger text-warning btn-lg btn-block"
            />
          </div>
        </form>
      </div>
    );
  }
}
