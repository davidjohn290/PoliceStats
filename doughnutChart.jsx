import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
const { getProperties, putDataIntoObject } = require("../utilis/getProperties");

class DoughnutChart extends Component {
  state = {
    city: "cheshire",
    chartCity: "Cheshire",
    policeDataKeys: [],
    policeDataValues: [],
  };

  componentDidMount() {
    console.log("has mounted doughnut");
    this.getPoliceChartData(this.state.city).then((res) => {
      const keys = Object.keys(res);
      const values = Object.values(res);
      this.setState({ policeDataKeys: keys, policeDataValues: values });
    });
  }

  changeChart = (clickEvent) => {
    clickEvent.preventDefault();
    const city = clickEvent.target.value;
    this.setState((currentState) => {
      return { city };
    });
  };

  handleChartSubmit = (submitEvent) => {};

  getPoliceChartData(city) {
    return fetch(`https://data.police.uk/api/stops-force?force=${city}`)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        const result = getProperties(res, "object_of_search");
        const dataObject = putDataIntoObject(result);
        return dataObject;
      });
  }

  handleConsoleLog = (clickEvent) => {
    clickEvent.preventDefault();
    console.log(this.state.city);
  };

  render() {
    const data = {
      labels: this.state.policeDataKeys,
      datasets: [
        {
          data: this.state.policeDataValues,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
    return (
      <div>
        <div className="chart">
          <p>Graph of reasons for stop and searches</p>
          <Doughnut data={data} />
          <form>
            <label>
              Change what chart is showing:
              <select onInput={this.changeChart}>
                <option value=""></option>
                <option value="cheshire">Cheshire</option>
                <option value="merseyside">Merseyside</option>
                <option value="lancashire">Lancashire</option>
              </select>
            </label>
            <button>Submit</button>
          </form>
        </div>
        <button onClick={this.handleConsoleLog}>Console Log</button>
      </div>
    );
  }
}

export default DoughnutChart;
