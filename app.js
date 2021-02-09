const url =
	"https://randomuser.me/api/?results=12&inc=name, picture,email,location,phone, dob, &noinfo &nat=US";

let galleryDiv = document.querySelector("#gallery");
let htmlCard = "";
let modalCard = "";
let employee = [];
let body = document.querySelector('body')

fetch(url)
	.then((res) => res.json())
	.then((data) => {
		employee = data.results;
		employee.forEach((element,index) => {
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


	});
	
