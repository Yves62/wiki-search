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
    handleResult(response.query.search);
  } catch (error) {
    throw new Error("Nous avons rencontré un problème");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!search.value.length) {
    handleError("Vous devez saisir une recherche");
  } else {
    resultSearch.innerHTML = "";
    titleSearch.style.display = "none";
    getResult(search.value);
  }
});

handleError = (messageError) => {
  titleSearch.style.display = "block";
  titleSearch.textContent = messageError;
  setTimeout(() => {
    titleSearch.style.display = "none";
    titleSearch.textContent = "Résultats de votre recherche";
  }, 2000);
};

styleElement = (element1, element2, element3) => {
  element1.style.backgroundColor = "#256ad9";
  element1.style.color = "white";
  element1.style.padding = "10px";
  element1.style.margin = "10px";
  element1.style.border = "1px solid black";
  element1.style.borderRadius = "10px";
  element2.style.margin = "10px";
  element2.style.fontSize = "0.8rem";
  element3.style.margin = "10px";
  element3.style.fontSize = "0.8rem";
};

handleResult = arrayOfSearch => {
  if (arrayOfSearch.length) {
    loader.style.display = "none";

    arrayOfSearch.forEach((search) => {
      let url = `https://fr.wikipedia.org/?curid=${search.pageid}`;
      titleSearch.style.display = "block";
      let listResult = document.createElement("li");
      let listResultLink = document.createElement("div");
      let content = document.createElement("p");
      listResult.innerHTML += `${search.title}`;
      listResultLink.innerHTML += `<a href="${url}" target="_blank">${url}</a>`;
      content.innerHTML += `"${search.snippet} ..."`;
      listResult.append(listResultLink, content);
      styleElement(listResult, content, listResultLink);
      resultSearch.appendChild(listResult);
    });

    search.value = "";
  } else {
    loader.style.display = "none";
    handleError("Il n'y a pas de résultat pour votre recherche");
    search.value = "";
  }
}
