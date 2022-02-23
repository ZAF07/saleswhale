import { readFileSync } from 'fs';

// Strip whitespaces from strings
const stripLetter = (letter) => {
  return letter.replace(/(\r\n|\n|\r|\t| )/gm, "")
}

// Formats error response object
const createErrorMsg = (status, message, res) => {
  res.status(`${status}`).json({ message, status})
}

const calcTimeRemaining = (time) => {
  return time --
}

const calcPoints = (point, operator) => {
  if (operator == 'add') {
    return point++
  }
  return point--
}

const constructBoard = (words) => {
  let board = [];
  let idx = 0;
  for (let i = 0; i < 4; i ++) {
    let row = [];
    for (let i = 0; i < 4; i ++) { // row
      row.push(words[idx])
      idx++
    }
    board.push(row)
  }
  console.log('THIS IS THE BOARD : ', board);
  return board
}

const checkDuplicate = (word, letter) => {
      for (let i = 0; i < word.length; i++ ) {
        if (word[i].letter === letter) {
          return true
        }
      }
}

const generateDefaultBoard = () => {
  // let defaultBoard;
  const defaultBoard = readFileSync('test_board.txt', 'utf-8',(err, data) => {
    if (err) {
      throw new Error('Cannot read file')
    }
  });
  return stripLetter(defaultBoard.split(',').join('').toLowerCase());

}

const checkValidWord = (word) => {
  const dictionary = readFileSync('dictionary.txt', 'utf-8', (err, data) => {
    if (err) {
      throw new Error('Cannot read dictionary.txt')
    }
  })
    const words = dictionary.split('\n');
    // If word contains '*', check all word possibilities
    if (word.includes('*')) {
      for (let i = 0; i < 26; i++) {
        const wildCardWord = generateWildCardWord(word, i)
        console.log('POSSIBLE WORD : ', wildCardWord);
        // Loop alphabets and check if word is valid
        if (words.includes(wildCardWord)) {
          return true
        }
      }
    }
    if (words.includes(word)) {
      return true
    }
    return false;
}

// Function iterats the alphabet list and returns all possibilities of a match 
const generateWildCardWord = (word, idx) => {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const givenWord = word.split('');
  givenWord.splice(givenWord.indexOf('*'), 1, alphabets[idx])
  return givenWord.join('')

}

export {
  calcPoints,
  stripLetter,
  checkDuplicate,
  checkValidWord,
  createErrorMsg,
  constructBoard,
  calcTimeRemaining,
  generateDefaultBoard
}