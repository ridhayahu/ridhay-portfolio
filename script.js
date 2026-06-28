const tabs = [...document.querySelectorAll(".tab")];
const panels = [...document.querySelectorAll(".panel")];
const menu = document.querySelector(".menu");
const tabNav = document.querySelector(".tabs");

function activateTab(id, updateHash = true) {
  const target = document.getElementById(id);
  if (!target) return;
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === id));
  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === id;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  if (updateHash) history.replaceState(null, "", `#${id}`);
  window.scrollTo({ top: 0, behavior: "instant" });
  tabNav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}

tabs.forEach((tab) => tab.addEventListener("click", () => activateTab(tab.dataset.tab)));
document.querySelectorAll("[data-tab-jump]").forEach((button) => button.addEventListener("click", () => activateTab(button.dataset.tabJump)));
document.querySelectorAll("[data-tab-link]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  activateTab(link.dataset.tabLink);
}));
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  tabNav.classList.toggle("open", !open);
});

const initial = location.hash.slice(1);
activateTab(panels.some((panel) => panel.id === initial) ? initial : "about", false);
