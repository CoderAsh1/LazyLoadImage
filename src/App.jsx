import "./App.css";
import fetchData from "./fetchData";
import React, { useState, useEffect, Suspense } from "react";
import Pagination from "./Components/pagination/Pagination";
import { Routes, Route, Link } from "react-router-dom";
import Masonry from "react-masonry-css";
const LazyLoad = React.lazy(() => import("./Components/lazyload/LazyLoad"));

function App() {
  const [data, setData] = useState([]);
  const [postPerPage, setPostPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("dogs");
  const [value, setValue] = useState("");

  let indexOfLastUser = currentPage * postPerPage;
  let indexOfFirstUser = indexOfLastUser - postPerPage;
  let currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  async function handleData() {
    let temp = await fetchData(query);
    setData(temp);
  }

  function handleChange(e) {
    setValue(e.target.value);
    e.target.value === ""
      ? setQuery("dogs")
      : setTimeout(() => {
          setQuery(e.target.value);
        }, 2000);
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  useEffect(() => {
    handleData(query);
  }, [query]);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <header>
                <input
                  type="text"
                  value={value}
                  onChange={handleChange}
                  id="search"
                  placeholder="search..."
                  autoFocus={true}
                />
                <Link to="/lazy">
                  <button id="lazy">LazyLoad on Scroll</button>
                </Link>
              </header>

              <Masonry
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                breakpointCols={breakpointColumnsObj}
              >
                {currentUsers.map((photos, i) => (
                  <div className="imgContainer">
                    <img
                      key={i}
                      src={photos.urls.regular}
                      alt={photos.alt_description}
                    />
                  </div>
                ))}
                <Pagination
                  data={data}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  postPerPage={postPerPage}
                />
              </Masonry>
            </>
          }
        />
        <Route
          exact
          path="/lazy"
          element={
            <Suspense fallback="loading">
              <LazyLoad />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
