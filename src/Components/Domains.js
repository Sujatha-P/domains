import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/posts"
export default function Domains() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");


  function getDate(limit, pagenumber) {
    const urls = ` ${url}?_limit=${limit}&_page=${pagenumber}`
    axios
      .get(urls)
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }
  function handlenext() {
    setPageNumber(pageNumber + 1)
  }

  function handleprev() {
    setPageNumber(pageNumber - 1)
  }

  useEffect(() => {
    getDate(limit, pageNumber);
  }, [limit, pageNumber]);

  return (
    <div className="p-5 m-3 border border-dark">
      <div>
        <input type="search" className="form-control w-25 border-dark" placeholder="Type you Ip" value={search} onChange={(event) => { setSearch(event.target.value) }} />

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
            {data &&
              data.filter((data) => JSON.stringify(data).includes(search)).map(value => {
                return (
                  <tr key={value.id}>
                    <td>{value.userId}</td>
                    <td>{value.body}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <div className=" d-flex float-end border btn-group me-2">
        <button disabled={pageNumber <= 1} onClick={handleprev} className="btn btn-outline-dark">Prev</button>
        <button type="button" className="btn btn-outline-dark">1 OF 5</button>
        <button disabled={data.length < limit} onClick={handlenext} className="btn btn-outline-dark">Next</button>
      </div>
    </div>
  );
}
