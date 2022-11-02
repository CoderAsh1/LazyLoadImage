import "./App.css";
import fetchData from "./fetchData";
import { useState, useEffect } from "react";
import Pagination from "./Components/pagination/Pagination";
import { Routes, Route, Link } from "react-router-dom";
import LazyLoad from "./Components/lazyload/LazyLoad";

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
                  <button>LazyLoad</button>
                </Link>
              </header>

              <div className="wrapper">
                {currentUsers.map((photos, i) => (
                  <img
                    key={i}
                    src={photos.urls.regular}
                    alt={photos.alt_description}
                  />
                ))}
                <Pagination
                  data={data}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  postPerPage={postPerPage}
                />
              </div>
            </>
          }
        />
        <Route exact path="/lazy" element={<LazyLoad />} />
      </Routes>
    </div>
  );
}

export default App;
