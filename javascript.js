var varukorg = []; // Varukorg array

function läggTillVarukorg(namn, pris) {
    varukorg.push({ namn: namn, pris: pris });
    visaVarukorg(); // Anropa visaVarukorg() varje gång en produkt läggs till
    sparaVarukorgILocalStorage(); // Spara varukorgen när en produkt läggs till
}

function visaVarukorg() {
    var modal = document.getElementById("varukorg-modal");
    var varukorgLista = document.getElementById("varukorg-lista");

    // Rensa varukorgslistan innan du lägger till produkterna igen
    varukorgLista.innerHTML = "";

    // Loopa igenom varukorgen och skapa text för varje produkt
    var totalSumma = 0;
    for (var i = 0; i < varukorg.length; i++) {
        var produkt = varukorg[i];
        var listItem = document.createElement("li");
        listItem.textContent = produkt.namn + " - " + produkt.pris + " KR";
        varukorgLista.appendChild(listItem);

        //Räkna ihop summan av alla produkter i varukorgen
        totalSumma += produkt.pris;
    }

    var totalSummaElement = document.createElement("li");
    totalSummaElement.textContent = "Totalt: " + totalSumma + " KR";
    varukorgLista.appendChild(totalSummaElement);

    modal.style.display = "block"; // Visa varukorg-modalen 
}

function stängVarukorg() {
    var modal = document.getElementById("varukorg-modal");
    modal.style.display = "none"; // Göm varukorg-modalen
}

function återställVarukorg() {
    varukorg = [];
    visaVarukorg();
    sparaVarukorgILocalStorage(); // Spara varukorgen när den återställs
}

function sparaVarukorgILocalStorage() {
    const varukorgJSON = JSON.stringify(varukorg); // Konvertera varukorgen till en JSON-sträng
    localStorage.setItem('varukorg', varukorgJSON); // Spara varukorgen i localStorage
}

// Ladda varukorgen från localStorage när sidan laddas
function laddaVarukorgFrånLocalStorage() {
    const varukorgJSON = localStorage.getItem('varukorg'); // Hämta varukorgen från localStorage
        if (varukorgJSON) {
            varukorg = JSON.parse(varukorgJSON); // Konvertera JSON-strängen tillbaka till en JS-array
            visaVarukorg(); // Visa varukorgen på sidan
        }
}

// Anropa funktionen för att ladda varukorgen från localStorage när sidan laddas
laddaVarukorgFrånLocalStorage();
