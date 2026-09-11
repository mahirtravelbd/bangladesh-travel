const divisions = {

  "ঢাকা": [
    "ঢাকা",
    "গাজীপুর",
    "নারায়ণগঞ্জ",
    "নরসিংদী",
    "মুন্সীগঞ্জ",
    "মানিকগঞ্জ",
    "টাঙ্গাইল",
    "কিশোরগঞ্জ",
    "ফরিদপুর",
    "গোপালগঞ্জ",
    "মাদারীপুর",
    "রাজবাড়ী",
    "শরীয়তপুর"
  ],

  "চট্টগ্রাম": [
    "চট্টগ্রাম",
    "কক্সবাজার",
    "কুমিল্লা",
    "ব্রাহ্মণবাড়িয়া",
    "চাঁদপুর",
    "ফেনী",
    "লক্ষ্মীপুর",
    "নোয়াখালী",
    "খাগড়াছড়ি",
    "রাঙামাটি",
    "বান্দরবান"
  ],

  "রাজশাহী": [
    "রাজশাহী",
    "বগুড়া",
    "জয়পুরহাট",
    "নওগাঁ",
    "নাটোর",
    "চাঁপাইনবাবগঞ্জ",
    "পাবনা",
    "সিরাজগঞ্জ"
  ],

  "খুলনা": [
    "খুলনা",
    "বাগেরহাট",
    "সাতক্ষীরা",
    "যশোর",
    "ঝিনাইদহ",
    "মাগুরা",
    "নড়াইল",
    "কুষ্টিয়া",
    "চুয়াডাঙ্গা",
    "মেহেরপুর"
  ],

  "বরিশাল": [
    "বরিশাল",
    "বরগুনা",
    "ভোলা",
    "ঝালকাঠি",
    "পটুয়াখালী",
    "পিরোজপুর"
  ],

  "সিলেট": [
    "সিলেট",
    "মৌলভীবাজার",
    "হবিগঞ্জ",
    "সুনামগঞ্জ"
  ],

  "রংপুর": [
    "রংপুর",
    "দিনাজপুর",
    "কুড়িগ্রাম",
    "গাইবান্ধা",
    "লালমনিরহাট",
    "নীলফামারী",
    "পঞ্চগড়",
    "ঠাকুরগাঁও"
  ],

  "ময়মনসিংহ": [
    "ময়মনসিংহ",
    "জামালপুর",
    "নেত্রকোণা",
    "শেরপুর"
  ]

};


// -------------------------
// ELEMENTS
// -------------------------

const districtGrid =
  document.getElementById("districtGrid");

const divisionButtons =
  document.getElementById("divisionButtons");

const searchInput =
  document.getElementById("searchInput");

const searchButton =
  document.getElementById("searchButton");

const resultTitle =
  document.getElementById("resultTitle");

const districtCount =
  document.getElementById("districtCount");

const noResult =
  document.getElementById("noResult");


// -------------------------
// Bengali Numbers
// -------------------------

function banglaNumber(number) {

  const numbers = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯"
  };

  return String(number)
    .replace(/[0-9]/g, digit => numbers[digit]);

}


// -------------------------
// Prepare all 64 districts
// -------------------------

const allDistricts = [];

Object.entries(divisions)
  .forEach(([division, districts]) => {

    districts.forEach(district => {

      allDistricts.push({
        name: district,
        division: division
      });

    });

  });


// -------------------------
// Render District Cards
// -------------------------

function renderDistricts(data, title = "বাংলাদেশের সকল জেলা") {

  districtGrid.innerHTML = "";

  resultTitle.textContent = title;

  districtCount.textContent =
    `${banglaNumber(data.length)}টি জেলা`;

  noResult.hidden = data.length !== 0;


  data.forEach(district => {

    const card =
      document.createElement("article");

    card.className = "district-card";

    card.innerHTML = `
      <span class="location">
        📍 ${district.division} বিভাগ
      </span>

      <h3>${district.name}</h3>

      <p>
  ${
    district.matchedSpot
      ? `🔎 মিলেছে: ${district.matchedSpot}`
      : `${district.name} জেলার দর্শনীয় স্থান ও ভ্রমণ তথ্য দেখুন।`
  }
</p>

      <span class="explore">
        ঘুরে দেখুন →
      </span>
    `;

    card.addEventListener("click", () => {

  window.location.href =
    `district.html?district=${encodeURIComponent(district.name)}`;

});


    districtGrid.appendChild(card);

  });

}


// -------------------------
// Division Buttons
// -------------------------

function createDivisionButtons() {

  const allButton =
    document.createElement("button");

  allButton.textContent = "সব জেলা";
  allButton.className =
    "division-button active";


  allButton.addEventListener("click", () => {

    setActiveButton(allButton);

    searchInput.value = "";

    renderDistricts(
      allDistricts,
      "বাংলাদেশের সকল জেলা"
    );

  });


  divisionButtons.appendChild(allButton);


  Object.keys(divisions)
    .forEach(division => {

      const button =
        document.createElement("button");

      button.textContent = division;
      button.className = "division-button";


      button.addEventListener("click", () => {

        setActiveButton(button);

        searchInput.value = "";

        const districts =
          divisions[division].map(name => ({
            name,
            division
          }));


        renderDistricts(
          districts,
          `${division} বিভাগের জেলা`
        );

      });


      divisionButtons.appendChild(button);

    });

}


function setActiveButton(activeButton) {

  document
    .querySelectorAll(".division-button")
    .forEach(button => {

      button.classList.remove("active");

    });

  activeButton.classList.add("active");

}


// -------------------------
// Search
// -------------------------

function searchDistricts() {

  const query =
    searchInput.value
      .trim()
      .toLocaleLowerCase("bn-BD");

  document
    .querySelectorAll(".division-button")
    .forEach(button => {
      button.classList.remove("active");
    });


  // Search box খালি থাকলে সব জেলা দেখাবে
  if (!query) {

    document
      .querySelector(".division-button")
      ?.classList.add("active");

    renderDistricts(
      allDistricts,
      "বাংলাদেশের সকল জেলা"
    );

    return;
  }


  // জেলা ও বিভাগের নাম Search
  const matchedDistricts =
    allDistricts.filter(district => {

      return (
        district.name
          .toLocaleLowerCase("bn-BD")
          .includes(query)

        ||

        district.division
          .toLocaleLowerCase("bn-BD")
          .includes(query)
      );

    });


  // Tourist spot Search
  const spotMatches = [];

  Object.entries(touristSpots)
    .forEach(([districtName, spots]) => {

      spots.forEach(spot => {

        const spotName =
          spot.name
            .toLocaleLowerCase("bn-BD");

        const location =
          (spot.location || "")
            .toLocaleLowerCase("bn-BD");

        if (
          spotName.includes(query) ||
          location.includes(query)
        ) {

          const districtInfo =
            allDistricts.find(
              item => item.name === districtName
            );

          if (districtInfo) {

            spotMatches.push({
              name: districtName,
              division: districtInfo.division,
              matchedSpot: spot.name
            });

          }

        }

      });

    });


  // একই জেলা যেন দুইবার না আসে
  const combined = [
    ...matchedDistricts,
    ...spotMatches
  ];


  const uniqueResults =
    combined.filter(
      (item, index, array) =>
        index === array.findIndex(
          other => other.name === item.name
        )
    );


  renderDistricts(
    uniqueResults,
    `"${searchInput.value}" এর Search Result`
  );

}

// Search while typing

searchInput.addEventListener(
  "input",
  searchDistricts
);


// Search button

searchButton.addEventListener(
  "click",
  searchDistricts
);


// Enter button

searchInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      searchDistricts();
    }

  }
);


// -------------------------
// Google Login Placeholder
// -------------------------

document
  .getElementById("loginButton")
  .addEventListener("click", () => {

    alert(
      "পরবর্তী ধাপে Firebase দিয়ে আসল Google Sign-In যোগ করব।"
    );

  });


// -------------------------
// Automatic Year
// -------------------------

document.getElementById("year")
  .textContent = new Date().getFullYear();


// -------------------------
// Start Website
// -------------------------

createDivisionButtons();

renderDistricts(allDistricts);