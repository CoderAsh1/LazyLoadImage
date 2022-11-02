import axios from "axios";

async function getData(query, page = 1) {
  let response = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=-FyIdvqLptFkim4J6dvcFWC24kxNRPdJ5wJSMEFBcDs&query=${query}&per_page=30&page=${page}`
  );
  return response.data.results;
}

export default getData;
