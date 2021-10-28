"use strict";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

function initCounter() {
	let counter = 0;
	return function () {
		return ++counter % 2 === 0 ? false : true;
	};
}

const counter = initCounter();

hamburger.addEventListener("click", (event) => {
	const animateEnter = counter();
	event.target.classList.toggle("hamburger-active");
	if (animateEnter) {
		navLinks.classList.add("nav-links-enter");
	} else {
		navLinks.classList.add("nav-links-leave");
		setTimeout(() => {
			navLinks.classList.remove("nav-links-leave", "nav-links-enter");
		}, 1000);
	}
});
