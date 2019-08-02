import * as React from "react";
import Axios from "axios";

export class UpdateUserComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userid: "",
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            role: "(0,user)",
            data: { role: "(0,user)"},
            users: []
        };
    }
    updateId(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            userid: value,
            data: {...this.state.data, userid: value}
        });
    }
    updateUsername(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            username: value,
            data: {...this.state.data, username: value}
        });
    }
    updatePassword(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            password: value,
            data: {...this.state.data, password: value}
        });
    }
    updateFirstName(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }       
        this.setState({
            ...this.state,
            firstName: value,
            data: {...this.state.data, firstName: value}
        });
    }
    updateLastName(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }        
        this.setState({
            ...this.state,
            lastName: value,
            data: {...this.state.data, LastName: value}
        });
    }

    updateEmail(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            email: value,
            data: {...this.state.data, email: value}
        });
    }

    updateRole(e: any) {
        let value = e.target.value;
        if (value === ""){
            value = undefined;
        }
        let roleTitle = "";
        switch(value){
            case "0":
                roleTitle = "user";
                break;
            case "1":
                roleTitle = "financial-manager";
                break;
            case "2":
                roleTitle = "admin";
                break;
        }
        this.setState({
            ...this.state,
            role: value,
            data: {...this.state.data, role: `(${value},${roleTitle})`}
        });
    }

    updateUserInDatabase() {
        const url = `http://localhost:3333/users`;
        const passData = this.state.data;
        console.log(this.state.data);
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token")
            }
        }
        Axios.patch(url, passData, config)
            .then(payload => {
                this.setState({
                    ...this.state,
                    users: (
                            <tr key={payload.data.userid}>
                                <th scope="row">{payload.data.userId}</th>
                                <td>{payload.data.username}</td>
                                <td>{payload.data.firstName}</td>
                                <td>{payload.data.lastName}</td>
                                <td>{payload.data.email}</td>
                                <td>{payload.data.role && payload.data.role.slice(3, -1)}</td>
                            </tr>
                        )
                    })
                
                console.log(payload);
            })
            .catch(error => {
                console.log(error);
                console.log(url);
            });
    }

    render() {
        return (
            <div>
                <div className="row ml-5 mr-5 mb-3 mt-3">
                    <div className="col-2">User ID: </div>
                    <input
                        type="text"
                        value={this.state.userid}
                        onChange={(e: any) => this.updateId(e)}
                        required
                    />
                    <div className="col-2">Username: </div>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={(e: any) => this.updateUsername(e)}
                    />
                    <div className="col-2">Password: </div>
                    <input
                        type="text"
                        value={this.state.password}
                        onChange={(e: any) => this.updatePassword(e)}
                    />
                </div>
                <div className="row ml-5 mr-5 mb-3 mt-3">
                    <div className="col-2">First Name: </div>
                    <input
                        type="text"
                        value={this.state.firstname}
                        onChange={(e: any) => this.updateFirstName(e)}
                    />
                    <div className="col-2">Last Name: </div>
                    <input
                        type="text"
                        value={this.state.lastname}
                        onChange={(e: any) => this.updateLastName(e)}
                    />
                    <div className="col-2">Email: </div>
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={(e: any) => this.updateEmail(e)}
                    />
                </div>
                <div className="row ml-5 mr-5 mb-3 mt-3">
                    <div className="col-2">Role: </div>
                    <select onChange={(e: any) => this.updateRole(e)}>
                        <option value="0">User</option>
                        <option value="1">Financial-Manager</option>
                        <option value="2">Admin</option>
                    </select>
                </div>
                <br />
                <div className="row align-items-center justify-content-center">
                <button onClick={() => this.updateUserInDatabase()}>Update User</button>
                </div>
                <br />
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
