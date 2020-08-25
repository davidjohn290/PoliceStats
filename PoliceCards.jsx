import React from "react";

const PoliceCards = (props) => {
  const dataObject = props.data;
  if (dataObject.object_of_search === null) {
    dataObject.object_of_search = "No reason available";
  }
  return (
    <div className="policeCards">
      <p>Date of Arrest: {dataObject.datetime}</p>
      <p>Age of person searched: {dataObject.age_range}</p>
      <p>Reason for search: {dataObject.object_of_search}</p>
      <p>Type of search: {dataObject.type}</p>
      <p>Outcome of search: {dataObject.outcome}</p>
    </div>
  );
};

export default PoliceCards;
