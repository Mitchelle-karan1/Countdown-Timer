# file_handling_assignment.py

# Task 1: File Creation - Create a new text file and write content to it.
try:
    # Creating and opening "my_file.txt" in write mode
    with open("my_file.txt", 'w') as file:
        # Writing a mix of strings and numbers
        file.write("Hello, this is the first line.\n")
        file.write("The number is 42.\n")
        file.write("Let's add one more line for good measure.\n")
    print("File created and written successfully.")
except PermissionError:
    print("You do not have permission to write to the file.")
except Exception as e:
    print(f"An error occurred: {e}")

# Task 2: File Reading and Display - Read the contents of the file and display.
try:
    # Opening "my_file.txt" in read mode
    with open("my_file.txt", 'r') as file:
        print("\nReading file content:")
        content = file.read()
        print(content)  # Displaying the content of the file
except FileNotFoundError:
    print("File not found. Please ensure 'my_file.txt' exists.")
except PermissionError:
    print("You do not have permission to read the file.")
except Exception as e:
    print(f"An error occurred: {e}")

# Task 3: File Appending - Append new content to the existing file.
try:
    # Opening "my_file.txt" in append mode
    with open("my_file.txt", 'a') as file:
        # Appending three more lines
        file.write("Appending a new line here.\n")
        file.write("Another number: 84.\n")
        file.write("Final line for the append section.\n")
    print("Content appended successfully.")
except PermissionError:
    print("You do not have permission to append to the file.")
except Exception as e:
    print(f"An error occurred: {e}")

# Task 4: Error Handling - Make sure to handle errors gracefully.
finally:
    print("File handling script has completed execution.")
