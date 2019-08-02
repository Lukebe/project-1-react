import * as React from "react";
import Axios from "axios";

export class CreateReimbursementComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      amount: "",
      description: "",
      type: 0,
      data: {},
      reimbursement: []
    };
  }

  updateAmount(e: any) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      amount: value,
      data: { ...this.state.data, amount: value }

    });
  }
  updateDescription(e: any) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      description: value,
      data: { ...this.state.data, description: value }

    });
  }
  updateType(e: any) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      ...this.state,
      type: value,
      data: { ...this.state.data, type: value }

    });
  }

  createReimbursement() {
    const url = `http://localhost:3333/reimbursements`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")
      }
    }
    Axios.post(url, this.state.data, config)
      .then(payload => {
        console.log(payload.data.reimbursementid);
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
          <div className="col-2">Amount: </div>
          <input
            type="text"
            value={this.state.amount}
            onChange={(e: any) => this.updateAmount(e)}
          />
          <div className="col-2">Description: </div>
          <input
            type="text"
            value={this.state.description}
            onChange={(e: any) => this.updateDescription(e)}
          />
          <div className="col-2">Type: </div>
          <select onChange={(e: any) => this.updateType(e)}>
            <option value="0">Lodging</option>
            <option value="1">Travel</option>
            <option value="2">Food</option>
            <option value="3">Other</option>
          </select>
        </div>
        <br /><br />
        <div className="row align-items-center justify-content-center">
        <button onClick={() => this.createReimbursement()}>Save Reimbursement</button>
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
              {this.state.reimbursement}
            </tbody>

          </table>
        </div>
      </div>
    );
  }
}
