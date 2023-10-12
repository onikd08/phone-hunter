const clearPhoneContainer = () => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.textContent = "";
};

const loadPhones = async (searchTerm) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchTerm}`
  );
  const data = await response.json();
  const allPhones = data.data;
  const [first, second] = [allPhones.slice(0, 12), allPhones.slice(12)];
  const showAllButton = document.getElementById("show-all-button");
  if (allPhones.length > 12) {
    showAllButton.classList.remove("hidden");
    clearPhoneContainer();
    displayPhones(first);
    showAllButton.onclick = () => {
      displayPhones(second);
      showAllButton.classList.add("hidden");
    };
  } else {
    showAllButton.classList.add("hidden");
    clearPhoneContainer();
    displayPhones(allPhones);
  }
};

function displayPhones(data) {
  const phoneContainer = document.getElementById("phones-container");
  data.forEach((phone) => {
    const { brand, phone_name, slug, image } = phone;
    const div = document.createElement("div");
    div.classList = "card bg-base-200 shadow-md";
    div.innerHTML = `
    <figure class="px-10 pt-10">
    <img
      src=${image}
      alt=${phone_name}
      class="rounded-xl"
    />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <div class="card-actions">
      <button class="btn btn-primary" onclick="handleShowDetails('${slug}')">Show Details</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(div);
  });
  toggleLoadingSpinner(false);
}

const handleSearchButton = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchTerm = searchField.value;
  loadPhones(searchTerm);
};

const toggleLoadingSpinner = (isLoading) => {
  const spinnerContainer = document.getElementById("spinner-section");
  if (isLoading) {
    spinnerContainer.classList.remove("hidden");
  } else {
    spinnerContainer.classList.add("hidden");
  }
};

const handleShowDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const phone = data.data;
  displayPhoneDetails(phone);
  phone_details_modal.showModal();
};

const displayPhoneDetails = (phone) => {
  const modalContainer = document.getElementById("modal-container");
  const { mainFeatures, slug, name, releaseDate, image, brand } = phone;
  const { storage, displaySize, chipSet, memory } = mainFeatures;
  modalContainer.innerHTML = `
  <div class="flex justify-center items-center mb-4">
  <img
  src=${image}
  alt=${name}
  class="rounded-xl"
/>
  </div>
  <h3 class="font-bold text-lg">${name}</h3>
  <p class="pt-4"><span class="font-semibold">Storage:</span> ${storage}</p>
  <p class=""><span class="font-semibold">Display Size:</span> ${displaySize}</p>
  <p class=""><span class="font-semibold">ChipSet:</span> ${chipSet}</p>
  <p class=""><span class="font-semibold">Memory:</span> ${memory}</p>
  <p class=""><span class="font-semibold">Slug:</span> ${slug}</p>
  <p class=""><span class="font-semibold">Release Date:</span> ${releaseDate}</p>
  <p class=""><span class="font-semibold">Brand:</span> ${brand}</p>
  `;
};
