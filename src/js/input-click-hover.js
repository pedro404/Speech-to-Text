function elemTarget(e) {
  e = e || window.event;
  e.preventDefault();
  return e.target;
}
//!-----------------------------------------------------------------: mouseover
document.addEventListener("mouseover", (e) => {
  let elem = elemTarget(e);

  if (elem.classList.contains("i-copy")) {
    myFunction(elem, "over"); //!---: [myFunction]
  }
});

//!-----------------------------------------------------------------: mouseout
document.addEventListener("mouseout", (e) => {
  let elem = elemTarget(e);

  if (elem.classList.contains("i-copy")) {
    myFunction(elem, "out"); //!---: [myFunction]
  }
});

//!-----------------------------------------------------------------: click
document.addEventListener("click", (e) => {
  let elem = elemTarget(e);

  if (elem.classList.contains("i-copy")) {
    myFunction(elem, "click"); //!---: [Click to input]
    copyText(elem);
    mVibrate(100);
  }

  if (elem.classList.contains("menu-open")) {
    toggleMenu("0");
    mVibrate(100);
  }
  if (elem.classList.contains("m-close")) {
    toggleMenu("0");
    mVibrate(100);
  }

  if (elem.classList.contains("n-close")) {
    toggleViewList();
    mVibrate(100);
  }

  if (elem.classList.contains("my-notes")) {
    getData();
    toggleViewList();
    toggleMenu("0");
    mVibrate(100);
  }

  if (elem.classList.contains("my-copy")) {
    if (checkTxt()) {
      copyText(document.querySelector(".txt-out"));
      openModal("Copied 👍");
      toggleMenu("1000");
      mVibrate(100);
    }
  }

  if (elem.classList.contains("my-save")) {
    if (checkTxt()) {
      FetchSaveFile();
      toggleMenu("1000");
      mVibrate(100);
    }
  }

  if (elem.classList.contains("my-download")) {
    let data = document.querySelector(".txt-out").value;

    if (checkTxt()) {
      downloadText(data);
      toggleMenu("500");
      mVibrate(100);
    }
  }
});

//!----------------------------------: [check textarea value]

function checkTxt() {
  let x = true;
  let txtElem = document.querySelector(".txt-out");
  if (txtElem.value != "") {
    x = true;
  } else {
    x = false;
  }
  return x;
}

//!----------------------------------: [Click to input]
function myFunction(elem, com) {
  let str = "";
  if (com == "over") {
    str = "s-copy s-over";
  } else if (com == "out") {
    str = "s-copy s-out";
  } else {
    str = "s-copy s-click";
  }
  elem.nextElementSibling.setAttribute("class", str);
}
//!----------------------------------: Open Close - View List
function toggleViewList() {
  document.querySelector(".home").classList.toggle("off");
  document.querySelector(".notes-list").classList.toggle("off");
}

//!----------------------------------: Open Close - Menu

function toggleMenu(time) {
  setTimeout(function () {
    document.querySelector(".flip-box-inner").classList.toggle("elem-flip");
  }, time);
}

//!----------------------------------: Downlod text

function downloadText(data) {
  if (data != "") {
    let file = "data-" + Date.now() + ".txt";

    let link = document.createElement("a");
    link.download = file;
    let blob = new Blob(["" + data + ""], {
      type: "text/plain",
    });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

//!----------------------------------: Copy to clipboard

function copyText(elem) {
  mVibrate(100); // Vibrate Mobile
  navigator.clipboard
    .writeText(elem.value)
    .then(() => {
      console.log(elem.value);
    })
    .catch((err) => {
      console.log(err);
    });
}

//!----------------------------------: Open Modal

function openModal(message) {
  let elem = document.querySelector(".box-a");
  elem.innerHTML = message;
  elem.classList.toggle("e-click");
  setTimeout(() => {
    elem.classList.toggle("e-click");
  }, 2000);
}
//!----------------------------------: Vibrate Mobile

function mVibrate(time) {
  window.navigator.vibrate(time);
}
