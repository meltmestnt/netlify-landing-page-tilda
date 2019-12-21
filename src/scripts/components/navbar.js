const render = async () => {
  return `
  <nav
    class="navbar navbar-expand-lg font-weight-bold bg-transparent py-3 px-5"
    role="navigation"
    id="custom-nav"
  >
    <a href="#" class="navbar-brand text-dark mx-auto font-weight-bold">
      Tilda Publishing
    </a>
    <div class="navbar-collapse justify-content-end">
      <ul class="navbar-nav navbar_cust align-items-center">
        <li class="nav-item mx-2">
          <a href="#" class="nav-link">
            Тарифы
          </a>
        </li>
        <li class="nav-item mx-2">
          <a href="#" class="nav-link">
            #Madeontilda
          </a>
        </li>
        <li class="nav-item mx-2">
          <a href="#" class="nav-link">
            Блог
          </a>
        </li>
        <li class="nav-item mx-2">
          <a href="#" class="nav-link">
            Войти
          </a>
        </li>
        <li class="nav-item mx-2">
          <a href="#" class="nav-link btn btn-outline-dark py-2 px-4">
            Регистрация
          </a>
        </li>
      </ul>
    </div>
  </nav>`;
};

const afterRender = async () => {
  let nav = document.querySelector(".navbar");
  const handleScroll = () => {
    if (pageYOffset >= 100) {
      nav.classList.remove("bg-transparent");
    } else {
      nav.classList.add("bg-transparent");
    }
  };
  if (document.documentElement.clientWidth >= 960) {
    nav.classList.add("fixed-top");
    window.addEventListener("scroll", handleScroll);
  }
  window.addEventListener("resize", () => {
    if (document.documentElement.clientWidth >= 960) {
      nav.classList.add("fixed-top");
    } else {
      nav.classList.remove("fixed-top");
      window.removeEventListener("resize", handleScroll);
    }
  });
};

export default {
  render,
  afterRender
};
