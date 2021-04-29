
const readline = require('readline');
const fs = require('fs');
const { getIndexName } = require('../utils/common-utils');
const { dictionary } = require('../utils/common-utils');

const numToLettersMapping = [
    '0',
    '1',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz'
];

// let dictionary = {};

// var myInterface = readline.createInterface({
//     input: fs.createReadStream('word_dictionary.txt')
// });

// let lineNo = 0;
// myInterface.on('line', (line) => {
//     lineNo++;
//     if (line.trim()) {
//         const indexName = getIndexName(line);
//         dictionary[indexName] ? dictionary[indexName].push(line.toLowerCase()) : dictionary[indexName] = [line.toLowerCase()];
//     }
// });

// myInterface.on('close', () => {
//     console.log(Object.keys(dictionary).length)
//     console.log('line total :: ', lineNo)

//     const input = process.argv[2];
//     const result = mapNumberToWords(input);
//     console.log('result is :: ', result);
// })


const mapNumberToWords = async (digits, hasOnlyValid) => {

    let result = [];
    let index = 0;

    const initialIndexLetters = numToLettersMapping[digits[index]];
    index++;

    for (let i = 0; i < initialIndexLetters.length; i++) {
        result.push(initialIndexLetters[i]);
    }

    while (index < digits.length) {
        const currrentDigit = digits[index];

        index++;
        if (currrentDigit < 2) continue; //skip to next iteration as digit is less than 2

        const letters = numToLettersMapping[currrentDigit];
        let tempResult = [];

        result.forEach(word => {
            for (let j = 0; j < letters.length; j++) {
                tempResult.push(`${word}${letters[j]}`)
            }
        });

        result = [...tempResult];
    }

    if (!hasOnlyValid) return result;

    return result.filter((word) => {
        const indexName = getIndexName(word);

        if (!dictionary[indexName]) return false;
        return dictionary[indexName].includes(word) ? true : false;
    });
}

module.exports = {
    mapNumberToWords
}