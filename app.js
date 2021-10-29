"use strict";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");

function initCounter() {
	let counter = 0;
	return function () {
		return ++counter % 2 === 0 ? false : true;
	};
}

const counter = initCounter();

// handles the activation of the hamburger links
hamburger.addEventListener("click", (event) => {
	const animateEnter = counter();
	event.target.classList.toggle("hamburger-active");
	const bgBlur = document.createElement("div");

	if (animateEnter) {
		navLinks.classList.add("nav-links-enter");
		bgBlur.classList.add("bgBlur");
		header.after(bgBlur);
		header.style.backgroundColor = "rgba(0, 0, 0, 0.705)";
	} else {
		navLinks.classList.add("nav-links-leave");
		setTimeout(() => {
			navLinks.classList.remove("nav-links-leave", "nav-links-enter");
			document.querySelector(".bgBlur").remove();
			header.style.backgroundColor = "initial";
		}, 1000);
	}
});

// make sure the blur bg and header bg color are reset when coming from
// a cellphone size screen to a tablet screen size
window.addEventListener("resize", () => {
	if (window.innerWidth >= 600) {
		document.querySelector(".bgBlur")?.remove();
		header.style.backgroundColor = "initial";
	}
});
