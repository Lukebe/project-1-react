import * as React from "react";
import Axios from "axios";

export class UpdateReimbursementComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursementid: "",
            author: "",
            amount: "",
            dateSubmitted: "",
            dateResolved: "",
            description: "",
            resolver: "",
            status: "",
            type: "",
            data: {},
            reimbursement: []
        };
    }
    updateReimbursementId(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            // reimbursementid: value,
            data: {...this.state.data, reimbursementid: value}
        });
    }
    updateAuthor(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            // author: value,
            data: {...this.state.data, author: value}
        });
    }
    updateAmount(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            // amount: value,
            data: {...this.state.data, amount: value}
        });
    }
    updateDateSubmitted(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }       
        this.setState({
            ...this.state,
            // dateSubmitted: value,
            data: {...this.state.data, dateSubmitted: value}
        });
    }
    updateDateResolved(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }        
        this.setState({
            ...this.state,
            // dateResolved: value,
            data: {...this.state.data, dateResolved: value}
        });
    }

    updateDescription(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            // description: value,
            data: {...this.state.data, description: value}
        });
    }

    updateResolver(e: any) {
        let value = e.target.value;
        if (value === ""){
            value = undefined;
        }
        this.setState({
            ...this.state,
            // resolver: value,
            data: {...this.state.data, resolver: value}
        });
    }

    updateStatus(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            // status: value,
            data: { ...this.state.data, status: value }
        });
    }

    updateType(e: any) {
        let value = e.target.value;
        if (value === "") {
            value = undefined;
        }
        this.setState({
            ...this.state,
            // type: value,
            data: { ...this.state.data, type: value }
        });
    }

    updateReimbursementInDatabase() {
        const url = `http://localhost:3333/reimbursements`;
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
                    reimbursement: (
                        <tr key={payload.data.reimbursementid}><th scope="row">{payload.data.reimbursementid}</th>
                            <td>{payload.data.author}</td>
                            <td>{payload.data.amount}</td>
                            <td>{payload.data.datesubmitted.slice(0, -14)}</td>
                            <td>{payload.data.dateresolved && payload.data.dateresolved.slice(0, -14)}</td>
                            <td>{payload.data.description}</td>
                            <td>{payload.data.resolver}</td>
                            <td>{payload.data.status}</td>
                            <td>{payload.data.type}</td>
                        </tr>
                    )
                })
                console.log(payload.data.reimbursementid);
                
            })
            .catch(error => {
                console.log(error);
                console.log(url);
            });
    }

    render() {
        return (
            <div>
                <div>Reimbursement ID: </div>
                <input
                    type="text"
                    value={this.state.reimbursementid}
                    onChange={(e: any) => this.updateReimbursementId(e)}
                /><br />
                <div>Author By User ID: </div>
                <input
                    type="text"
                    value={this.state.author}
                    onChange={(e: any) => this.updateAuthor(e)}
                />
                <div>Amount: </div>
                <input
                    type="text"
                    value={this.state.amount}
                    onChange={(e: any) => this.updateAmount(e)}
                />
                <div>Date Submitted: </div>
                <input
                    type="text"
                    value={this.state.datesubmitted}
                    onChange={(e: any) => this.updateDateSubmitted(e)}
                />
                <div>Resolved By Resolved ID: </div>
                <input
                    type="text"
                    value={this.state.dateresolved}
                    onChange={(e: any) => this.updateDateResolved(e)}
                />
                <div>Description: </div>
                <input
                    type="text"
                    value={this.state.description}
                    onChange={(e: any) => this.updateDescription(e)}
                />
                <div>Resolver By User ID: </div>
                <input
                    type="text"
                    value={this.state.resolver}
                    onChange={(e: any) => this.updateResolver(e)}
                />
                <div>Status By Status ID: </div>
                <input
                    type="text"
                    value={this.state.status}
                    onChange={(e: any) => this.updateStatus(e)}
                />
                <div>Type By Type ID: </div>
                <input
                    type="text"
                    value={this.state.type}
                    onChange={(e: any) => this.updateType(e)}
                />
                <br /><br />
                <button onClick={() => this.updateReimbursementInDatabase()}>Update Reimbursement</button>
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
                            {this.state.reimbursement}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}
