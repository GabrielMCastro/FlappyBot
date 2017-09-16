import random


def f(x):
    return 0.2 * x + 0.3


class Perceptron(object):

    def __init__(self):
        self.weights = [random.uniform(-1.0, 1.0), random.uniform(-1.0, 1.0)]   # last weight is for the bias
        self.bias = 0.5
        self.lr = 0.01

    def guess(self, inputs):
        # 1. include the bias in the inputs

        # 2. sum the inputs * the weights
        sum = 0
        for i in range(0, len(self.weights)):
            sum += inputs[i] * self.weights[i]
        sum -= self.bias

        # 3. run through activation function (constrains the output)
        output = self.activation(sum)

        return output

    def learn(self, inputs, target):
        # 1. guess what the target should be
        guess = self.guess(inputs)

        # 2. get the error
        error = target - guess

        # 3. correct the error
        for i in range(0, len(self.weights)):
            self.weights[i] += inputs[i] * self.lr * error

        # 4. display the current error
        print("input: " + str(inputs) + " output: " + str("A" if guess == 1 else "B") + " error: " + str(error))

    def activation(self, x):
        return 1 if x >= 0 else -1
