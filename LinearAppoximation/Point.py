import random


def f(x):
    return 0.2 * x + 0.3


class Point(object):

    def __init__(self):
        self.x = random.uniform(-1, 1)
        self.y = random.uniform(-1, 1)
        self.ans = 1 if self.y >= f(self.y) else -1
