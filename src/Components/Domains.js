import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://api.ipbase.com/v2/info?apikey=LOBzs0ZLnloduL3f3a3lYh5XRfNQQ7xkfGdqY9LN&ip=1.1.1.1";

export default function Domains() {
  const [data, setData] = useState({});
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");

  function fetchData() {
    const apiUrl = `${url}&_limit=${limit}&_page=${pageNumber}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data); 
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

  }

  function handleNext() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function handlePrev() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  useEffect(() => {
    fetchData(limit, pageNumber);
  }, [limit, pageNumber]);

  return (
    <div className="p-5 m-3 border border-dark">
      <div>
        <input
          type="search"
          className="form-control w-25 border-dark"
          placeholder="Type your IP"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="mt-3">
        <table className="table table-hover table-bordered border-dark ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Domain Name</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data
                .filter((item) => JSON.stringify(item).includes(search))
                .map((value,index) => (
                  <tr key={index+1}>
                    <td>{value.id}</td>
                    <td>{value.domains.domains}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex float-end border btn-group me-2">
        <button disabled={pageNumber <= 1} onClick={handlePrev} className="btn btn-outline-dark">
          Prev
        </button>
        <button type="button" className="btn btn-outline-dark">
          {pageNumber} OF {Math.ceil(data.length / limit)}
        </button>
        <button disabled={data.length < limit} onClick={handleNext} className="btn btn-outline-dark">
          Next
        </button>
      </div>
    </div>
  );
}
