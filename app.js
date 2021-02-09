const url =
	"https://randomuser.me/api/?results=12&inc=name, picture,email,location,phone, dob, &noinfo &nat=US";

let galleryDiv = document.querySelector("#gallery");
let htmlCard = "";
let modalCard = "";
let employees = [];
let body = document.querySelector('body')

fetch(url)
	.then((res) => res.json())
	.then((data) => {
		employees = data.results;
		employees.forEach((element,index) => {
			htmlCard = `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${element.picture.large}" alt="${index}">
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
				name,
				dob,
				phone,
				email,
				 location: {
					city,
					street,
					state,
					postcode
				}, 
				picture
			} = employees[index];

			let date = new Date (dob.date)

			modalCard = `<div class="modal-container">
			<div class="modal">
				<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
				<div class="modal-info-container">
					<img class="modal-img" src="${picture.large}" alt="${index}">
					<h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
					<p class="modal-text">${email}</p>
					<p class="modal-text cap">${location}</p>
					<hr>
					<p class="modal-text">${phone}</p>
					<p class="modal-text">${street.number}, ${city}, ${state} ${postcode}</p>
					<p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
				</div>
			</div>`
			body.insertAdjacentHTML('beforeend',modalCard)
			
		}

		
		galleryDiv.addEventListener('click',function(e){
			if(e.target !== galleryDiv) {
				const cardImg = e.target.closest('.card-img');
				const index = cardImg.getAttribute('alt')
				displayModal(index)
			}
		})

		
		
	});

	
	


