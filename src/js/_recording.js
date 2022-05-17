document.addEventListener("DOMContentLoaded", function (event) {
  //!------------: Контейнер для ввода кусков текста
  let texts = document.querySelector(".texts");
  const textCont = document.querySelector(".textarea-cont");
  //!----------: [textarea] для ввода целых предложений
  const textA = document.querySelector(".txt-out");
  //!---: Контейнер с текстом приветствия
  const textC = document.querySelector(".text-container");

  //!---------------------------------------------------: Распознание голоса
  let active = false;

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  //!---------------------------------------------------: Распознание голоса

  //!---------------------------------------------------: Проверка на существование записи [языка] в [localStorage]
  function checkLS() {
    if ("myLang" in localStorage) {
      //!---: Если запись есть
      let getLS = localStorage.getItem("myLang");
      searchBtn(getLS);
    } else {
      //!---: Если записи нет
      searchBtn("cs-CZ");
    }
  }

  //!----------------------------------------------------: Установить иконку микрофона на кнопке языка
  function searchBtn(lng) {
    let lngArr = document.querySelectorAll(".btn");

    [...lngArr].forEach((elem) => {
      //!---: Получить данные из [data-lang]
      let dataLng = elem.getAttribute("data-lang");
      if (dataLng == lng) {
        //!---: Добавить кнопке [class mic]
        elem.classList.add("mic");
        //!----------------------------------------------: Установить язык распознавания
        recognition.lang = dataLng;
        //!---: Если распознавание голоса активно
        if (!active) {
          stopRecording();
          setTimeout(function () {
            //!---: Если вкладка активна
            if (!document.hidden) {
              startRecording();
            }
          }, 500);
        }
      }
    });
  }

  //!---------------------------------------------------: Распознание голоса

  //!-----------------------------: Если есть результат обработки голоса
  recognition.addEventListener("result", (e) => {
    const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    if (e.results[0].isFinal) {
      //!---: Предложение начинается с большой буквы
      let capitalize =
        text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      let minStr = text.toLowerCase();
      let maxStr = text.toUpperCase();

      //!-------: Ввод в [textarea]
      textA.value += `${capitalize}. `;
      textA.scrollTop = textA.scrollHeight; //!---: Скрол  [textarea] в самый низ

      //!---: Добавление параграфа
      texts.insertAdjacentHTML(
        "afterbegin",
        `<p class="copy-text">
      <input class="i-copy" value="${capitalize}" readonly><span class="s-copy"></span><br>
      <input class="i-copy" value="${capitalize}." readonly><span class="s-copy"></span><br>
      <input class="i-copy" value="${minStr}" readonly><span class="s-copy"></span><br>
      <input class="i-copy" value="${maxStr}" readonly><span class="s-copy"></span>
      </p>`
      );

      //!----------: Если [textarea] для ввода целых предложений скрыто
      if (textCont.classList.contains("off")) {
        textCont.classList.remove("off"); //!----------: Показать [textarea] для ввода целых предложений
        textC.classList.add("off"); //!---: Скрыть контейнер с текстом приветствия
      }
    }
  });

  //!-----------------------------: Start/Stop Recording
  function startRecording() {
    if (!active) {
      recognition.start();
      recognition.addEventListener("end", recognition.start);
      active = true;
      console.log("Recording start...");
    }
  }

  function stopRecording() {
    if (active) {
      recognition.removeEventListener("end", recognition.start);
      recognition.stop();
      console.log("Recording stop...");
      active = false;
    }
  }
  //!-----------------------------: Start/Stop Recording

  //!-----------------------------: Если окно теряет фокус
  document.addEventListener("visibilitychange", () => {
    console.log("Document visibility - " + document.hidden);
    return document.hidden ? stopRecording() : startRecording();
  });
  //!-----------------------------: Если окно теряет фокус

  //!---------------------------------------------------: Проверка на существование записи [языка] в [localStorage]
  //!---------------------------------------------------: И запуск распознавания голоса
  checkLS();

  function elemTarget(e) {
    e = e || window.event;
    e.preventDefault();
    return e.target;
  }
  //!-------------------------------------------: click
  document.addEventListener("click", (e) => {
    let elem = elemTarget(e);

    //!---: Кнопка выбора языка
    if (elem.classList.contains("btn") && !elem.classList.contains("mic")) {
      btnClick(elem);
    }
  });

  //!---: Кнопка выбора языка
  function btnClick(elemBtn) {
    stopRecording();

    let elements = document.querySelectorAll(".btn");

    [...elements].forEach((elem) => {
      if (elem.classList.contains("mic")) {
        elem.classList.remove("mic");
      }
    });

    elemBtn.classList.add("mic"); //!----------------------: Добавить микрофон на кнопку
    let dataLng = elemBtn.getAttribute("data-lang"); //!---: Получение [языка] из [data-lang]
    localStorage.setItem("myLang", dataLng); //!-----------: Запись [языка] в [localStorage]
    checkLS(); //!-----------------------------------------: Заменить [язык] распознавания

    startRecording();
  }
});
