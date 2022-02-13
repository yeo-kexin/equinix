import React, { Component } from "react";
import axios from 'axios';
import Visitors from "./Visitors";

class VisitorPage extends Component {
    constructor() {
        super();
        this.state = {
          id: null,
          isValidated: false,
          showError: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateId = (id) => {
        axios
          .get(`/api/ibx/${id}`)
          .then((res) => {
            if (res.data.data) {
                this.setState({
                    isValidated: true,
                    showError:false
                });
            } else {
                this.setState({
                    isValidated: false,
                    showError: true,
                })
            }
          })
          .catch((err) => console.log(err));
      };

    handleChange(event) {
        this.setState({
            id: event.target.value
        });
    }

    handleSubmit(event) {
        this.setState({
            isValidated: false
        })
        this.validateId(this.state.id);
        event.preventDefault();
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div class="form-group mb-3">
                    <label for="ibxInput">IBX id:</label>
                    <div class="input-group">
                        <input id="ibxInput" type="number" class="form-control"
                            value={this.state.id} onChange={this.handleChange} />
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                    {this.state.showError 
                        ? <div id="validateIbxInput" class="text-danger">
                            Please enter a valid IBX id.
                        </div> 
                        : null
                    }
                </div>
            </form>
            {this.state.isValidated ? <Visitors id={this.state.id}/>: null }
        </div>
    }
}

export default VisitorPage;