import "./../styles/main.scss";

import Navbar from "./components/navbar";
import { findImage } from "./utils/image-cover-finder";
import router from "./utils/router";
import slider from "./utils/slider";
import scrollHandler from "./utils/scroll-handle";
import Progress from "./components/progressbar";
import Footer from "./components/footer";

const renderPage = async () => {
  let header = null || document.querySelector(".nav_all"),
    content = null || document.querySelector(".main_content"),
    footer = null || document.querySelector(".footer_all"),
    parsedUrl = router.parseUrl();
  let progress = Progress.initializeProgress();
  header.innerHTML = await Navbar.render();
  await Navbar.afterRender();
  footer.innerHTML = await Footer.render();
  let template = await import(`./views/${parsedUrl}`);
  await template.default.render(content, progress);
  await template.default.afterRender(findImage, scrollHandler.scrollTo, slider);
  anime.default({
    targets: "body > .container-fluid",
    opacity: 1,
    autoplay: true,
    duration: 8000
  });
  window.addEventListener("scroll", scrollHandler.scrollHandle);
};

window.addEventListener("load", renderPage);
window.addEventListener("hashchange", renderPage);
