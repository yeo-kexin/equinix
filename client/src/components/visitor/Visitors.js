import React, { Component } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Visitors extends Component {
    constructor() {
        super();
        this.state = {
          date: new Date(),
          visitors: null,
          regions: [],
          countries: [],
          totalVisitors: null,
          totalRegions: [],
          totalCountries: [],
          rushHours: [],
          rushHour: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        this.getNumberOfVisitors(this.props.id, this.formatDate(this.state.date));
        this.getTotalNumberOfVisitors(this.props.id, this.formatDate(this.state.date));
        this.getTotalVisitorsByRegion(this.props.id, this.formatDate(this.state.date));
        this.getTotalVisitorsByCountry(this.props.id, this.formatDate(this.state.date));
        this.getRushHours(this.props.id, this.formatDate(this.state.date));
    }

    formatDate(date) {
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();
        var year = date.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    handleChange(event) {
        this.setState({date: new Date(event)});
        this.getNumberOfVisitors(this.props.id, this.formatDate(new Date(event)));
        this.getVisitorsByRegion(this.props.id, this.formatDate(new Date(event)));
        this.getVisitorsByCountry(this.props.id, this.formatDate(new Date(event)));
    }
    
    handleClick(day) {
        this.setState({
            rushHour: -1
        });
        for (let i = 0; i < this.state.rushHours.length; i++) {
            const element = this.state.rushHours[i];
            if (element.day == day) {
                this.setState({
                    rushHour: element.hour
                });
                return;
            }
        }
    }

    getNumberOfVisitors = (id, date) => {
        axios
        .get(`/api/visitors/${id}/${date}`)
        .then((res) => {
          if (res.data) {
              this.setState({
                  visitors: res.data.data[0].count
              });
          } 
        })
        .catch((err) => console.log(err));
    };

    getVisitorsByRegion = (id, date) => {
        axios
        .get(`/api/visitors/region/${id}/${date}`)
        .then((res) => {
          if (res.data) {
              this.setState({
                  regions: res.data.data
              });
          } 
        })
        .catch((err) => console.log(err));
    };

    getVisitorsByCountry = (id, date) => {
        axios
        .get(`/api/visitors/country/${id}/${date}`)
        .then((res) => {
          if (res.data) {
              this.setState({
                  countries: res.data.data
              });
          } 
        })
        .catch((err) => console.log(err));
    };

    getTotalNumberOfVisitors = (id, date) => {
        axios
        .get(`/api/visitors/total/${id}/${date}`)
        .then((res) => {
          if (res.data) {
              this.setState({
                  totalVisitors: res.data.data[0].count
              });
          } 
        })
        .catch((err) => console.log(err));
    };
    
    getTotalVisitorsByRegion = (id, date) => {
        axios
        .get(`/api/visitors/total/region/${id}/${date}`)
        .then((res) => {
          if (res.data) {
              this.setState({
                  totalRegions: res.data.data
              });
          } 
        })
        .catch((err) => console.log(err));
    };

    getTotalVisitorsByCountry = (id, date) => {
        axios
        .get(`/api/visitors/total/country/${id}/${date}`)
        .then((res) => {
          if (res.data) {
              this.setState({
                  totalCountries: res.data.data
              });
          } 
        })
        .catch((err) => console.log(err));
    };

    getRushHours = (id, date) => {
        axios
        .get(`/api/visitors/hours/${id}/${date}`)
        .then((res) => {
          if (res.data) {
              this.setState({
                  rushHours: res.data.data
              });
          } 
        })
        .catch((err) => console.log(err));
    };

    render() {
        return <div>
            <label for="dateInput">Date of visit: </label>
            <DatePicker id="dateInput" selected={this.state.date} onChange={this.handleChange} />
            <div class="container">
                <div class="row mt-3">
                    <div class="col-3">
                        Number of visitors: {this.state.visitors}
                    </div>
                    <div class="col-3">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-dark">Regions</li>
                            {this.state.regions && this.state.regions.length > 0
                            ? (this.state.regions.map((region) => {
                                return <li class="list-group-item">{region.region}: {region.count}</li>
                            }))
                            : <li class="list-group-item">No visitors on this date</li>
                            }
                        </ul>
                    </div>
                    <div class="col-3">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-dark">Countries</li>
                            {this.state.countries && this.state.countries.length > 0
                            ? (this.state.countries.map((country) => {
                                return <li class="list-group-item">{country.country}: {country.count}</li>
                            }))
                            : <li class="list-group-item">No visitors on this date</li>
                            }
                        </ul>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-3">
                    Total number of visitors so far: {this.state.totalVisitors}
                    </div>
                    <div class="col-3">
                        <li class="list-group-item list-group-item-dark">Regions</li>
                        <ul class="list-group">
                            {this.state.totalRegions && this.state.totalRegions.length > 0
                            ? (this.state.totalRegions.map((region) => {
                                return <li class="list-group-item">{region.region}: {region.count}</li>
                            }))
                            : <li class="list-group-item">No visitors on this date</li>
                            }
                        </ul>
                    </div>
                    <div class="col-3">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-dark">Countries</li>
                            {this.state.totalCountries && this.state.totalCountries.length > 0
                            ? (this.state.totalCountries.map((country) => {
                                return <li class="list-group-item">{country.country}: {country.count}</li>
                            }))
                            : <li class="list-group-item">No visitors on this date</li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-3">Rush hour on each day: </div>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-secondary" onClick={() => this.handleClick(0)}>
                    Sun
                </button>
                <button type="button" class="btn btn-secondary" onClick={() => this.handleClick(1)}>
                    Mon
                </button>
                <button type="button" class="btn btn-secondary" onClick={() => this.handleClick(2)}>
                    Tue
                </button>
                <button type="button" class="btn btn-secondary" onClick={() => this.handleClick(3)}>
                    Wed
                </button>
                <button type="button" class="btn btn-secondary" onClick={() => this.handleClick(4)}>
                    Thu
                </button>
                <button type="button" class="btn btn-secondary" onClick={() => this.handleClick(5)}>
                    Fri
                </button>
                <button type="button" class="btn btn-secondary" onClick={() => this.handleClick(6)}>
                    Sat
                </button>
            </div>
            <div>
                {this.state.rushHour 
                    ? this.state.rushHour == -1
                        ? "No one has visited IBX on this day."
                        : `Rush hour: ${this.state.rushHour}:00` 
                    : null}
            </div>
        </div>
    }
}

export default Visitors;