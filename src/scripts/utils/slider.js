const initializeSlide = id => {
  let slider = document.querySelector(`#${id}`);
  let slides = [],
    slide = 0,
    sliderDots = slider.querySelector(".slider-dots"),
    dots = [],
    container = null || slider.querySelector(".auto-height");
  slides = slider.querySelectorAll(".slider-img");

  slides.forEach((slide, i) => {
    let dot = document.createElement("div");
    dot.classList.add("slider-dot");
    dot.setAttribute("data-slide", i);
    slide.setAttribute("data-slide", i);
    sliderDots.appendChild(dot);
    dots.push(dot);
  });

  slides[slide].classList.add("active");
  dots[slide].classList.add("active-dot");

  const checkSlide = () => {
    console.log(slide);
    slides.forEach(slide => slide.classList.remove("active"));
    slides[slide].classList.add("active");
    dots.forEach(dot => dot.classList.remove("active-dot"));
    dots[slide].classList.add("active-dot");
    computeHeight();
  };

  const computeHeight = () => {
    if (!container) return;
    let newH = slides[slide].offsetHeight,
      sliderWrapper = slider.querySelector(".slider-wrapper");
    sliderWrapper.style.height = `${newH}px`;
  };

  const arrowLeft = () => {
    if (slide <= 0) {
      slide = slides.length - 1;
    } else {
      slide -= 1;
    }
    checkSlide();
  };

  const arrowRight = () => {
    if (slide >= slides.length - 1) {
      slide = 0;
    } else {
      slide += 1;
    }
    checkSlide();
  };
  const handleDot = e => {
    if (e.target == e.currentTarget) return;
    let i = e.target.dataset.slide;
    slide = +i;
    checkSlide();
  };

  computeHeight();
  slider.querySelector(".left-arrow").addEventListener("click", arrowLeft);
  slider.querySelector(".right-arrow").addEventListener("click", arrowRight);
  sliderDots.addEventListener("click", handleDot);
};

export default {
  initializeSlide
};
