var trainingData = [
    {
        input: [1, 0],
        output: [1, 0],
    },
    {
        input: [0, 1],
        output: [1, 0],
    },
    {
        input: [1, 1],
        output: [0, 1],
    },
    {
        input: [0, 0],
        output: [0, 1],
    },
];

var n;
function setup() {
    n = new NeuralNetwork([2, 4, 2]);
    console.log(n.feedforward([1, 0]));
    for (let i = 0; i < 10000; i++) {
        shuffle(trainingData);
        for (let data of trainingData) {
            n.train(data.input, data.output);
        }
    }
    console.log(n.feedforward([1, 0]));
}

function draw() {

}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function guess(input) {
    let result = n.feedforward(input);
    if (result[0][0] > result[1][0]) {
        console.log(1);
    }
    else console.log(0);
}
