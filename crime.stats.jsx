import React, { Component } from "react";
import * as api from "../api";
import PoliceCards from "./PoliceCards";

class CrimeStats extends Component {
  state = {
    policeData: [],
    isLoading: true,
    sortByDate: "",
    emptySortBy: false,
    city: "cheshire",
    limit: 50,
    searchBy: "",
    searchFor: "",
  };

  componentDidMount() {
    console.log("has been mounted");
    api.getPoliceData("cheshire", this.state.limit).then((funcPoliceData) => {
      this.setState({ policeData: funcPoliceData, isLoading: false });
    });
  }

  handleSortBy = (clickEvent) => {
    clickEvent.preventDefault();
    const value = clickEvent.target.value;
    this.setState(() => {
      return { sortByDate: value };
    });
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    api.getPoliceData(this.state.city, this.state.limit).then((res) => {
      this.setState(({ sortByDate }) => {
        const filteredData = res.filter((data) => data.datetime === sortByDate);
        if (filteredData.length === 0) return { emptySortBy: true };
        else return { policeData: filteredData, emptySortBy: false };
      });
    });
  };

  handleMerseysideStats = (clickEvent) => {
    clickEvent.preventDefault();
    api.getPoliceData("merseyside", this.state.limit).then((policeData) => {
      this.setState({ policeData, city: "merseyside" });
    });
  };

  handleDefaultCheshire = (clickEvent) => {
    clickEvent.preventDefault();
    api.getPoliceData("cheshire", this.state.limit).then((policeData) => {
      this.setState({ policeData, city: "cheshire" });
    });
  };

  handleLancashireStats = (clickEvent) => {
    clickEvent.preventDefault();
    api.getPoliceData("lancashire", this.state.limit).then((policeData) => {
      this.setState({ policeData, city: "lancashire" });
    });
  };

  handlePageLimit = (inputEvent) => {
    const pageLimit = inputEvent.target.value;
    this.setState({ limit: pageLimit });
  };

  handleSearchButton = (submitEvent) => {
    submitEvent.preventDefault();
    const { searchBy, searchFor, policeData } = this.state;
    const filteredResults = policeData.filter((data) => {
      const value = data[searchBy];
      const includesWord = value.toString().includes(searchFor);
      return includesWord;
    });
    this.setState({ policeData: filteredResults, searchBy: "", searchFor: "" });
  };

  handleSearchDropDown = (inputEvent) => {
    const searchBy = inputEvent.target.value;
    this.setState({ searchBy });
  };

  handleSearchInput = (inputEvent) => {
    const searchFor = inputEvent.target.value;
    this.setState({ searchFor });
  };

  render() {
    const { isLoading, policeData } = this.state;
    if (isLoading) return <p>data is loading</p>;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Sort by date:
            <input type="date" onInput={this.handleSortBy} />
            <button type="submit">Submit</button>
            <p id="emptySortBy">
              {this.state.emptySortBy ? "No stop and searches found" : null}{" "}
            </p>
          </label>
        </form>
        <form onSubmit={this.handleSearchButton}>
          <label>
            Search By:
            <select onInput={this.handleSearchDropDown}>
              <option value=""></option>
              <option value="age_range">Age</option>
              <option value="object_of_search">Reason</option>
              <option value="type">Type</option>
              <option value="outcome">Outcome</option>
            </select>
            <input type="text" id="searchBy" onInput={this.handleSearchInput} />
            <button type="submit">Search</button>
          </label>
        </form>
        <label>
          Number of stats shown on page:
          <input type="number" id="statsBox" onInput={this.handlePageLimit} />
        </label>
        <br />
        <button onClick={this.handleDefaultCheshire}>Cheshire</button>
        <button onClick={this.handleMerseysideStats}>Merseyside</button>
        <button onClick={this.handleLancashireStats}>Lancashire</button>
        {policeData.map((data, index) => {
          return <PoliceCards data={data} key={`data${index}`} />;
        })}
      </div>
    );
  }
}

export default CrimeStats;
