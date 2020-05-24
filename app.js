let namesList = [];

// Default variables
let i = 0;
let x = 0;
let colorNumber = 0;
let kazananSirasi = 1;
let intervalHandle = null;
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const headerNames = document.getElementById("headerNames");
const winners = document.getElementById("kazananlar");
const winnersCard = document.getElementById("kazananlarCard");
const addPerson = document.getElementById("addPerson");
const kisiListesi = document.getElementById("kisiListesi");
const audioElement = document.createElement("audio");
const displayWinners=document.getElementById("display")
initial();

function initial() {
  winnersCard.style.display = "none";
  startButton.style.display="none"
  stopButton.style.display="none"
  document.getElementById("addPerson").style.display = "none";
  document.getElementById("eklenenlerListesi").style.display="none"
  checkempty()
  playMusic()
 
}

function playMusic()
{ 
audioElement.setAttribute("src", "msc.mp3");
audioElement.setAttribute("autoplay", "autoplay"); 
audioElement.pause();
}
function addNewUsers(newList) {

  document.getElementById("eklenenlerListesi").style.display="block"
 // boş item ları sil
  newList = newList.filter(function(entry) { return /\S/.test(entry); });
//trim 
 newList = newList.map(str => str.trim());
 //çift kullanımları kaldır. Eklenen içeriği en temiz hali
 newList = [...new Set(newList)];
//eklenen isimleri bunu taşıyacak olan yapıya gönder
 for (let kisi of newList) {
  namesList.push(kisi.trim());
}
createList()
 
}

addPerson.addEventListener("click", function () {
  startButton.style.display="block"
  addPerson.style.display = "none";
  let getList = kisiListesi.value.split("\n");
  console.log("get lisy", getList);

  addNewUsers(getList);
  kisiListesi.value = "";
  $(".addPerson").attr("disabled", true);
});

//createList() başlangıç listesi oluşturma;
function createList() {
  //sonradan ekleme olursa aynı isimleri teke düşür
  namesList = [...new Set(namesList)];
  console.log("list las",namesList)
  var tableBuilder = "";
  var columns = 3;

  for (var index = 0; index < namesList.length; index++) {
    if (index % columns === 0) {
      if (index > 0) tableBuilder += "<tr>";
      tableBuilder += "</tr>";
    }
    tableBuilder += `<td><b>${index + 1} </b> : `;
    tableBuilder += namesList[index];
    tableBuilder += "</td>";

    tableBuilder += "</>";
    displayWinners.innerHTML = tableBuilder;
  }
}
/////////////////////////////////////
function checkempty() {
  $("#addPerson").prop("disabled", true);
  
  $("#kisiListesi").keyup(function () {
   
    if ($(this).val().length != 0) {
      $(".addPerson").attr("disabled", false);
      addPerson.style.display = "block";
 
      
    } else {
       $(".addPerson").attr("disabled", true);
       addPerson.style.display = "none";

    }
  });
}

// Start or stop the name shuffle on button click////////////////////////////////////////////////////////////////////
startButton.addEventListener("click", function () {
  this.style.display = "none";

  if (!audioElement) return;
  audioElement.currentTime = 0;
  audioElement.play();
  audioElement.volume = 1;

   
  console.log("başlangıç listesi", namesList);
  setTimeout(() => {
    $(stopButton).trigger("click");
  }, 16000);

  intervalHandle = setInterval(function () {
    headerNames.textContent =
      namesList[Math.floor(Math.random() * namesList.length)];

    console.log(headerNames.textContent);
  }, 1);
});
////////////////////////////////////////////////////////////////////
stopButton.addEventListener("click", function () {
  this.style.display = "none";
  startButton.style.display = "block";

  console.log("kazanan", headerNames.textContent);
  kazananlar(headerNames.textContent);
  namesList = namesList.filter(function (item) {
    return item !== headerNames.textContent;
  });

  clearInterval(intervalHandle);

  console.log("bitiş listesi", namesList);
});

function kazananlar(kazanan) {
  winnersCard.style.display = "block";
  let colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "active",
  ];
  let html = `<tr><td class="table-${
    colors[i % 6]
  }">${kazananSirasi}. Kazanan : ${kazanan}</td></tr>`;
  i = i + 1;
  kazananSirasi++;
  winners.innerHTML += html;
}
