const render = async (content, progress) => {
  content.insertAdjacentHTML(
    "beforeend",
    `<div class="container-fluid">
      <div class="row">
        <div
          class="col-12 col-lg-6 header-img d-flex position-relative align-items-center img-bg vh-100"
          data-bg-img="tilda_index_white_a.png"
        >
          <img
            src="./img/logoblackontransparency.png"
            alt=""
            class="d-block mx-auto"
          />
          <div data-scroll="features" class="scroller arrow"></div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="card vh-100 border-light">
            <div class="card-body d-flex flex-column justify-content-center">
              <h1 class="card-title">
                Создайте<br />
                впечатляющий сайт<br />
                на Tilda
                <small
                  >для бизнеса<br />
                  и медиа</small
                >
              </h1>
              <p class="card-text mt-3">
                450+ профессиональных блоков готовы для вашего сайта и
                интернет-магазина
              </p>
              <div class="container-fluid p-0">
                <button data-scroll="features-scroll" class="scroller letter-space line-height btn btn-outline-dark mt-3 mr-2 py-3 px-5">
                  Обзор
                </button>
                <button class="btn btn-primary letter-space line-height py-2 mt-3 mr-2 py-3 px-5">
                  Создать сайт бесплатно
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
  );
  progress.chunkLoaded(100 / (+sections.length + 1));
  const asyncForEach = async (array, callback) => {
    for (let i = 0; i < array.length; i++) {
      await callback(array[i], i, array);
    }
  };
  await asyncForEach(sections, async sect => {
    let piece = await import(`./home.sections/${sect}`);
    let section = await piece.default.summonSection();
    content.insertAdjacentHTML("beforeend", section);
    progress.chunkLoaded(100 / (+sections.length + 1));
  });
};
const afterRender = async (
  coverImage = null,
  buttonScroll = null,
  slider = null
) => {
  if (coverImage) {
    coverImage(".main_content");
  }
  if (buttonScroll) {
    document.querySelectorAll(".scroller").forEach(i => {
      i.addEventListener("click", () =>
        buttonScroll(document.querySelector(`.${i.dataset.scroll}`))
      );
    });
  }
  if (slider) {
    slider.initializeSlide("keySlider");
    slider.initializeSlide("keySlider2");
    slider.initializeSlide("crewSlider");
  }
};
let sections = [
  "home.features.js",
  "home.keyfeatures.js",
  "home.crew.js",
  "home.website.js",
  "home.services.js",
  "home.offers.js",
  "home.education.js"
];
export default {
  render,
  afterRender
};
