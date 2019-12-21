export const findImage = async section => {
  let sections = document.querySelectorAll(`${section} [data-bg-img]`);
  await sections.forEach(async section => {
    const img = await import(`./../../img/${section.dataset.bgImg}`);
    section.style.background = `url(${img.default})`;
    section.style.backgroundSize = "cover";
    section.style.backgroundRepeat = "no-repeat";
  });
};
