import * as React from "react";
import Axios from "axios";

export class LoginComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "bell",
      password: "pass"
    };
  }

  updateUsername(e: any) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      username: value
    });
  }
  updatePassword(e: any) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      password: value
    });
  }

  async login() {
    const url = `http://localhost:3333/login`;

    const data = {
      username: this.state.username,
      password: this.state.password
    };

    // Axios sends a GET request to the URL of the string passed to the
    // .get function.  This function returns a promise. We should call
    // .then to provide handling logic for when the promise resolves.
    // Alternatively, we could use async/await to handle the response.

    // We will receive a data payload from Axios - all we need to do is
    // map the payload properties we are interested in, to a new state object
    Axios.post(url, data)
      .then(payload => {
        localStorage.setItem("token", payload.data.token);
        console.log(payload.data);
      })
      .catch(error => {
        console.log("This is an error" + error);
      });
  }

  render() {
    return (
      <div>
        <div>Username: </div>
        <input
          type="text"
          value={this.state.username}
          onChange={(e: any) => this.updateUsername(e)}
        />
        <br />
        <br />
        <div>Password: </div>
        <input
          type="text"
          value={this.state.password}
          onChange={(e: any) => this.updatePassword(e)}
        />
        <br />
        <br />
        <button onClick={() => this.login()}>Login</button>
      </div>
    );
  }
}
