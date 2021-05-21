import React, { useState, useEffect } from "react";

import download from "../../assets/download.svg";
import circle from "../../assets/circle.svg";
import content from "../../data/content";

function FileTable() {
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    content.map((item) => (item.isChecked = false));
    setSelectedCount(0);
  }, []);

  const selectDeselectAll = () => {
    if (selectedCount === content.length) {
      content.map((item) => (item.isChecked = false));
      setSelectedCount(0);
    } else {
      content.map((item) => (item.isChecked = true));
      setSelectedCount(content.length);
    }
  };

  const handleCheckboxSelect = (event) => {
    content.forEach((item) => {
      if (event.target.id === item.name) {
        if (item.isChecked === true) {
          item.isChecked = false;
          if (selectedCount === 1)
            document.getElementById("all-checkbox").indeterminate = false;
          else document.getElementById("all-checkbox").indeterminate = true;
          setSelectedCount(selectedCount - 1);
        } else {
          item.isChecked = true;
          if (selectedCount === content.length - 1)
            document.getElementById("all-checkbox").indeterminate = false;
          else document.getElementById("all-checkbox").indeterminate = true;
          setSelectedCount(selectedCount + 1);
        }
      }
    });
  };

  const handleDownloadClick = () => {
    let message = "";
    content.forEach((item) => {
      if (
        item.isChecked === true &&
        item.status.toLowerCase() === "available"
      ) {
        message += "Device: " + item.device + "\nPath: " + item.path + "\n\n";
      }
    });
    message += "Note: Only Available devices may be downloaded";
    alert(message);
  };

  return (
    <React.Fragment>
      <input
        type="checkbox"
        id="all-checkbox"
        data-testid="all-checkbox"
        className="all-checkbox"
        checked={selectedCount === content.length}
        onChange={selectDeselectAll}
      />
      <label htmlFor="all-checkbox">
        {selectedCount === 0 ? "None Selected" : "Selected " + selectedCount}
      </label>
      <button
        title={
          selectedCount === 0
            ? "None selected"
            : "Only Available devices may be downloaded"
        }
        className="download-button"
        disabled={selectedCount === 0}
        onClick={handleDownloadClick}
      >
        <img
          aria-hidden="true"
          className="download-icon"
          alt="download"
          src={download}
        />
        Download Selected
      </button>
      <table
        data-testid="table-list"
        aria-label="List selector"
        aria-rowcount={content.length}
      >
        <thead>
          <tr>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Device</th>
            <th scope="col">Path</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item) => (
            <tr
              roll="row"
              key={item.name}
              className={item.isChecked ? "active" : ""}
            >
              <td role="cell">
                <input
                  type="checkbox"
                  className="list-checkbox"
                  id={item.name}
                  checked={item.isChecked ? item.isChecked : false}
                  onChange={handleCheckboxSelect}
                />
              </td>
              <td role="cell">{item.name}</td>
              <td role="cell">{item.device}</td>
              <td role="cell">{item.path}</td>
              <td role="cell">
                {item.status === "available" && (
                  <img
                    aria-hidden="true"
                    className="circle-icon"
                    alt="circle"
                    src={circle}
                  />
                )}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default FileTable;
