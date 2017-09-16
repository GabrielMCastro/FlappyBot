import Perceptron
import Point


def start():
    p = Perceptron.Perceptron()

    points = []
    for i in range(0, 100):
        points += [Point.Point()]

    count = 0
    while True:
        for i in range(0, len(points)):
            p.learn([points[i].x, points[i].y], points[i].ans)
            count += 1


start()
