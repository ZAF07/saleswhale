import checkWord from 'check-if-word';
// import { checkValidWord } from '../format/index.mjs';
import { constructBoard, checkDuplicate, generateDefaultBoard, checkValidWord } from '../format/index.mjs';
const words = checkWord('en');

const getDetailsForLetter = (letter, boggle) => {
  const row = boggle.length;
  console.log(`Getting index of letter:  ${letter}`);
  let details = [];
  let wildCard = [];

  // Get letter and scan the board for matching letter, return : letter, row/column coordinates
  // Each row
  for (let r = 0; r < row; r++) {
    const column = boggle[r].length;
    
    // Each column
    for (let c = 0; c < column; c ++) {
      if (letter === boggle[r][c]) {   // First letter indext at : [0,1]
        console.log(`[getDetailsForLetter] Here are the details for the letter :  Letter: ${boggle[r][c]},  row: ${r}, column: ${c}`);
        details.push({ letter: `${boggle[r][c]}`, row: r, column: c })
      }
    }
  }
  if (wildCard.length > 0) {
    return wildCard
  }
  return details;
};

// Function to return all valid moves in array
// Takes in an object with row and column coordinates ( Next word )
const checkValidMoves = (currentLetter, nextLetter) => {
  for (let i = 0; i < currentLetter.length; i ++) {
    const currentL = currentLetter[i] 
    for (let j = 0; j < nextLetter.length; j ++) {
      let nextL = nextLetter[j]

      if (currentL.row === nextL.row && currentL.column === nextL.column) {
        console.log('Cannot use the same letter twice');
        return false
      }
      // Validate that all letters has a direct link
      if (
        currentL.row-1 == nextL.row && currentL.column == nextL.column ||
        currentL.row-1 == nextL.row && currentL.column-1 == nextL.column ||
        currentL.row-1 == nextL.row && currentL.column+1 == nextL.column ||
        currentL.row == nextL.row && currentL.column-1 == nextL.column ||
        currentL.row == nextL.row && currentL.column+1 == nextL.column ||
        currentL.row+1 == nextL.row && currentL.column == nextL.column ||
        currentL.row+1 == nextL.row & currentL.column-1 == nextL.column ||
        currentL.row+1 == nextL.row && currentL.column+1 == nextL.column  
        ) {
        console.log(`[checkValidMoves] NextL letter satisfies the valid moves: ${nextL.letter}, Row: ${nextL.row}, Column: ${nextL.column}`);
        return true;
      }
    }
  }
  return false;
}
  
  // Main logic, loops through the given word
  const playBoggle = (word, board) => {
    // Check if word is a valid english word
    const isValidWord = checkValidWord(word);
    if (!isValidWord) {
      return {
        valid: false,
         reason: 'Not a valid word'
      }
    }
    // check if board was given, else generate default baord
    if (!board) {
      const defaultWords = generateDefaultBoard();
      board = defaultWords
      };
    const boggle = constructBoard(board);
    let isPlayerWin = true;
    console.time('start')
    // Temp store for retruned details of each letter
    const dict = []; 
    const letters = word.split('');
    console.log('PASSED LETTER : ', letters);

    // Loop the given letters and run validation checks
    for (let o = 0; o < letters.length; o++) {
    // letters.forEach(letter => {
      const letterDetails = getDetailsForLetter(letters[o], boggle);
      // word does not exist in board
      if (!letterDetails) {
        console.log('word does not exist in board');
        return {
          valid: false,
          reason: 'Word does not exist in board'
        }
      }
      // Check if letter already exists in dict
      const isDuplicate = checkDuplicate(dict, letterDetails[0].letter)

      if (isDuplicate) {
        console.error('YUP THAT IS A DUPLICATE ');
        isPlayerWin = false
        return {
          valid: false,
          reason: 'Duplicate letter'
        }
      }
      dict.push(letterDetails)
      console.log('[playBoggle] LETTER DETAILS : ', letterDetails);
      console.log('------------------------------------------');
    };

    // Check if word passes as valid
    for (let i = 0; i < dict.length; i++) {
       // Stop iteration at second last index 
      if (i == dict.length -1) {
        console.log('REACHED LAST LETTER TO COMPARE: ', dict[i]);
        continue
      }
      // Return if no word details ( means word does not exist on board)
      if (!dict[i] && dict[i+1]) {
        isPlayerWin = false
        return false
      }

      const result = checkValidMoves(dict[i], dict[i+1]);
      if (result === false) {
        return {
          valid: false,
          reason: 'Invalid coordinates'
        }
      }
    }
    console.log('-------------------------------------------');
    console.timeEnd('start');
    return {
      valid: true
    }
  }
  export default playBoggle;
  /*
    top : r-1 && c == c
    top left: r-1 && c-1
    top right r-1 && c+1
    left: r=r && c-1
    right: r=r && c+1
    bottom: r+1 && c=c 
    bottom left: r+1 && c-1
    bottom right: r+1 && c+1
  */