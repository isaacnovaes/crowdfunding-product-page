"use strict";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");
const bgBlur = document.querySelector(".bgBlur");
const modalBlock = document.querySelector(".main-block-modal");


let animateLinks = false;

// handles the activation of the hamburger links
hamburger.addEventListener("click", (event) => {
	animateLinks = !animateLinks;
	bgBlur.style.height = getComputedStyle(document.body).height;

	if (animateLinks) {
		navLinks.classList.add("nav-links-enter");
		bgBlur.style.visibility = "visible";
		event.target.classList.add("hamburger-active");
	} else {
		navLinks.classList.add("nav-links-leave");
		event.target.classList.remove("hamburger-active");
		setTimeout(() => {
			navLinks.classList.remove("nav-links-leave", "nav-links-enter");
			bgBlur.style.visibility = "hidden";
		}, 1000);
	}
});

// make sure the blur bg and header bg color are reset when coming from
// a cellphone size screen to a bigger screen device while
// hamburger is active
window.addEventListener("resize", () => {
	if (window.innerWidth >= 600) {
		hamburger.classList.remove("hamburger-active");
		bgBlur.style.visibility = "hidden";
		navLinks.classList.remove("nav-links-leave", "nav-links-enter");
		animateLinks = false;
	}
});

modalBlock.addEventListener("mouseover", (event) => {
	if (!event.target.classList.contains("card-modal-title")) return;

	const inputToggle = event.target.closest(".main-card-modal").querySelector("input");
	inputToggle.style.outline = "2px solid hsl(176, 72%, 28%)";
});
modalBlock.addEventListener("mouseout", (event) => {
	if (!event.target.classList.contains("card-modal-title")) return;

	const inputToggle = event.target.closest(".main-card-modal").querySelector("input");
	inputToggle.style.outline = "2px solid rgba(128, 128, 128, 0.178)";
});


