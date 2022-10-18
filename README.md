# FlappyBot

The original game is created by Daniel Shiffman. http://codingtra.in

This version is modified to be played by an Artificial Neural Network.

![Demo](https://github.com/GabrielMCastro/FlappyBot/blob/master/Flappy-Bird-Clone/graphics/demos/demo_1.mov)

## How it works
This Flappy Bird clone is played by an ANN generated using the NEAT method. The algorithm trains by selecting the highest performing network out of a population and making those traits more likely to occur in future "generations," slowly increasing the average fitness of the AI over time.

## How to install
1. Clone the repository `git clone https://github.com/GabrielMCastro/FlappyBot.git`
2. Run `npm install` in the `Flappy-Bird-Clone` directories
3. Install an http-server: `npm install -g http-server`
4. From the `Flappy-Bird-Clone` directory, run `http-server`
5. Navigate to whatever address the `Flappy-Bird-Clone` http server is serving on.
