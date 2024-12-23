let board = [];
board[0] = ["R", "N", "B", "Q", "K", "B", "N", "R"]; // rank 1
board[1] = ["P", "P", "P", "P", "P", "P", "P", "P"];
board[2] = [" ", " ", " ", " ", " ", " ", " ", " "];
board[3] = [" ", " ", " ", " ", " ", " ", " ", " "];
board[4] = [" ", " ", " ", " ", " ", " ", " ", "B"];
board[5] = [" ", " ", " ", " ", " ", " ", " ", " "];
board[6] = ["p", "p", "p", "p", "p", "p", "p", "p"];
board[7] = ["r", "n", "b", "q", "k", "b", "n", "r"]; // rank 8
//  file     A    B    C    D    E    F    G    H

// TODO: FUNCTIONS
// const showBiggerBoard = () => {
//   boardString = `--------------------------------- \n`;
//   board.map((row) => {
//     row.map((element) => {
//       boardString += `| ${element} `;
//     });
//     boardString += `|\n--------------------------------- \n`;
//   });
//   console.log(boardString);
// };

// BASIC FUNCTIONS:
const getIndexOfRank = (pos) => {
  return pos - 1;
};
const getIndexOfFile = (pos) => {
  return pos == "A"
    ? 0
    : pos == "B"
    ? 1
    : pos == "C"
    ? 2
    : pos == "D"
    ? 3
    : pos == "E"
    ? 4
    : pos == "F"
    ? 5
    : pos == "G"
    ? 6
    : pos == "H"
    ? 7
    : Null;
};
const getPieceAtPos = (atPos) => {
  atRow = getIndexOfRank(atPos[1]);
  atCol = getIndexOfFile(atPos[0].toUpperCase());

  try {
    return board[atRow][atCol];
  } catch (err) {
    return 0;
  }
};
const getPieceAtIndex = (atRow, atCol) => {
  try {
    return board[atRow][atCol];
  } catch (err) {
    return 0;
  }
};
const checkColorAtPos = (atPos) => {
  if (getPieceAtPos(atPos) == " ") {
    return "empty";
  } else if (getPieceAtPos(atPos) == getPieceAtPos(atPos).toUpperCase()) {
    return "white";
  } else {
    return "black";
  }
};
const checkColorAtIndex = (row, col) => {
  try {
    if (getPieceAtIndex(row, col) == " ") {
      return "empty";
    } else if (
      getPieceAtIndex(row, col) == getPieceAtIndex(row, col).toUpperCase()
    ) {
      return "white";
    } else {
      return "black";
    }
  } catch (err) {
    console.log("error");
  }
};
const indexToPos = (indexStr) => {
  atPos =
    indexStr[1] == 0
      ? "A" + (parseInt(indexStr[0]) + 1)
      : indexStr[1] == 1
      ? "B" + (parseInt(indexStr[0]) + 1)
      : indexStr[1] == 2
      ? "C" + (parseInt(indexStr[0]) + 1)
      : indexStr[1] == 3
      ? "D" + (parseInt(indexStr[0]) + 1)
      : indexStr[1] == 4
      ? "E" + (parseInt(indexStr[0]) + 1)
      : indexStr[1] == 5
      ? "F" + (parseInt(indexStr[0]) + 1)
      : indexStr[1] == 6
      ? "G" + (parseInt(indexStr[0]) + 1)
      : indexStr[1] == 7
      ? "H" + (parseInt(indexStr[0]) + 1)
      : Null;
  return atPos;
};

// POSSIBILITIES FUNCTIONS:
const possibilitesForRook = (atPos) => {
  possibilityArray = [];
  try {
    if (getPieceAtPos(atPos).toUpperCase() != "R") {
      return "wrong piece!";
    }
  } catch (err) {
    return "bad index";
  }

  atRow = getIndexOfRank(atPos[1]);
  atCol = getIndexOfFile(atPos[0].toUpperCase());
  [upBoundFound, downBoundFound, rightBoundFound, leftBoundFound] = [
    0, 0, 0, 0,
  ];
  // check vertically up
  if (atRow > 0) {
    checkingRowUp = atRow - 1;
    checkingColUp = atCol;
    while (!upBoundFound) {
      checkColorAtPos(atPos) != checkColorAtIndex(checkingRowUp, checkingColUp)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowUp + "" + checkingColUp}`,
          ])
        : 0;
      if (board[checkingRowUp][checkingColUp] == " " && checkingRowUp != 0) {
        checkingRowUp--;
      } else {
        upBoundFound;
        break;
      }
    }
  }
  // check vertically down
  if (atRow < 7) {
    checkingRowDown = atRow + 1;
    checkingColDown = atCol;
    while (!downBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowDown, checkingColDown)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowDown + "" + checkingColDown}`,
          ])
        : 0;
      if (
        board[checkingRowDown][checkingColDown] == " " &&
        checkingRowDown != 7
      ) {
        checkingRowDown++;
      } else {
        downBoundFound;
        break;
      }
    }
  }
  // check right

  if (atCol > 0) {
    checkingRowRight = atRow;
    checkingColRight = atCol - 1;
    while (!rightBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowRight, checkingColRight)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowRight + "" + checkingColRight}`,
          ])
        : 0;
      if (
        board[checkingRowRight][checkingColRight] == " " &&
        checkingColRight != 0
      ) {
        checkingColRight--;
      } else {
        rightBoundFound;
        break;
      }
    }
  }
  // check left
  if (atCol < 7) {
    checkingRowLeft = atRow;
    checkingColLeft = atCol + 1;
    while (!leftBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowLeft, checkingColLeft)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowLeft + "" + checkingColLeft}`,
          ])
        : 0;
      if (
        board[checkingRowLeft][checkingColLeft] == " " &&
        checkingColLeft != 7
      ) {
        checkingColLeft++;
      } else {
        leftBoundFound;
        break;
      }
    }
  }

  return possibilityArray;
};
const possibilitesForBishop = (atPos) => {
  possibilityArray = [];
  try {
    if (getPieceAtPos(atPos).toUpperCase() != "B") {
      return "wrong piece!";
    }
  } catch (err) {
    return "bad index";
  }
  atRow = getIndexOfRank(atPos[1]);
  atCol = getIndexOfFile(atPos[0].toUpperCase());
  [upBoundFound, downBoundFound, rightBoundFound, leftBoundFound] = [
    0, 0, 0, 0,
  ];
  // check vertically up
  if (atRow > 0 && atCol > 0) {
    checkingRowUp = atRow - 1;
    checkingColUp = atCol - 1;
    while (!upBoundFound) {
      checkColorAtPos(atPos) != checkColorAtIndex(checkingRowUp, checkingColUp)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowUp + "" + checkingColUp}`,
          ])
        : 0;
      if (
        board[checkingRowUp][checkingColUp] == " " &&
        !(checkingRowUp == 0 || checkingColUp == 0)
      ) {
        checkingRowUp--;
        checkingColUp--;
      } else {
        upBoundFound;
        break;
      }
    }
  }
  // check vertically down
  if (atRow < 7 && atCol < 7) {
    checkingRowDown = atRow + 1;
    checkingColDown = atCol + 1;
    while (!downBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowDown, checkingColDown)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowDown + "" + checkingColDown}`,
          ])
        : 0;
      if (
        board[checkingRowDown][checkingColDown] == " " &&
        !(checkingRowDown == 7 || checkingColDown == 7)
      ) {
        checkingRowDown++;
        checkingColDown++;
      } else {
        downBoundFound;
        break;
      }
    }
  }
  // check right
  if (atRow < 7 && atCol > 0) {
    checkingRowRight = atRow + 1;
    checkingColRight = atCol - 1;
    while (!rightBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowRight, checkingColRight)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowRight + "" + checkingColRight}`,
          ])
        : 0;
      if (
        board[checkingRowRight][checkingColRight] == " " &&
        !(checkingColRight == 0 || checkingRowRight == 7)
      ) {
        checkingRowRight++;
        checkingColRight--;
      } else {
        rightBoundFound;
        break;
      }
    }
  }
  // check left
  if (atRow > 0 && atCol < 7) {
    checkingRowLeft = atRow - 1;
    checkingColLeft = atCol + 1;
    while (!leftBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowLeft, checkingColLeft)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowLeft + "" + checkingColLeft}`,
          ])
        : 0;
      if (
        board[checkingRowLeft][checkingColLeft] == " " &&
        !(checkingColLeft == 7 || checkingRowLeft == 0)
      ) {
        checkingRowLeft--;
        checkingColLeft++;
      } else {
        leftBoundFound;
        break;
      }
    }
  }

  return possibilityArray;
};
const possibilitesForQueen = (atPos) => {
  try {
    if (getPieceAtPos(atPos).toUpperCase() != "Q") {
      return "wrong piece!";
    }
  } catch (err) {
    return "bad index";
  }
  possibilityArray = [];

  atRow = getIndexOfRank(atPos[1]);
  atCol = getIndexOfFile(atPos[0].toUpperCase());
  [
    upBoundFoundStraight,
    downBoundFoundStraight,
    rightBoundFoundStraight,
    leftBoundFoundStraight,
  ] = [0, 0, 0, 0];
  // check vertically up
  if (atRow > 0) {
    checkingRowUpStraight = atRow - 1;
    checkingColUpStraight = atCol;
    while (!upBoundFoundStraight) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowUpStraight, checkingColUpStraight)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowUpStraight + "" + checkingColUpStraight}`,
          ])
        : 0;
      if (
        board[checkingRowUpStraight][checkingColUpStraight] == " " &&
        checkingRowUpStraight != 0
      ) {
        checkingRowUpStraight--;
      } else {
        upBoundFoundStraight;
        break;
      }
    }
  }
  // check vertically down
  if (atRow < 7) {
    checkingRowDownStraight = atRow + 1;
    checkingColDownStraight = atCol;
    while (!downBoundFoundStraight) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowDownStraight, checkingColDownStraight)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowDownStraight + "" + checkingColDownStraight}`,
          ])
        : 0;
      if (
        board[checkingRowDownStraight][checkingColDownStraight] == " " &&
        checkingRowDownStraight != 7
      ) {
        checkingRowDownStraight++;
      } else {
        downBoundFoundStraight;
        break;
      }
    }
  }
  // check right

  if (atCol > 0) {
    checkingRowRightStraight = atRow;
    checkingColRightStraight = atCol - 1;
    while (!rightBoundFoundStraight) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowRightStraight, checkingColRightStraight)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowRightStraight + "" + checkingColRightStraight}`,
          ])
        : 0;
      if (
        board[checkingRowRightStraight][checkingColRightStraight] == " " &&
        checkingColRightStraight != 0
      ) {
        checkingColRightStraight--;
      } else {
        rightBoundFoundStraight;
        break;
      }
    }
  }
  // check left
  if (atCol < 7) {
    checkingRowLeftStraight = atRow;
    checkingColLeftStraight = atCol + 1;
    while (!leftBoundFoundStraight) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowLeftStraight, checkingColLeftStraight)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowLeftStraight + "" + checkingColLeftStraight}`,
          ])
        : 0;
      if (
        board[checkingRowLeftStraight][checkingColLeftStraight] == " " &&
        checkingColLeftStraight != 7
      ) {
        checkingColLeftStraight++;
      } else {
        leftBoundFoundStraight;
        break;
      }
    }
  }
  [upBoundFound, downBoundFound, rightBoundFound, leftBoundFound] = [
    0, 0, 0, 0,
  ];
  // check vertically up
  if (atRow > 0 && atCol > 0) {
    checkingRowUp = atRow - 1;
    checkingColUp = atCol - 1;
    while (!upBoundFound) {
      checkColorAtPos(atPos) != checkColorAtIndex(checkingRowUp, checkingColUp)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowUp + "" + checkingColUp}`,
          ])
        : 0;
      if (
        board[checkingRowUp][checkingColUp] == " " &&
        !(checkingRowUp == 0 || checkingColUp == 0)
      ) {
        checkingRowUp--;
        checkingColUp--;
      } else {
        upBoundFound;
        break;
      }
    }
  }
  // check vertically down
  if (atRow < 7 && atCol < 7) {
    checkingRowDown = atRow + 1;
    checkingColDown = atCol + 1;
    while (!downBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowDown, checkingColDown)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowDown + "" + checkingColDown}`,
          ])
        : 0;
      if (
        board[checkingRowDown][checkingColDown] == " " &&
        !(checkingRowDown == 7 || checkingColDown == 7)
      ) {
        checkingRowDown++;
        checkingColDown++;
      } else {
        downBoundFound;
        break;
      }
    }
  }
  // check right
  if (atRow < 7 && atCol > 0) {
    checkingRowRight = atRow + 1;
    checkingColRight = atCol - 1;
    while (!rightBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowRight, checkingColRight)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowRight + "" + checkingColRight}`,
          ])
        : 0;
      if (
        board[checkingRowRight][checkingColRight] == " " &&
        !(checkingColRight == 0 || checkingRowRight == 7)
      ) {
        checkingRowRight++;
        checkingColRight--;
      } else {
        rightBoundFound;
        break;
      }
    }
  }
  // check left
  if (atRow > 0 && atCol < 7) {
    checkingRowLeft = atRow - 1;
    checkingColLeft = atCol + 1;
    while (!leftBoundFound) {
      checkColorAtPos(atPos) !=
      checkColorAtIndex(checkingRowLeft, checkingColLeft)
        ? (possibilityArray = [
            ...possibilityArray,
            `${checkingRowLeft + "" + checkingColLeft}`,
          ])
        : 0;
      if (
        board[checkingRowLeft][checkingColLeft] == " " &&
        !(checkingColLeft == 7 || checkingRowLeft == 0)
      ) {
        checkingRowLeft--;
        checkingColLeft++;
      } else {
        leftBoundFound;
        break;
      }
    }
  }

  return possibilityArray;
};
const possibilitesForKnight = (atPos) => {
  possibilityArray = [];
  try {
    if (getPieceAtPos(atPos).toUpperCase() != "N") {
      return "wrong piece!";
    }
  } catch (err) {
    return "bad index";
  }

  atRow = getIndexOfRank(atPos[1]);
  atCol = getIndexOfFile(atPos[0].toUpperCase());

  if (atRow - 1 >= 0 && atCol - 2 >= 0) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow - 1, atCol - 2) &&
      possibilityArray.push(atRow - 1 + "" + (atCol - 2));
  }
  if (atRow - 2 >= 0 && atCol - 1 >= 0) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow - 2, atCol - 1) &&
      possibilityArray.push(atRow - 2 + "" + (atCol - 1));
  }
  if (atRow - 2 >= 0 && atCol + 1 <= 7) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow - 2, atCol + 1) &&
      possibilityArray.push(atRow - 2 + "" + (atCol + 1));
  }
  if (atRow + 1 <= 7 && atCol - 2 >= 0) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow + 1, atCol - 2) &&
      possibilityArray.push(atRow + 1 + "" + (atCol - 2));
  }
  if (atRow - 1 >= 0 && atCol + 2 <= 7) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow - 1, atCol + 2) &&
      possibilityArray.push(atRow - 1 + "" + (atCol + 2));
  }
  if (atRow + 1 <= 7 && atCol + 2 <= 7) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow + 1, atCol + 2) &&
      possibilityArray.push(atRow + 1 + "" + (atCol + 2));
  }
  if (atRow + 2 <= 7 && atCol - 1 >= 0) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow + 2, atCol - 1) &&
      possibilityArray.push(atRow + 2 + "" + (atCol - 1));
  }
  if (atRow + 2 <= 7 && atCol + 1 <= 7) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow + 2, atCol + 1) &&
      possibilityArray.push(atRow + 2 + "" + (atCol + 1));
  }

  return possibilityArray;
};
const possibilitesForKing = (atPos) => {
  possibilityArray = [];
  try {
    if (getPieceAtPos(atPos).toUpperCase() != "K") {
      return "wrong piece!";
    }
  } catch (err) {
    return "bad index";
  }

  atRow = getIndexOfRank(atPos[1]);
  atCol = getIndexOfFile(atPos[0].toUpperCase());

  if (atRow - 1 != -1 && atCol - 1 != -1) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow - 1, atCol - 1) &&
      possibilityArray.push(atRow - 1 + "" + (atCol - 1));
  }
  if (atRow + 1 != 8 && atCol + 1 != 8) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow + 1, atCol + 1) &&
      possibilityArray.push(atRow + 1 + "" + (atCol + 1));
  }
  if (atRow - 1 != -1 && atCol + 1 != 8) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow - 1, atCol + 1) &&
      possibilityArray.push(atRow - 1 + "" + (atCol + 1));
  }
  if (atRow + 1 != 8 && atCol - 1 != -1) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow + 1, atCol - 1) &&
      possibilityArray.push(atRow + 1 + "" + (atCol - 1));
  }
  if (atCol - 1 != -1) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow, atCol - 1) &&
      possibilityArray.push(atRow + "" + (atCol - 1));
  }
  if (atRow - 1 != -1) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow - 1, atCol) &&
      possibilityArray.push(atRow - 1 + "" + atCol);
  }
  if (atRow + 1 != 8) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow + 1, atCol) &&
      possibilityArray.push(atRow + 1 + "" + atCol);
  }
  if (atCol + 1 != 8) {
    checkColorAtPos(atPos) != checkColorAtIndex(atRow, atCol + 1) &&
      possibilityArray.push(atRow + "" + (atCol + 1));
  }

  return possibilityArray;
};
const possibilitesForPawn = (atPos) => {
  possibilityArray = [];
  atRow = getIndexOfRank(atPos[1]);
  atCol = getIndexOfFile(atPos[0].toUpperCase());
  try {
    if (getPieceAtIndex(atRow, atCol).toUpperCase() != "P") {
      return "wrong piece!";
    }
  } catch (err) {
    return "bad index";
  }

  // for double move
  if (
    checkColorAtPos(atPos) == "white" &&
    atRow == 1 &&
    getPieceAtIndex(atRow + 1, atCol) == " "
  ) {
    possibilityArray.push(atRow + 1 + "" + atCol);
    getPieceAtIndex(atRow + 2, atCol) == " " &&
      possibilityArray.push(atRow + 2 + "" + atCol);
  }
  if (
    checkColorAtPos(atPos) == "black" &&
    atRow == 6 &&
    getPieceAtIndex(atRow - 1, atCol) == " "
  ) {
    possibilityArray.push(atRow - 1 + "" + atCol);
    getPieceAtIndex(atRow - 2, atCol) == " " &&
      possibilityArray.push(atRow - 2 + "" + atCol);
  }
  // for taking a piece
  if (checkColorAtPos(atPos) == "white") {
    if (atRow < 7 && atCol < 7) {
      getPieceAtIndex(atRow + 1, atCol + 1) != " " &&
        checkColorAtIndex(atRow + 1, atCol + 1) != "white" &&
        possibilityArray.push(atRow + 1 + "" + (atCol + 1));
    }
    if (atRow < 7 && atCol > 0) {
      getPieceAtIndex(atRow + 1, atCol - 1) != " " &&
        checkColorAtIndex(atRow + 1, atCol - 1) != "white" &&
        possibilityArray.push(atRow + 1 + "" + (atCol - 1));
    }
  }
  if (checkColorAtPos(atPos) == "black") {
    if (atRow > 0 && atCol < 7) {
      getPieceAtIndex(atRow - 1, atCol + 1) != " " &&
        checkColorAtIndex(atRow - 1, atCol + 1) != "black" &&
        possibilityArray.push(atRow - 1 + "" + (atCol + 1));
    }
    if (atRow > 0 && atCol > 0) {
      getPieceAtIndex(atRow - 1, atCol - 1) != " " &&
        checkColorAtIndex(atRow - 1, atCol - 1) != "black" &&
        possibilityArray.push(atRow - 1 + "" + (atCol - 1));
    }
  }
  // for moving 1 step forward
  if (
    checkColorAtPos(atPos) == "white" &&
    atRow != 1 &&
    atRow != 7 &&
    getPieceAtIndex(atRow + 1, atCol) == " "
  ) {
    possibilityArray.push(atRow + 1 + "" + atCol);
  }

  if (
    checkColorAtPos(atPos) == "black" &&
    atRow != 6 &&
    atRow != 0 &&
    getPieceAtIndex(atRow - 1, atCol) == " "
  ) {
    possibilityArray.push(atRow - 1 + "" + atCol);
  }

  return possibilityArray;
};
const getPossibilitesAtPos = (atPos) => {
  piece = getPieceAtPos(atPos).toUpperCase();
  piecePossibilities = [];

  switch (piece) {
    case "R":
      piecePossibilities = possibilitesForRook(atPos);
      break;
    case "B":
      piecePossibilities = possibilitesForBishop(atPos);
      break;
    case "N":
      piecePossibilities = possibilitesForKnight(atPos);
      break;
    case "Q":
      piecePossibilities = possibilitesForQueen(atPos);
      break;
    case "K":
      piecePossibilities = possibilitesForKing(atPos);
      break;
    case "P":
      piecePossibilities = possibilitesForPawn(atPos);
      break;
  }
  return piecePossibilities;
};
const getPossibilitesAtIndex = (row, col) => {
  atPos =
    col == 0
      ? "A" + (row + 1)
      : col == 1
      ? "B" + (row + 1)
      : col == 2
      ? "C" + (row + 1)
      : col == 3
      ? "D" + (row + 1)
      : col == 4
      ? "E" + (row + 1)
      : col == 5
      ? "F" + (row + 1)
      : col == 6
      ? "G" + (row + 1)
      : col == 7
      ? "H" + (row + 1)
      : Null;

  return getPossibilitesAtPos(atPos);
};

// OUTPUT FUNCTIONS
const showBoard = () => {
  boardString = `  0 1 2 3 4 5 6 7 \n`;
  i = 0;
  board.map((row) => {
    boardString += `${i + 1}`;
    row.map((element) => {
      boardString += `|${element}`;
    });
    boardString += `|${i}\n`;
    i++;
  });
  boardString += `  A B C D E F G H \n`;
  console.log(boardString);
};
const showBoardCustom = (boardArray) => {
  boardString = `  0 1 2 3 4 5 6 7 \n`;
  i = 0;
  boardArray.map((row) => {
    boardString += `${i + 1}`;
    row.map((element) => {
      boardString += `|${element}`;
    });
    boardString += `|${i}\n`;
    i++;
  });
  boardString += `  A B C D E F G H \n`;
  console.log(boardString);
};
const movePiece = (fromPos, toPos) => {
  fromRow = getIndexOfRank(fromPos[1]);
  fromCol = getIndexOfFile(fromPos[0].toUpperCase());
  toRow = getIndexOfRank(toPos[1]);
  toCol = getIndexOfFile(toPos[0].toUpperCase());

  if (getPossibilitesAtPos(fromPos).includes(toRow + "" + toCol)) {
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = " ";
  }
};
const getPossibilityForAll = (color) => {
  allPossible = [];

  i = 0;
  board.map((row) => {
    j = 0;
    row.map((element) => {
      checkColorAtIndex(i, j) == color
        ? (allPossible = [
            ...allPossible,
            {
              pieceType: element,
              position: i + "" + j,
              possibilites: getPossibilitesAtIndex(i, j),
            },
          ])
        : 0;
      j++;
    });
    i++;
  });

  return allPossible;
};
showBoard();
//console.log(getPossibilityForAll("black"));
// for black to play, check all possibilities of white if black plays something, if there is a check to black king, remove that possibility
