import * as React from "react";
import Axios from "axios";

export class LogoutComponent extends React.Component<any, any> {
   

    logoutFunction(){
        localStorage.removeItem("token");
        // this.props.history.push('/home');
        window.location.reload(true);
    }
    render() {
        return(
            <button onClick={() => this.logoutFunction()} className="btn btn-outline-primary text-primary rounded-pill bg-light">Logout</button>
        )
    }

}
