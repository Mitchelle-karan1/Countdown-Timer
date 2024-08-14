# let's glore a favourite number
Favourite_Number =88
print( f"my favourite number is {Favourite_Number}")
#string Variable
greeting = "Hello plp"
print(greeting)
#Boolean
is_python_fun =True
print(f"is python fun ? { is_python_fun}")
#Control flow:if, elif, else
temprature =38
if temprature > 25:
    print("it's hot outside! wear shorts.")
elif temprature > 15:
    print("it's warm. Maybe try a light clothe.")
else:
    print("Be warned! it's cold here, please bundle up!")
#for and while loops
for 1 in range (5):
    print(f"This is a for loop iteration{1}")
    #while 
    countdown = 5
    while countdown > 0:
        print(f"countdown:{countdown}")
        countdown-= 1
        print("Blast off!")
        
#Define a function
def greet(any):
    return f"hello, {any}"
#apply the function
print(greet("Abenjo"))
print(greet("Hannah"))
        
    