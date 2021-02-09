const url =
	"https://randomuser.me/api/?results=12&inc=name, picture,email,location,phone, dob, &noinfo &nat=US";

const galleryDiv = document.querySelector("#gallery");
let htmlCard = "";
let modalCard = "";
let employees = [];
const body = document.querySelector("body");
const searchDiv = document.querySelector(".search-container");
let searchInput = "";
fetch(url)
	.then((res) => res.json())
	.then((data) => {
		// getting data from from the URL API
		employees = data.results;
		employees.forEach((element, index) => {
			// looping over each employee that its stored located in data.results and displaying it in variable and attach it to the gallery div
			htmlCard = `<div class="card" data-index="${index}">
                <div class="card-img-container">
                    <img class="card-img" src="${element.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${element.name.first} ${element.name.last}</h3>
                    <p class="card-text">${element.email}</p>
                    <p class="card-text cap">${element.location.city} ${element.location.state}</p>
                </div>
            </div>`;
			galleryDiv.insertAdjacentHTML("beforeend", htmlCard);
		});

		function displayModal(index) {
			let {
				// destructured the json array of objects for later use
				name,
				dob,
				phone,
				email,
				location: { city, street, state, postcode },
				picture,
			} = employees[index];

			let date = new Date(dob.date);

			modalCard = `<div class="modal-container"> 
			<div class="modal">
				<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
				<div class="modal-info-container">
					<img class="modal-img" src="${picture.large}" alt="profile picture">
					<h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
					<p class="modal-text">${email}</p>
					<p class="modal-text cap">${location}</p>
					<hr>
					<p class="modal-text">${phone}</p>
					<p class="modal-text">${street.number}, ${city}, ${state} ${postcode}</p>
					<p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
				</div>
			</div>
			<div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
			`;
			body.insertAdjacentHTML("beforeend", modalCard);
		}
		// pick the search inout var display the html needed for the search bar into the search div
		searchInput = `<form action="#" method="get"> 
		<input type="search" id="search-input" class="search-input" placeholder="Search...">
		<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
		</form>`;

		searchDiv.insertAdjacentHTML("beforeend", searchInput);

		$("#search-input").on("keyup", function () {
			// jquery function on each card class, pick the current element and filter the specific elements when we type in the seach box
			$(".card").each((index, element) => {
				let value = $(this).val().toLowerCase();
				$(element).filter(function () {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
				});
			});
		});

		document.querySelectorAll(".card").forEach((element) => {
			// loop over all the cards classes, on each click we pick the index of each element(card) so we can display the modal
			element.addEventListener("click", function () {
				const index = element.getAttribute("data-index");
				displayModal(index);

				document.querySelectorAll(".modal-close-btn").forEach((element) => {
					//select the close button and hide the modal container
					element.addEventListener("click", function () {
						document.querySelectorAll(".modal-container").forEach((element) => {
							element.style.display = "none";
						});
					});
				});
			});
		});
	});
