import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
const { getProperties, putDataIntoObject } = require("../utilis/getProperties");

class DoughnutChart extends Component {
  state = {
    city: "cheshire",
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
    console.log(this.props);
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
        </div>
        <button onClick={this.handleConsoleLog}>Console Log</button>
      </div>
    );
  }
}

export default DoughnutChart;
