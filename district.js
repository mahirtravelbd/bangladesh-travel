
// --------------------------------
// URL থেকে district-এর নাম নাও
// --------------------------------

const params =
  new URLSearchParams(window.location.search);

const district =
  params.get("district") || "";


// --------------------------------
// Elements
// --------------------------------

const districtName =
  document.getElementById("districtName");

const divisionName =
  document.getElementById("divisionName");

const spotGrid =
  document.getElementById("spotGrid");

const spotCount =
  document.getElementById("spotCount");


// --------------------------------
// Division খুঁজে বের করা
// --------------------------------

const divisionLookup = {
  // ঢাকা বিভাগ
  "ঢাকা": "ঢাকা",
  "গাজীপুর": "ঢাকা",
  "নারায়ণগঞ্জ": "ঢাকা",
  "নরসিংদী": "ঢাকা",
  "মুন্সীগঞ্জ": "ঢাকা",
  "মানিকগঞ্জ": "ঢাকা",
  "টাঙ্গাইল": "ঢাকা",
  "কিশোরগঞ্জ": "ঢাকা",
  "ফরিদপুর": "ঢাকা",
  "গোপালগঞ্জ": "ঢাকা",
  "মাদারীপুর": "ঢাকা",
  "রাজবাড়ী": "ঢাকা",
  "শরীয়তপুর": "ঢাকা",

  // চট্টগ্রাম বিভাগ
  "চট্টগ্রাম": "চট্টগ্রাম",
  "কক্সবাজার": "চট্টগ্রাম",
  "কুমিল্লা": "চট্টগ্রাম",
  "ব্রাহ্মণবাড়িয়া": "চট্টগ্রাম",
  "চাঁদপুর": "চট্টগ্রাম",
  "ফেনী": "চট্টগ্রাম",
  "লক্ষ্মীপুর": "চট্টগ্রাম",
  "নোয়াখালী": "চট্টগ্রাম",
  "খাগড়াছড়ি": "চট্টগ্রাম",
  "রাঙামাটি": "চট্টগ্রাম",
  "বান্দরবান": "চট্টগ্রাম",

  // সিলেট বিভাগ
  "সিলেট": "সিলেট",
  "মৌলভীবাজার": "সিলেট",
  "হবিগঞ্জ": "সিলেট",
  "সুনামগঞ্জ": "সিলেট",

  // ময়মনসিংহ বিভাগ
  "ময়মনসিংহ": "ময়মনসিংহ",
  "জামালপুর": "ময়মনসিংহ",
  "নেত্রকোণা": "ময়মনসিংহ",
  "শেরপুর": "ময়মনসিংহ",
  "শেরপুর": "ময়মনসিংহ",

// রাজশাহী বিভাগ
"রাজশাহী": "রাজশাহী",
"বগুড়া": "রাজশাহী",
"জয়পুরহাট": "রাজশাহী",
"নওগাঁ": "রাজশাহী",
"নাটোর": "রাজশাহী",
"চাঁপাইনবাবগঞ্জ": "রাজশাহী",
"পাবনা": "রাজশাহী",
"সিরাজগঞ্জ": "রাজশাহী",

// রংপুর বিভাগ
"রংপুর": "রংপুর",
"দিনাজপুর": "রংপুর",
"কুড়িগ্রাম": "রংপুর",
"গাইবান্ধা": "রংপুর",
"লালমনিরহাট": "রংপুর",
"নীলফামারী": "রংপুর",
"পঞ্চগড়": "রংপুর",
"ঠাকুরগাঁও": "রংপুর",
  "ঠাকুরগাঁও": "রংপুর",

  // খুলনা বিভাগ
  "খুলনা": "খুলনা",
  "বাগেরহাট": "খুলনা",
  "সাতক্ষীরা": "খুলনা",
  "যশোর": "খুলনা",
  "ঝিনাইদহ": "খুলনা",
  "মাগুরা": "খুলনা",
  "নড়াইল": "খুলনা",
  "কুষ্টিয়া": "খুলনা",
  "চুয়াডাঙ্গা": "খুলনা",
  "মেহেরপুর": "খুলনা",

  // বরিশাল বিভাগ
  "বরিশাল": "বরিশাল",
  "বরগুনা": "বরিশাল",
  "ভোলা": "বরিশাল",
  "ঝালকাঠি": "বরিশাল",
  "পটুয়াখালী": "বরিশাল",
  "পিরোজপুর": "বরিশাল"
};




// --------------------------------
// Page Title
// --------------------------------

districtName.textContent =
  district || "জেলা পাওয়া যায়নি";

divisionName.textContent =
  divisionLookup[district]
    ? `📍 ${divisionLookup[district]} বিভাগ`
    : "🇧🇩 বাংলাদেশ";


if (district) {

  document.title =
    `${district} ভ্রমণ গাইড | বাংলাদেশ ভ্রমণ`;

}


// --------------------------------
// Display tourist spots
// --------------------------------

const spots =
  touristSpots[district] || [];


if (spots.length === 0) {

  spotCount.textContent =
    "এই জেলার তথ্য প্রস্তুত করা হচ্ছে।";

  spotGrid.innerHTML = `

    <div class="coming-soon">

      <div>🌿</div>

      <h2>
        ${district || "এই জেলা"}-র Travel Guide
        শীঘ্রই আসছে
      </h2>

      <p>
        পর্যটন স্থানের সঠিক তথ্য ও location
        যাচাই করে যোগ করা হবে।
      </p>

    </div>

  `;

} else {

  spotCount.textContent =
    `${spots.length}টি ভ্রমণ স্থান পাওয়া গেছে`;


  spots.forEach(spot => {

    const card =
      document.createElement("article");


    card.className = "tourist-card";


    card.innerHTML = `

      <div class="spot-image">

  ${
    spot.image
      ? `
        <img
          src="${spot.image}"
          alt="${spot.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
        >
      `
      : ""
  }

  <div
    class="image-placeholder"
    style="${spot.image ? "display:none;" : "display:grid;"}"
  >
    <span>🌿</span>
    <strong>${spot.name}</strong>
    <small>বাংলাদেশ ভ্রমণ</small>
  </div>

</div>


      <div class="tourist-info">

        <h3>${spot.name}</h3>


        <p class="spot-location">
          📍 ${spot.location}
        </p>


        <p class="description">
          ${spot.description}
        </p>


        <div class="travel-details">

          <p>
            <strong>🚌 কীভাবে যাবেন:</strong>
            ${spot.transport}
          </p>

          <p>
            <strong>💰 আনুমানিক খরচ:</strong>
            ${spot.cost}
          </p>

          <p>
            <strong>📅 ভালো সময়:</strong>
            ${spot.bestTime}
          </p>

        </div>


        <div class="spot-actions">

          <a
            class="map-button"
            href="${spot.map}"
            target="_blank"
            rel="noopener noreferrer"
          >
            🗺️ Google Maps-এ দেখুন
          </a>


          <button
            class="heart-button"
            onclick="saveFavourite('${spot.name}')"
          >
            ♡
          </button>

        </div>

      </div>
    `;


    spotGrid.appendChild(card);

  });

}


// --------------------------------
// Favourite - temporary
// --------------------------------

function saveFavourite(name) {

  alert(
    `❤️ ${name}\n\nFirebase Login যোগ করার পর Favourite-এ save হবে।`
  );

}


// --------------------------------
// Footer year
// --------------------------------

document.getElementById("year")
  .textContent =
  new Date().getFullYear();