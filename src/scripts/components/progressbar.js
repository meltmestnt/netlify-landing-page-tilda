const initializeProgress = () => {
  let progress = document.querySelector(".progress"),
    bar = progress.firstElementChild,
    iterator = 0;
  const progressTick = () => {
    if (iterator >= 100) {
      stopProgress();
    }
    bar.style.width = `${iterator}%`;
    iterator++;
  };
  const stopProgress = () => {
    clearInterval(id);
    bar.style.opacity = `0`;
    setInterval(() => (bar.style.width = `0%`), 1000);
  };
  const chunkLoaded = percent => {
    bar.style.width = `${iterator + percent}%`;
    iterator += percent;
  };
  let id = setInterval(progressTick, 500);
  return {
    chunkLoaded,
    stopProgress
  };
};

export default {
  initializeProgress
};
