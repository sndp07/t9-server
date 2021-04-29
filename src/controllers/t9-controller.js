
const { mapNumberToWords } = require('../services/t-9-services');

const fetchResult = async (req, res, next) => {
    let onlyValidWords = true;
    try {
        const { phoneNumber, resultType } = req.query;
        if (resultType) {
            onlyValidWords = resultType === 'all' ? false : true;
        }

        const wordArray = await mapNumberToWords(phoneNumber, onlyValidWords);
        res.status(200).json(wordArray);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchResult
}