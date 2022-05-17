//!---------------------: Download

async function doRequest() {
  let url = "./php/notes-view.php";
  let res = await fetch(url);

  if (res.ok) {
    let text = await res.text();

    return text;
  } else {
    return `HTTP error: ${res.status}`;
  }
}

function getData() {
  doRequest().then((data) => {
    document.querySelector(".res-note").innerHTML = data;
  });
}

//!---------------------: Save

async function FetchSaveFile() {
  let txtData = resDate() + "\r\n" + document.querySelector(".txt-out").value;
  let file = "./php/note-save.php";
  var formData = new FormData();
  formData.append("x", txtData);

  fetch(file, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("resolved", response);
      return response.text();
    })
    .then((data) => {
      console.log(data);
      openModal(data);
    })
    .catch((err) => {
      console.log("rejected", err);
    });
}

//!---------------------: Date

function resDate() {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return (prnDt = new Date().toLocaleTimeString("cs-cz", options));
  // středa 4. května 2022 20:21:12
}
