"use strict";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");
const bgBlur = document.querySelector(".bgBlur");
const modalBlock = document.querySelector(".modal");
const mainModalBlock = document.querySelector(".main-block-modal");
const closeModal = document.querySelector(".close-modal");

let animateLinks = false;

// handles the activation of the hamburger links
hamburger.addEventListener("click", (event) => {
	animateLinks = !animateLinks;
	bgBlur.style.height = getComputedStyle(document.body).height;

	if (animateLinks) {
		navLinks.classList.add("nav-links-enter");
		bgBlur.classList.add("bgBlur-hamburger-active");
		event.target.classList.add("hamburger-active");
	} else {
		navLinks.classList.add("nav-links-leave");
		event.target.classList.remove("hamburger-active");
		setTimeout(() => {
			navLinks.classList.remove("nav-links-leave", "nav-links-enter");
			bgBlur.classList.remove("bgBlur-hamburger-active");
		}, 850);
	}
});

// make sure the blur bg and header bg color are reset when coming from
// a cellphone size screen to a bigger screen device while
// hamburger is active
window.addEventListener("resize", () => {
	if (window.innerWidth >= 600) {
		hamburger.classList.remove("hamburger-active");
		bgBlur.classList.remove("bgBlur-hamburger-active");
		navLinks.classList.remove("nav-links-leave", "nav-links-enter");
		animateLinks = false;
	}
});

mainModalBlock.addEventListener("mouseover", (event) => {
	if (!event.target.classList.contains("title")) return;

	const inputToggle = event.target.closest(".main-card-modal").querySelector("input");
	inputToggle.style.outline = "2px solid hsl(176, 72%, 28%)";
});

mainModalBlock.addEventListener("mouseout", (event) => {
	if (!event.target.classList.contains("title")) return;

	const inputToggle = event.target.closest(".main-card-modal").querySelector("input");
	inputToggle.style.outline = "";
});

const buttonBackProject = document.querySelector(".button-block button");

buttonBackProject.addEventListener("click", () => {
	bgBlur.style.height = getComputedStyle(document.body).height;
	toggleModalAndBgBlur();
});

closeModal.addEventListener("click", () => {
	toggleModalAndBgBlur();
});

function toggleModalAndBgBlur() {
	modalBlock.classList.toggle("modal-visible");
	bgBlur.classList.toggle("bgBlur-modal-active");
}
