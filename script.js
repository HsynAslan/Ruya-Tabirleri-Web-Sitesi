var count = 0;
var populerTabirlerDiv = document.querySelector(".populerTabirler"); // Class ismi populerTabirler olarak değiştirildi
document
  .getElementById("navbarMenuIcon")
  .addEventListener("click", function () {
    var contactPopup = document.getElementById("contactPopup");

    if (count % 2 === 0) {
      // Açılmamış
      // Aç
      //navbarRuya.style.height = "25vh";
      contactPopup.classList.add("visible");
    } else {
      // Açılmış
      // Kapat
      contactPopup.classList.remove("visible");
    }

    count++;
  });

// JSON dosyasından veriyi al
fetch("ruya.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData.ruyalar;
    displayRandomTabirler();
  })
  .catch((error) => console.error("Veri alınamadı: ", error));

// JSON'dan alınan veri
var data;

// JSON dosyasından veriyi al
fetch("ruya.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData.ruyalar;
  })
  .catch((error) => console.error("Veri alınamadı: ", error));

var searchInput = document.getElementById("searchInput");
var searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  var searchTerm = searchInput.value.toLowerCase();
  var filteredResults = data.filter(function (item) {
    return item.baslik.toLowerCase().includes(searchTerm);
  });

  displayResults(filteredResults);
});
function displayResults(results) {
  searchResults.innerHTML = "";

  if (searchInput.value.trim() === "") {
    searchResults.style.display = "none";
  } else if (results.length > 0) {
    searchResults.style.display = "block";
    results.forEach(function (item) {
      var link = document.createElement("a");
      link.href = "#"; // Burada gerçek linki item.link olarak kullanabilirsiniz
      link.textContent = item.baslik;
      link.addEventListener("click", function (event) {
        event.preventDefault();
        // Habere tıklandığında yapılacak işlemleri ekleyin
        console.log("Habere tıklandı: " + item.baslik);
      });

      searchResults.appendChild(link);
    });
  } else {
    searchResults.style.display = "none";
  }
}

function displayRandomTabirler() {
  // JSON verisinden rastgele 5 tabir seçme
  var randomTabirler = getRandomElements(data, 5);

  // Her bir tabir için bir div oluşturup populerTabirlerDiv'e ekleme
  randomTabirler.forEach(function (tabir) {
    var tabirDiv = document.createElement("div");
    tabirDiv.classList.add("populerTabir"); // Her bir div için populerTabir class'ı eklendi

    var baslik = document.createElement("h3");
    baslik.textContent = tabir.baslik;

    var tabirMetni = document.createElement("p");
    tabirMetni.textContent = tabir.tabir;

    tabirDiv.appendChild(baslik);
    tabirDiv.appendChild(tabirMetni);

    // Div'e tıklandığında ilgili başlık sayfasına yönlendirme
    tabirDiv.addEventListener("click", function () {
      window.location.href = "sayfa.html?id=" + tabir.id;
    });

    populerTabirlerDiv.appendChild(tabirDiv);
  });
}

// Verilen diziden belirli sayıda rastgele öğe seçen fonksiyon
function getRandomElements(array, count) {
  var shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
}
