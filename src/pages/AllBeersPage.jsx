import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";



function AllBeersPage() {
  // Mock initial state, to be replaced by data from the API. Once you retrieve the list of beers from the Beers API store it in this state variable.
  const [beers, setBeers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Effect hook to fetch all beers or search results from the API
  useEffect(() => {
    // If there's a search query, search for beers; otherwise, get all beers
    const endpoint = searchQuery
      ? `https://beers-api.edu.ironhack.com/beers/search?q=${searchQuery}`
      : "https://beers-api.edu.ironhack.com/beers";

    axios
      .get(endpoint)
      .then((response) => {
        setBeers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching beers:", error);
      });
  }, [searchQuery]);

  // Handler for search input changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };



  // The logic and the structure for the page showing the list of beers. You can leave this as it is for now.
  return (
    <>
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />

      <div className="d-inline-flex flex-wrap justify-content-center align-items-center w-100 p-4">
        {beers &&
          beers.map((beer, i) => {
            return (
              <div key={i}>
                <Link to={"/beers/" + beer._id}>
                  <div className="card m-2 p-2 text-center" style={{ width: "24rem", height: "18rem" }}>
                    <div className="card-body">
                      <img
                        src={beer.image_url}
                        style={{ height: "6rem" }}
                        alt={"image of" + beer.name}
                      />
                      <h5 className="card-title text-truncate mt-2">{beer.name}</h5>
                      <h6 className="card-subtitle mb-3 text-muted">
                        <em>{beer.tagline}</em>
                      </h6>
                      <p className="card-text">
                        Created by: {beer.contributed_by}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default AllBeersPage;
