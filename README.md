# FlappyBot

The original game is created by Daniel Shiffman. http://codingtra.in

This version is modified to be played by an Artificial Neural Network.

![Demo](https://github.com/mcjcloud/FlappyBot/blob/master/Flappy-Bird-Clone/graphics/flappybot.gif)

## How it works
This Flappy Bird clone is played by an ANN which uses a genetic algorithm to train. The algorithm trains by selecting the highest performing network out of a population and making those traits more likely to occur in future "generations," slowly increasing the average fitness of the AI over time.

## How to install
1. Clone the repository `git clone https://github.com/mcjcloud/FlappyBot.git`
2. Run `npm install` in both the `Flappy-Bird-Clone` and `nn` directories
3. Install an http-server: `npm install -g http-server`
4. From the `Flappy-Bird-Clone` directory, run `http-server`
5. From the `nn` directory, run `http-server`
6. Navigate to whatever address the `Flappy-Bird-Clone` http server is serving on.
__Note:__ You can change the port that the Flappy Bird game looks for the neural network code on in `Flappy-Bird-Clone/index.html`
