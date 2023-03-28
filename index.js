const API_URL = "http://localhost:3000/characters";

      // Render an animal to the page
      function renderAnimal(animal) {
        const animalElem = document.createElement("div");
        animalElem.className = "animal";
        animalElem.innerHTML = `
          <h2>${animal.name}</h2>
          <img src="${animal.image}" alt="${animal.name}" />
          <p>Votes: <span class="votes">${animal.votes}</span></p>
          <button class="vote">Vote</button>
          <button class="unvote">Unvote</button>
          <button class="reset">Reset</button>`;
          
        const voteBtn = animalElem.querySelector(".vote");
        const unvoteBtn = animalElem.querySelector(".unvote");
        const resetBtn = animalElem.querySelector(".reset");
        const votesElem = animalElem.querySelector(".votes");

        // const imgElem = animalElem.querySelector("img");

        // imgElem.addEventListener("error", () => {
        //   imgElem.src = "images/pexels-pixabay-46188.jpg";
        //   imgElem.alt = "Image not found";
        // });

        // Vote button click handler
        voteBtn.addEventListener("click", async () => {
          const response = await fetch(`${API_URL}/${animal.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: animal.votes + 1 }),
          });
          const updatedAnimal = await response.json();
          votesElem.innerText = updatedAnimal.votes;
        });

        // Unvote button click handler
        unvoteBtn.addEventListener("click", async () => {
          const response = await fetch(`${API_URL}/${animal.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: Math.max(animal.votes - 1, 0) }),
          });
          const updatedAnimal = await response.json();
          votesElem.innerText = updatedAnimal.votes;
        });

        // Reset button click handler
        resetBtn.addEventListener("click", async () => {
          const response = await fetch(`${API_URL}/${animal.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: 0 }),
          });
          const updatedAnimal = await response.json();
          votesElem.innerText = updatedAnimal.votes;
        });

        // Append the animal element to the page
        document.getElementById("animals").appendChild(animalElem);
      }

      // Add a new animal to the database and render it to the page
      async function addAnimal(name, image) {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, image, votes: 0 }),
        });
        const newAnimal = await response.json();
        renderAnimal(newAnimal);
}

// Display animals already in the database when the page loads
async function displayAnimals() {
  const response = await fetch(API_URL);
  const animals = await response.json();
  animals.forEach((animal) => renderAnimal(animal));
}

displayAnimals();

// Submit the form to add a new animal
document.querySelector("form").addEventListener("submit", (event) => {
event.preventDefault();
const name = document.getElementById("name").value;
const image = document.getElementById("image").value;
addAnimal(name, image);
event.target.reset();
});

// Fetch and render the animals when the page loads
fetchAndRenderAnimals();