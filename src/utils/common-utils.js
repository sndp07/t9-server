
const readline = require('readline');
const fs = require('fs');
const path = require('path');

let dictionary = {};

const getIndexName = (word) => {
    if (word.length < 4) {
        return `${word.charAt(0)}`.toLowerCase();
    }

    return `${word.substr(0, 4)}${word.length}`.toLowerCase();
}

const loadDictionary = (onLoadComplete) => {

    var myInterface = readline.createInterface({
        input: fs.createReadStream(path.resolve(__dirname, '../assets/dictionary.txt'))
    });

    myInterface.on('line', (line) => {
        if (line.trim()) {
            const indexName = getIndexName(line);
            dictionary[indexName] ? dictionary[indexName].push(line.toLowerCase()) : dictionary[indexName] = [line.toLowerCase()];
        }
    });

    myInterface.on('close', () => {
        onLoadComplete()
    });
}

module.exports = {
    getIndexName,
    loadDictionary,
    dictionary
}