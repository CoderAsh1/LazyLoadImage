import React, { useEffect, useState } from "react";
import fetchData from "../../fetchData";
import "./lazyload.scss";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";

const LazyLoad = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("dogs");
  const [value, setValue] = useState("");
  let page = 1;

  // function on search
  function handleChange(e) {
    setValue(e.target.value);
    e.target.value === ""
      ? setQuery("dogs")
      : setTimeout(() => {
          setQuery(e.target.value);
        }, 1200);
  }

  // Function on scroll
  async function handleDataScroll() {
    let temp = await fetchData(query, page);
    let res = [...temp];
    setData((oldResult) => [...oldResult.concat(...res)]);
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      page += 1;
      console.log(query);
      handleDataScroll(query, page);
    }
  };

  // funciton on load
  async function handleData() {
    let temp = await fetchData(query, page);
    setData(temp);
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  useEffect(() => {
    handleData(query, page);
    window.addEventListener("scroll", handleScroll);
  }, [query, page]);

  return (
    <div>
      <header>
        <Link to="/">
          <button id="back">Back</button>
        </Link>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          id="search"
          placeholder="search..."
          autoFocus={true}
        />
      </header>
      <Masonry className="wrapper" breakpointCols={breakpointColumnsObj}>
        {data.map((photos, i) => (
          <img key={i} src={photos.urls.regular} alt={photos.alt_description} />
        ))}
      </Masonry>
    </div>
  );
};

export default LazyLoad;
