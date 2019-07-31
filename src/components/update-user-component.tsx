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
            role: "",
            data: {},
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
        this.setState({
            ...this.state,
            role: value,
            data: {...this.state.data, role: value}
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
                            <tr key={payload.data.userid}><th scope="row">{payload.data.userId}</th>
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
                <div>User ID: </div>
                <input
                    type="text"
                    value={this.state.userid}
                    onChange={(e: any) => this.updateId(e)}
                /><br />
                <div>Username: </div>
                <input
                    type="text"
                    value={this.state.username}
                    onChange={(e: any) => this.updateUsername(e)}
                />
                <div>Password: </div>
                <input
                    type="text"
                    value={this.state.password}
                    onChange={(e: any) => this.updatePassword(e)}
                />
                <div>First Name: </div>
                <input
                    type="text"
                    value={this.state.firstname}
                    onChange={(e: any) => this.updateFirstName(e)}
                />
                <div>Last Name: </div>
                <input
                    type="text"
                    value={this.state.lastname}
                    onChange={(e: any) => this.updateLastName(e)}
                />
                <div>Email: </div>
                <input
                    type="text"
                    value={this.state.email}
                    onChange={(e: any) => this.updateEmail(e)}
                />
                <div>Role By Role ID: </div>
                <input
                    type="text"
                    value={this.state.role}
                    onChange={(e: any) => this.updateRole(e)}
                />
                <br /><br />

                <button onClick={() => this.updateUserInDatabase()}>Update User</button>
                <div className="outputBox">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
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
