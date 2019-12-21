const scrollHandle = () => {
  let sections = document.querySelectorAll("section");
  sections.forEach(async section => {
    if (!section.querySelectorAll(".transitioned")) return;
    if (pageYOffset >= section.getBoundingClientRect().top) {
      let animation = anime.default({
        targets: section.querySelectorAll(".transitioned"),
        opacity: [0, 1],
        translateX: [`-10%`, `0%`],
        duration: 2000,
        delay: (el, i, l) => i * 250,
        begin: ({ animatables }) => {
          animatables.forEach(i => i.target.classList.remove("transitioned"));
        }
      });
    }
  });
};

const scrollTo = sect => {
  let distance = +sect.getBoundingClientRect().top + pageYOffset,
    incrementor = Math.sqrt(distance) / 10;
  const scroller = () => {
    let scroll = document.documentElement.scrollTop;
    if (scroll + incrementor >= distance) {
      document.documentElement.scrollTop = distance;
      clearInterval(id);
      return;
    } else {
      document.documentElement.scrollTop = +scroll + incrementor;
      incrementor =
        scroll / distance >= 0.9
          ? incrementor > 4
            ? incrementor - 0.5
            : 4
          : incrementor + 0.3;
    }
  };
  let id = setInterval(scroller, 1);
};

export default {
  scrollHandle,
  scrollTo
};
