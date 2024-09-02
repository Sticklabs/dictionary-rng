// Word length distribution (based on your data)
const wordLengthDistribution = [
    { length: 2, weight: 15.26 },
    { length: 3, weight: 15.12 },
    { length: 4, weight: 16.00 },
    { length: 5, weight: 13.00 },
    { length: 6, weight: 10.70 },
    { length: 7, weight: 9.90 },
    { length: 8, weight: 4.80 },
    { length: 9, weight: 4.80 },
    { length: 10, weight: 3.30 },
    { length: 11, weight: 2.00 },
    { length: 12, weight: 1.00 },
    { length: 13, weight: 0.60 },
    { length: 14, weight: 0.20 },
    { length: 15, weight: 0.10 },
    { length: 16, weight: 0.05 },
    { length: 17, weight: 0.03 },
    { length: 18, weight: 0.008 },
    { length: 19, weight: 0.005 },
    { length: 20, weight: 0.003 },
    { length: 21, weight: 0.0015 },
    { length: 22, weight: 0.0007 },
    { length: 23, weight: 0.0004 },
    { length: 24, weight: 0.0002 },
    { length: 25, weight: 0.00009 },
    { length: 26, weight: 0.00004 },
    { length: 27, weight: 0.000021 },
    { length: 28, weight: 0.000003 },
    { length: 29, weight: 0.0000007 },
    { length: 30, weight: 0.000006 },
    { length: 31, weight: 0.00000002 },
    { length: 32, weight: 0.000000009 },
    { length: 33, weight: 0.000000003 },
    { length: 34, weight: 0.00000008 },
    { length: 35, weight: 0.0000000007 },
    { length: 36, weight: 0.00000000009 },
    { length: 45, weight: 0.00000000094 },
    { length: 51, weight: 0.0000000000000009 },
    { length: 52, weight: 0.0000000000000003 },
];

// Function to select a random word length based on frequency
function getRandomLength() {
    const totalWeight = wordLengthDistribution.reduce((sum, item) => sum + item.weight, 0);
    let randomNum = Math.random() * totalWeight;

    for (const item of wordLengthDistribution) {
        if (randomNum < item.weight) {
            return item.length;
        }
        randomNum -= item.weight;
    }
}

// Function to generate a random word of selected length
async function generateRandomWord() {
    const response = await fetch('word-list-raw.txt');
    const text = await response.text();
    const words = text.split('\n').filter(word => word.trim().length > 0);

    // Get a random length based on the distribution
    const randomLength = getRandomLength();
    const filteredWords = words.filter(word => word.length === randomLength);

    // Pick a random word of the selected length
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
}

// This function updates the displayed word
async function updateWordDisplay() {
    const randomWord = await generateRandomWord();
    document.getElementById('randomWordDisplay').innerText = randomWord;
}

// Attach the event listener to the button
document.getElementById('generateWordButton').addEventListener('click', updateWordDisplay);
      
