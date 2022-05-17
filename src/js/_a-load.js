(function () {
  //!------------------: START

  //!---------------------------------------------: Получаем высоту окна просмотра
  let vh = window.innerHeight * 0.01;
  //!------: устанавливаем значение свойства --vh
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  //!------: Слушаем событие resize
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  //!---------------------------------------------: Получаем высоту окна просмотра

  //!------------------: STOP
})();
