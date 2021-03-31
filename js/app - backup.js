"use strict";

function makeRandomTiles(x) {
  for (let i = 1; i <= x; i++) {
    let randomNum = Math.floor(Math.random() * 16);
    if (!$(".tile").eq(randomNum).html()) {
      $(".tile").eq(randomNum).hide().html(2).addClass(`num-2`).fadeIn();
    } else {
      makeRandomTiles(x);
    }
  }
}

makeRandomTiles(2);

function moveTiles(pressedKey) {
  $(".tile").removeClass("added-up");
  let firstLine;
  let secondLine;
  let thirdLine;
  let fourthLine;
  let tileNumber;
  for (let i = 1; i < 5; i++) {
    if (pressedKey == "ArrowLeft") {
      firstLine = $(`#pos-${i}-1`);
      secondLine = $(`#pos-${i}-2`);
      thirdLine = $(`#pos-${i}-3`);
      fourthLine = $(`#pos-${i}-4`);
    } else if (pressedKey == "ArrowRight") {
      firstLine = $(`#pos-${i}-4`);
      secondLine = $(`#pos-${i}-3`);
      thirdLine = $(`#pos-${i}-2`);
      fourthLine = $(`#pos-${i}-1`);
    } else if (pressedKey == "ArrowUp") {
      firstLine = $(`#pos-1-${i}`);
      secondLine = $(`#pos-2-${i}`);
      thirdLine = $(`#pos-3-${i}`);
      fourthLine = $(`#pos-4-${i}`);
    } else if (pressedKey == "ArrowDown") {
      firstLine = $(`#pos-4-${i}`);
      secondLine = $(`#pos-3-${i}`);
      thirdLine = $(`#pos-2-${i}`);
      fourthLine = $(`#pos-1-${i}`);
    }
    tileNumber = secondLine.html();

    if (!firstLine.html()) {
      firstLine.html(tileNumber).addClass(`num-${tileNumber}`);
      secondLine.removeClass(`num-${tileNumber}`).empty();
    } else if (
      firstLine.html() === tileNumber &&
      !firstLine.hasClass("added-up")
    ) {
      firstLine.removeClass(`num-${tileNumber}`).empty();
      secondLine.removeClass(`num-${tileNumber}`).empty();
      tileNumber *= 2;
      firstLine.html(tileNumber).addClass(`num-${tileNumber} added-up`);
    }
    tileNumber = thirdLine.html();
    if (!secondLine.html()) {
      if (!firstLine.html()) {
        firstLine.html(tileNumber).addClass(`num-${tileNumber}`);
        thirdLine.removeClass(`num-${tileNumber}`).empty();
      } else if (
        firstLine.html() === tileNumber &&
        !firstLine.hasClass("added-up")
      ) {
        firstLine.removeClass(`num-${tileNumber}`).empty();
        thirdLine.removeClass(`num-${tileNumber}`).empty();
        tileNumber *= 2;
        firstLine.html(tileNumber).addClass(`num-${tileNumber} added-up`);
      } else {
        secondLine.html(tileNumber).addClass(`num-${tileNumber}`);
        thirdLine.removeClass(`num-${tileNumber} added-up`).empty();
      }
    } else if (
      secondLine.html() === tileNumber &&
      !secondLine.hasClass("added-up")
    ) {
      secondLine.removeClass(`num-${tileNumber}`).empty();
      thirdLine.removeClass(`num-${tileNumber}`).empty();
      tileNumber *= 2;
      secondLine.html(tileNumber).addClass(`num-${tileNumber} added-up`);
    }

    tileNumber = fourthLine.html();
    if (!thirdLine.html()) {
      if (!secondLine.html()) {
        if (!firstLine.html()) {
          firstLine.html(tileNumber).addClass(`num-${tileNumber}`);
          fourthLine.removeClass(`num-${tileNumber}`).empty();
        } else if (
          firstLine.html() === tileNumber &&
          !firstLine.hasClass("added-up")
        ) {
          firstLine.removeClass(`num-${tileNumber}`).empty();
          fourthLine.removeClass(`num-${tileNumber}`).empty();
          tileNumber *= 2;
          firstLine.html(tileNumber).addClass(`num-${tileNumber} added-up`);
        } else {
          secondLine.html(tileNumber).addClass(`num-${tileNumber}`);
          fourthLine.removeClass(`num-${tileNumber} added-up`).empty();
        }
      } else if (
        secondLine.html() === tileNumber &&
        !secondLine.hasClass("added-up")
      ) {
        secondLine.removeClass(`num-${tileNumber}`).empty();
        fourthLine.removeClass(`num-${tileNumber}`).empty();
        tileNumber *= 2;
        secondLine.html(tileNumber).addClass(`num-${tileNumber} added-up`);
      } else {
        thirdLine.html(tileNumber).addClass(`num-${tileNumber}`);
        fourthLine.removeClass(`num-${tileNumber} added-up`).empty();
      }
    } else if (
      thirdLine.html() === tileNumber &&
      !thirdLine.hasClass("added-up")
    ) {
      thirdLine.removeClass(`num-${tileNumber}`).empty();
      fourthLine.removeClass(`num-${tileNumber}`).empty();
      tileNumber *= 2;
      thirdLine.html(tileNumber).addClass(`num-${tileNumber} added-up`);
    }
  }
}

$(document).on("keydown", function (e) {
  moveTiles(e.key);
  makeRandomTiles(1);
});
