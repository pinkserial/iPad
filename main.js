import ipads from "./data/ipads.js";
import navigations from "./data/navigations.js";

// 장바구니
const bascketStarterEl = document.querySelector("header .bascket-starter");
const bascketEl = bascketStarterEl.querySelector(".bascket");

bascketStarterEl.addEventListener("click", (e) => {
  e.stopPropagation();
  if (bascketEl.classList.contains("show")) {
    hideBascket();
  } else {
    showBasket();
  }
});

bascketEl.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", hideBascket);

function showBasket() {
  bascketEl.classList.add("show");
}

function hideBascket() {
  bascketEl.classList.remove("show");
}

// 검색
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchEl.querySelector(".search-closer");
const shadowEl = searchEl.querySelector(".shadow");
const searchDelayEls = [...searchEl.querySelectorAll("li")];
const searchInputEl = searchEl.querySelector("input");

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", (e) => {
  e.stopPropagation();
  hideSearch();
});
shadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  playScroll();
  headerMenuEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach((el, idx) => {
    el.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove("searching");
  stopScroll();
  headerMenuEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

function playScroll() {
  document.documentElement.classList.add("fixed");
}

function stopScroll() {
  document.documentElement.classList.remove("fixed");
}

const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", () => {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");

searchTextFieldEl.addEventListener("click", () => {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});

searchCancelEl.addEventListener("click", () => {
  headerEl.classList.remove("searching--mobile");
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

const navEl = document.querySelector("nav");
const navMenuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");

navMenuToggleEl.addEventListener("click", () => {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener("click", (e) => {
  e.stopPropagation();
});

navMenuShadowEl.addEventListener("click", hideNavMenu);

window.addEventListener("click", hideNavMenu);

function showNavMenu() {
  navEl.classList.add("menuing");
}

function hideNavMenu() {
  navEl.classList.remove("menuing");
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach((info) => io.observe(info));

const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  itemEl.innerHTML = `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

const navigationEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");

  mapEl.classList.add("map");
  mapEl.innerHTML = `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${nav.maps
        .map((map) => `<li><a href="${map.url}">${map.name}</a></li>`)
        .join("")}
    </ul>
  `;

  navigationEl.append(mapEl);
});

const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();

const mapEls = document.querySelectorAll("footer .navigations .map");
mapEls.forEach((mapEl) => {
  const h3El = mapEl.querySelector("h3");
  h3El.addEventListener("click", () => {
    mapEl.classList.toggle("active");
  });
});
