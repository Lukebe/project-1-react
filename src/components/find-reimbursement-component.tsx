import * as React from "react";
import Axios from "axios";

export class FindReimbursement extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: "",
            choice: '1',
            reimbursements: []
        };
    }
    updateChoice(e: any) {
        const value = e.target.value;
        ((this.state.choice === "2") ?
            this.setState({
                ...this.state,
                choice: value,
                inputValue: "",
                reimbursements: []
            }):
            this.setState({
                ...this.state,
                choice: value,
                inputValue: 0,
                reimbursements: []
            }) ) 
        
    }
    updateValue(e: any) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            inputValue: value,
            reimbursements: []
        });
        console.log(this.state.inputValue);
    }
    
    findByStatusId() {
        const url = `http://localhost:3333/reimbursements/status/${this.state.inputValue}`;
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
                    reimbursements: payload.data.map((o: any) => {
                        return(
                            <tr key={o.reimbursementid}><th scope="row">{o.reimbursementid}</th>
                                <td>{o.author}</td>
                                <td>{o.amount}</td>
                                <td>{o.datesubmitted.slice(0, -14)}</td>
                                <td>{o.dateresolved && o.dateresolved.slice(0, -14)}</td>
                                <td>{o.description}</td>
                                <td>{o.resolver}</td>
                                <td>{o.status}</td>
                                <td>{o.type}</td>
                            </tr>
                        )
                    })
                });
            })
            .catch(error => {
                console.log(error);
                console.log(url);
                alert(`Please enter valid data and try again.
                        Thank you!`);
            });

    }

    findByUserId() {
        const url = `http://localhost:3333/reimbursements/author/userId/${this.state.inputValue}`;
        const config = {
            headers: {
                "Conetent-Type": "application/json",
                authorization: localStorage.getItem("token")
            }
        }
        Axios.get(url, config)
            .then(payload => {
                console.log(payload.data[0]);
                this.setState({
                    ...this.state,
                    reimbursements: payload.data.map((o: any) => {
                        return (
                            <tr key={o.reimbursementid}><th scope="row">{o.reimbursementid}</th>
                                <td>{o.author}</td>
                                <td>{o.amount}</td>
                                <td>{o.datesubmitted.slice(0, -14)}</td>
                                <td>{o.dateresolved && o.dateresolved.slice(0, -14)}</td>
                                <td>{o.description}</td>
                                <td>{o.resolver}</td>
                                <td>{o.status}</td>
                                <td>{o.type}</td>
                            </tr>
                        )
                    })
                });
            })
            .catch(error => {
                console.log(error);
                console.log(url);
            });
    }

    findUsers() {
        // eslint-disable-next-line
        if (this.state.choice == 1) {
            this.findByUserId();
        // eslint-disable-next-line
        } else if (this.state.choice == 2) {
            this.findByStatusId();
        } else {
            console.log(this.state.choice);
            console.log("How did I get here?");
        }
    }

    render() {
        return (
            <div>{console.log("value is:" + this.state.inputValue + "  choice is:" + this.state.choice)}
                <div className="row align-items-center justify-content-center ml-5 mr-5 mb-3 mt-3">
                { this.state.choice === "1" &&
                <input
                    className="ml-2 mr-5"
                    type="text"
                    value={this.state.inputValue}
                    onChange={(e: any) => this.updateValue(e)}
                />
                }
                { this.state.choice === "2" &&
                    <select onChange={(e: any) => this.updateValue(e)}
                        className="ml-2 mr-5"
                        value={this.state.choice == 2 && this.state.inputValue}>
                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                        <option value="2">Denied</option>
                    </select>
                }
                <select onChange={(e: any) => this.updateChoice(e)}
                        className="ml-2 mr-5"
                        value={this.state.choice}>
                    <option value="1">Find Reimbursement By User ID</option>
                    <option value="2">Find Reimbursement By Status</option>
                </select>
                </div>
                <div className="row align-items-center justify-content-center">
                <button onClick={() => this.findUsers()}>Find Reimbursement(s)</button>
                </div>
                <div className="outputBox">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Author</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date Submitted</th>
                                <th scope="col">Date Resolved</th>
                                <th scope="col">Description</th>
                                <th scope="col">Resolver</th>
                                <th scope="col">Status</th>
                                <th scope="col">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reimbursements}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}