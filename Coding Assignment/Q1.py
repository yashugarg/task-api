# Q1: Find the Most Frequent Item in an Array.
# Language used: Python3


def mostFrequent(arr):
    Hash = dict()

    for element in arr:
        if element in Hash.keys():
            Hash[element] += 1
        else:
            Hash[element] = 1

    max_count = 0
    res = -1
    for i in Hash:
        if max_count < Hash[i]:
            res = i
            max_count = Hash[i]

    return res


arr = input("Enter space separated elements: ").split()
print("Most frequent element in given array is " + mostFrequent(arr))
