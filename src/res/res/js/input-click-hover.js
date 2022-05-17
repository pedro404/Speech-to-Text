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
    myFunction(elem, "click"); //!---: [myFunction]
    copyText(elem); //!--------------: [copyText]
  }

  if (elem.classList.contains("menu-open")) {
    document.querySelector(".flip-box-inner").classList.add("elem-flip");
  }
  if (elem.classList.contains("menu-close")) {
    document.querySelector(".flip-box-inner").classList.remove("elem-flip");
  }
});

//!----------------------------------: [myFunction]
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

function copyText(elem) {
  navigator.clipboard
    .writeText(elem.value)
    .then(() => {
      console.log(elem.value);
    })
    .catch((err) => {
      console.log(err);
    });
}
