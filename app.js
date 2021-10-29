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
	const animateEnter = counter(); // increase counter
	event.target.classList.toggle("hamburger-active");
	const bgBlur = document.querySelector(".bg");

	if (animateEnter) {
		navLinks.classList.add("nav-links-enter");
		bgBlur.classList.add("bgBlur");
	} else {
		navLinks.classList.add("nav-links-leave");
		setTimeout(() => {
			navLinks.classList.remove("nav-links-leave", "nav-links-enter");
			bgBlur.classList.remove("bgBlur");
		}, 1000);
	}
});

// make sure the blur bg and header bg color are reset when coming from
// a cellphone size screen to a bigger screen device
window.addEventListener("resize", () => {
	if (window.innerWidth >= 600) {
		hamburger.classList.remove("hamburger-active");
		document.querySelector(".bg").classList.remove("bgBlur");
		navLinks.classList.remove("nav-links-leave", "nav-links-enter");
		counter();
	}
});
