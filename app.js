"use strict";

const hamburger = document.querySelector(".hamburger");
const buttonBackProject = document.querySelector(".button-block button");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");
const mainBlock = document.querySelector(".main-block");
const bgBlur = document.querySelector(".bgBlur");
const modalBlock = document.querySelector(".modal");
const mainModalBlock = document.querySelector(".main-block-modal");
const closeModalButton = document.querySelector(".close-modal");

let animateLinks = false;

//////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////
// Open modal without selection
buttonBackProject.addEventListener("click", () => {
	displayModalAndBgBlur();
});

// Open modal with selection
mainBlock.addEventListener("click", (event) => {
	if (!event.target.type === "button") return;

	displayModalAndBgBlur();
	const button = event.target;
	const modalCardSelected = document.querySelector(`.${button.className}-pledge`);
	const modalCardsSelection = document.querySelectorAll(".card-selected");

	modalCardsSelection.forEach((card) => (card.style.display = "none"));

	const extraBox = modalCardSelected.querySelector(".card-selected");
	extraBox.style.display = "flex";
});

function displayModalAndBgBlur() {
	bgBlur.style.height = getComputedStyle(document.body).height;
	modalBlock.classList.toggle("modal-visible");
	bgBlur.classList.toggle("bgBlur-modal-active");
	window.scrollTo(0, 50);
}

// MODAL
//////////////////////////////////////////////////////////
// Change color of modal selection checkbox input while hovering title
mainModalBlock.addEventListener("mouseover", (event) => {
	if (!event.target.classList.contains("title")) return;

	const toggleButton = event.target.closest(".main-card-modal").querySelector("input");
	toggleButton.style.outline = "2px solid hsl(176, 72%, 28%)";
});

mainModalBlock.addEventListener("mouseout", (event) => {
	if (!event.target.classList.contains("title")) return;

	const toggleButton = event.target.closest(".main-card-modal").querySelector("input");
	toggleButton.style.outline = "";
});

//////////////////////////////////////////////////////
// Select Pledge
mainModalBlock.addEventListener("click", (event) => {
	if (!event.target.classList.contains("title")) return;

	const toggleButton = event.target.closest(".main-card-modal").querySelector("input");
	const toggleButtons = document.querySelectorAll(".toggle-button");

	toggleButtons.forEach((button) => (button.checked = false));

	toggleButton.checked = true;
});

////////////////////////////////////////////////////
// Handle event when pledges are selected

// useful step bellow
// modalCardsSelection.forEach((card) => (card.style.display = "none"));
// const extraBox = modalCardSelected.querySelector(".card-selected");
// extraBox.style.display = "flex";
// change the height of the selected pledge dynamically this time!!!!!!!!!!!

////////////////////////////////////////////////////
// Close modal
closeModalButton.addEventListener("click", () => {
	const modalCards = document.querySelectorAll(".card-selected");
	const toggleButtons = document.querySelectorAll(".toggle-button");
	
	modalCards.forEach((card) => (card.style.display = "none"));
	toggleButtons.forEach((button) => (button.checked = false));
	displayModalAndBgBlur();
});
