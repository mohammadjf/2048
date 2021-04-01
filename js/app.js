"use strict";

let randomNum;

let giveNewTile = true;
function makeRandomTiles(x) {
  if (!giveNewTile) return;
  for (let i = 1; i <= x; i++) {
    randomNum = Math.floor(Math.random() * 16);
    if (!$(".tile").eq(randomNum).html()) {
      $(".tile")
        .eq(randomNum)
        .html(2)
        .addClass(`num-2`)
        .css("animation", "pop 250ms ease");
    } else {
      makeRandomTiles(x);
    }
  }
}

let tileNumber;

function moveTile(initialPlace, finalPlace) {
  $(finalPlace).html(tileNumber).addClass(`num-${tileNumber}`);
  $(initialPlace).removeClass(`num-${tileNumber}`).empty();
  giveNewTile = true;
}

function sumTiles(movedTile, fixedTile) {
  $(fixedTile).removeClass(`num-${tileNumber}`).empty();
  $(movedTile).removeClass(`num-${tileNumber}`).empty();
  tileNumber *= 2;
  $(fixedTile).html(tileNumber).addClass(`num-${tileNumber} added-up`);
  giveNewTile = true;
}

let row;
let column;
let youLost;
let centerTile;
let aboveTile;
let belowTile;
let rightTile;
let leftTile;

function checkLost() {
  $(".tile").each(function () {
    row = this.id[4];
    column = this.id[6];
    centerTile = `#pos-${row}-${column}`;
    aboveTile = `#pos-${row - 1}-${column}`;
    belowTile = `#pos-${row + 1}-${column}`;
    rightTile = `#pos-${row}-${column + 1}`;
    leftTile = `#pos-${row}-${column - 1}`;
    if ($(centerTile).html()) {
      if (
        $(aboveTile).length &&
        ($(centerTile).html() === $(aboveTile).html() || !$(aboveTile).html())
      ) {
        youLost = false;
        return false;
      } else if (
        $(belowTile).length &&
        ($(centerTile).html() === $(belowTile).html() || !$(belowTile).html())
      ) {
        youLost = false;
        return false;
      } else if (
        $(rightTile).length &&
        ($(centerTile).html() === $(rightTile).html() || !$(rightTile).html())
      ) {
        youLost = false;
        return false;
      } else if (
        $(leftTile).length &&
        ($(centerTile).html() === $(leftTile).html() || !$(leftTile).html())
      ) {
        youLost = false;
        return false;
      }
    } else {
      youLost = false;
      return false;
    }
  });
}

function showGameOver() {
  $("#game-over").css("display", "flex").hide().delay(1500).fadeIn();
}

makeRandomTiles(2);

let firstLine;
let secondLine;
let thirdLine;
let fourthLine;

function moveTiles(pressedKey) {
  $(".tile").removeClass("added-up");
  for (let i = 1; i < 5; i++) {
    switch (pressedKey) {
      case "ArrowUp":
        firstLine = `#pos-1-${i}`;
        secondLine = `#pos-2-${i}`;
        thirdLine = `#pos-3-${i}`;
        fourthLine = `#pos-4-${i}`;
        break;
      case "ArrowDown":
        firstLine = `#pos-4-${i}`;
        secondLine = `#pos-3-${i}`;
        thirdLine = `#pos-2-${i}`;
        fourthLine = `#pos-1-${i}`;
        break;
      case "ArrowRight":
        firstLine = `#pos-${i}-4`;
        secondLine = `#pos-${i}-3`;
        thirdLine = `#pos-${i}-2`;
        fourthLine = `#pos-${i}-1`;
        break;
      case "ArrowLeft":
        firstLine = `#pos-${i}-1`;
        secondLine = `#pos-${i}-2`;
        thirdLine = `#pos-${i}-3`;
        fourthLine = `#pos-${i}-4`;
        break;
      default:
        break;
    }

    tileNumber = $(secondLine).html();
    if (tileNumber) {
      if (!$(firstLine).html()) {
        moveTile(secondLine, firstLine);
      } else if (
        $(firstLine).html() === tileNumber &&
        !$(firstLine).hasClass("added-up")
      ) {
        sumTiles(secondLine, firstLine);
      }
    }

    tileNumber = $(thirdLine).html();
    if (tileNumber) {
      if (!$(secondLine).html()) {
        if (!$(firstLine).html()) {
          moveTile(thirdLine, firstLine);
        } else if (
          $(firstLine).html() === tileNumber &&
          !$(firstLine).hasClass("added-up")
        ) {
          sumTiles(thirdLine, firstLine);
        } else {
          moveTile(thirdLine, secondLine);
        }
      } else if (
        $(secondLine).html() === tileNumber &&
        !$(secondLine).hasClass("added-up")
      ) {
        sumTiles(thirdLine, secondLine);
      }
    }

    tileNumber = $(fourthLine).html();
    if (tileNumber) {
      if (!$(thirdLine).html()) {
        if (!$(secondLine).html()) {
          if (!$(firstLine).html()) {
            moveTile(fourthLine, firstLine);
          } else if (
            $(firstLine).html() === tileNumber &&
            !$(firstLine).hasClass("added-up")
          ) {
            sumTiles(fourthLine, firstLine);
          } else {
            moveTile(fourthLine, secondLine);
          }
        } else if (
          $(secondLine).html() === tileNumber &&
          !$(secondLine).hasClass("added-up")
        ) {
          sumTiles(fourthLine, secondLine);
        } else {
          moveTile(fourthLine, thirdLine);
        }
      } else if (
        $(thirdLine).html() === tileNumber &&
        !$(thirdLine).hasClass("added-up")
      ) {
        sumTiles(fourthLine, thirdLine);
      }
    }
  }
}

$(document).on("keydown", function (e) {
  giveNewTile = false;
  moveTiles(e.key);
  makeRandomTiles(1);
  checkLost();
  if (youLost) showGameOver();
  youLost = true;
});
