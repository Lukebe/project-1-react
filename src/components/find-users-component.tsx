import * as React from "react";
import Axios from "axios";


export class FindUsersComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: "",
      choice: "1",
      users: []
    };
  }
  updateChoice(e: any){
    const value = e.target.value;
    this.setState({
      ...this.state,
        choice: value
    });
  }
  updateValue(e: any) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      inputValue: value
    });
  }

  async findById() {
    const url = `http://localhost:3333/users/${this.state.inputValue}`;
    const config = {
      headers: {
        "Conetent-Type": "application/json",
        authorization: localStorage.getItem("token")
      }
    }
    
    Axios.get(url, config)
      .then(payload => {
        this.setState({
          ...this.state,
          users: (
              <tr key={payload.data.userId}><th scope="row">{payload.data.userId}</th>
                <td>{payload.data.username}</td>
                <td>{payload.data.firstName}</td>
                <td>{payload.data.lastName}</td>
                <td>{payload.data.email}</td>
                <td>{payload.data.role.slice(3, -1)}</td>
              </tr>
            )
          });
      }).catch(error => {
        console.log(error);
        console.log(url);
      });
  }

  async findAll() {
    const url = `http://localhost:3333/users`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")
      }
    }
    Axios.get(url, config)
      .then((payload) => {
        this.setState({
          ...this.state,
          users: payload.data.map((o: any) => {
            return (
              <tr key={o.userid}><th scope="row">{o.userid}</th>
                <td>{o.username}</td>
                <td>{o.firstname}</td>
                <td>{o.lastname}</td>
                <td>{o.email}</td>
                <td>{o.role.slice(3, -1)}</td>
              </tr>
            )
          })

        });
        console.log(payload.data);
      }).catch(error => {
        console.log(error);
        console.log(url);
        alert(`Please enter valid data and try again.
                        Thank you!`);
      });
    if (!this.state.users) {
      alert(`Please enter valid data and try again.
                        Thank you!`);
    }

  }
  findUsers(){
    // eslint-disable-next-line
    if(this.state.choice == 1){
      this.findById();
      // eslint-disable-next-line
    } else if (this.state.choice == 2){
      this.findAll();
    } else {
      console.log(this.state.choice);
      console.log("How did I get here?");
    }
    this.setState({
      ...this.state,
      users: []
    });
  }

  render() {
    return (
      <div>
        <div className="row align-items-center justify-content-center ml-5 mr-5 mb-3 mt-3">
        { this.state.choice === "1" &&
        <input
          className="ml-2 mr-5"
          type="text"
          value={this.state.inputValue}
          onChange={(e: any) => this.updateValue(e)}
        />
        }
        <select onChange={(e: any) => this.updateChoice(e)}
            className="ml-2 mr-5">
          <option value="1">Find User By ID</option>
          <option value="2">Find All Users</option>
        </select>
        </div>
        <div className="row align-items-center justify-content-center">
        <button onClick={() => this.findUsers()}>Find User(s)</button>
        </div>
        <div className="outputBox">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
            {this.state.users}
            </tbody>
            
          </table>
        </div>
      </div>
    );
  }
}
