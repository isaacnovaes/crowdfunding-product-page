"use strict";
// commit changes
// update units left!
const hamburger = document.querySelector(".hamburger");
const buttonBackProject = document.querySelector(".button-block button");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");
const mainBlock = document.querySelector(".main-block");
const bgBlur = document.querySelector(".bgBlur");
const modalBlock = document.querySelector(".modal");
const mainModalBlock = document.querySelector(".main-block-modal");
const modalForm = document.querySelector("form");
const modalMainCards = document.querySelectorAll(".main-card-modal");
const modalToggleButtons = document.querySelectorAll(".main-card-modal .toggle-button");
const modalExtraBoxes = document.querySelectorAll(".card-selected");
const modalContinueButtons = document.querySelectorAll(".card-selected button");
const errorMessages = document.querySelectorAll(".span");
const modalCompleted = document.querySelector(".modal-completed");
const closeModalButton = document.querySelector(".close-modal");
const closeModalCompleted = document.querySelector(".modal-completed-content button");

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
	window.scrollTo(0, 40);
});

// Open modal with selection
mainBlock.addEventListener("click", (event) => {
	if (!event.target.type === "button") return;

	displayModalAndBgBlur();
	const button = event.target;
	const modalCardSelected = document.querySelector(`.${button.className}-pledge`);
	const modalCardButton = modalCardSelected.querySelector("input[type=radio]");
	const extraBox = modalCardSelected.querySelector(".card-selected");

	modalExtraBoxes.forEach((card) => (card.style.display = "none"));
	modalCardSelected.classList.add("main-card-modal-selected");

	modalCardButton.checked = true;
	extraBox.style.display = "flex";
	extraBox.scrollIntoView({
		behavior: "smooth",
		block: "end",
		inline: "center",
	});
});

// MODAL
//////////////////////////////////////////////////////////
// Change color of modal selection checkbox input while hovering title
mainModalBlock.addEventListener("mouseover", (event) => {
	if (!event.target.classList.contains("title")) return;

	const toggleButton = event.target.closest(".main-card-modal").querySelector("input");
	toggleButton.style.boxShadow = "0 0 0 4px white, 0 0 0 5px hsl(176, 72%, 28%)";
});

mainModalBlock.addEventListener("mouseout", (event) => {
	if (!event.target.classList.contains("title")) return;

	const toggleButton = event.target.closest(".main-card-modal").querySelector("input");
	toggleButton.style.boxShadow = "";
});

//////////////////////////////////////////////////////
// Handles input toggling by clicking on modal card
mainModalBlock.addEventListener("click", (event) => {
	if (!event.target.closest(".main-card-modal")) return;
	const cardSelected = event.target.closest(".main-card-modal");
	const toggleButton = cardSelected.querySelector("input");

	showExtraBox(cardSelected);

	toggleButton.checked = true;
});

/////////////////////////////////////////////////////
// Handles input toggling
modalForm.addEventListener("input", (event) => {
	const cardSelected = event.target.closest(".main-card-modal");
	showExtraBox(cardSelected);
});

///////////////////////////////////////////////////
// Validate input and display completed modal
mainModalBlock.addEventListener("click", (event) => {
	if (event.target.type !== "button") return;

	const continueButton = event.target;
	const numberInput = continueButton.previousElementSibling.querySelector(`input[type="number"]`);
	const inputValid = +numberInput.value >= +numberInput.min && +numberInput.value <= +numberInput.max ? true : false;
	const errorMessage = continueButton.querySelector("span");

	if (inputValid) {
		numberInput.id = "inputValid"; // make it easy to retrieve valid input outside this arrow function
		resetModal();
		modalCompleted.classList.add("modal-completed-visible");
	} else {
		errorMessage.classList.add("error");
		setTimeout(() => {
			errorMessage.classList.remove("error");
		}, 3000);
	}
});

////////////////////////////////////////////////////
// Close default modal
closeModalButton.addEventListener("click", () => {
	closeModal();
});

bgBlur.addEventListener("click", () => {
	if (modalBlock.classList.contains("modal-visible")) {
		closeModal();
	}
});

///////////////////////////////////////////////////
// Close completed modal
closeModalCompleted.addEventListener("click", () => {
	resetModalCompleted();
});
bgBlur.addEventListener("click", () => {
	if (modalCompleted.classList.contains("modal-completed-visible")) {
		resetModalCompleted();
	}
});

///////////////////////////////////////////////////
// Functions

function displayModalAndBgBlur() {
	bgBlur.style.height = getComputedStyle(document.body).height;
	modalBlock.classList.toggle("modal-visible");
	bgBlur.classList.toggle("bgBlur-modal-active");
}

function showExtraBox(cardSelected) {
	const extraBox = cardSelected.querySelector(".card-selected");

	modalExtraBoxes.forEach((box) => (box.style.display = "none"));
	modalMainCards.forEach((box) => {
		box.classList.remove("main-card-modal-selected");
	});

	cardSelected.classList.add("main-card-modal-selected");
	if (extraBox) {
		extraBox.style.display = "flex";
	}
}

function closeModal() {
	resetModal();
	setTimeout(() => {
		bgBlur.classList.toggle("bgBlur-modal-active");
	}, 500);
}

function resetModal() {
	modalExtraBoxes.forEach((card) => (card.style.display = "none"));
	errorMessages.forEach((message) => {
		message.classList.remove("error");
	});
	modalToggleButtons.forEach((button) => (button.checked = false));
	modalBlock.classList.toggle("modal-visible");
	modalMainCards.forEach((box) => {
		box.classList.remove("main-card-modal-selected");
	});
}

function resetModalCompleted() {
	const showNumberUpdate = document.querySelector(".data-card");
	const moneyDonated = document.querySelector(".data-card .backed h2");
	const numberOfDonators = document.querySelector(".data-card .backers h2");
	const progressBar = document.querySelector(".progress-bar-content");
	const numberInput = document.getElementById("inputValid");

	modalCompleted.classList.remove("modal-completed-visible");
	bgBlur.classList.toggle("bgBlur-modal-active");
	showNumberUpdate.scrollIntoView({
		behavior: "smooth",
		inline: "center",
		block: "center",
	});
	setTimeout(() => {
		const updatedMoney = (formatStringToNumber(moneyDonated.innerText, 1) + +numberInput.value).toLocaleString("en-US");
		moneyDonated.innerText = `$${updatedMoney}`;

		numberOfDonators.innerText = (formatStringToNumber(numberOfDonators.innerText, 0) + 1).toLocaleString("en-US");

		const progressBarNewWidth =
			(formatStringToNumber(moneyDonated.innerText, 1) + formatStringToNumber(numberInput.value, 1)) / 100000;
		progressBar.style.width = progressBarNewWidth > 1 ? "100%" : `${progressBarNewWidth * 100}%`;
	}, 1000);
	numberInput.id = ""; // reset valid input
}

function formatStringToNumber(input, slice) {
	return +input.slice(slice).replace(",", "");
}
