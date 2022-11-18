# Q2: Program to check if a number is Palindrome
# Language: Python3

def checkPalindrome(n):
    reverse = 0
    temp = n
    while (temp != 0):
        reverse = (reverse * 10) + (temp % 10)
        temp = temp // 10
	
    return (reverse == n)

n = int(input("Enter a number: "))
if (checkPalindrome(n) == 1):
	print("True")
else:
	print("False")
