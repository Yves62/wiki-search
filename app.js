const search = document.querySelector("input");
const form = document.querySelector("form");
const resultSearch = document.querySelector(".card-result");
const loader = document.querySelector(".loader");
const titleSearch = document.querySelector(".title-search");

async function getResult(value) {
  try {
    loader.style.display = "block";
    const request = await fetch(
      `https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${value}`,
      {
        method: "get",
      }
    );
    const response = await request.json();

    if (response.query.search.length) {
      loader.style.display = "none";

      for (let i = 0; i < response.query.search.length; i++) {
        console.log(response.query.search[i].title);
        titleSearch.style.display = "block";
        let listResult = document.createElement("li");
        let content = document.createElement("p");
        listResult.textContent += response.query.search[i].title;
        content.innerHTML += `"${response.query.search[i].snippet} + ' ...'"`;
        listResult.appendChild(content);
        styleElement(listResult, content);
        resultSearch.appendChild(listResult);
      }

      search.value = "";
    } else {
      loader.style.display = "none";
      handleError("Il n'y a pas de résultat pour votre recherche");
      search.value = "";
    }
  } catch (error) {
    throw new Error('Nous avons rencontré un problème');
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value.length === 0) {
    handleError("Vous devez saisir une recherche");
  } else {
    resultSearch.innerHTML = "";
    titleSearch.style.display = "none";
    getResult(search.value);
  }
});

handleError = messageError => {
  titleSearch.style.display = "block";
  titleSearch.textContent = messageError;
  setTimeout(() => {
    titleSearch.style.display = "none";
    titleSearch.textContent = "Résultats de votre recherche";
  }, 2000);
}

styleElement = (element1, element2) => {
  element1.style.backgroundColor = "#256ad9";
  element1.style.color = "white";
  element1.style.padding = "10px";
  element1.style.margin = "10px";
  element1.style.border = "1px solid black";
  element1.style.borderRadius = "10px";
  element2.style.margin = "10px";
  element2.style.fontSize = "0.8rem";
}
