const routes = {
  "/": "home",
  "/blog": "blog",
  "#madeontilda": "madeontilda",
  "/features": "features"
};
const parseUrl = () => {
  let url = location.hash.slice(1);
  if (url) {
    return routes[url] ? routes[url] : "404";
  } else {
    return routes["/"];
  }
};

export default {
  parseUrl
};
