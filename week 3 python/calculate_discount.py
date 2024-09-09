# calculate_discount.py

def calculate_discount(price, discount_percent):
    """
    Calculate the final price after applying the discount.
    
    Parameters:
    - price (float): The original price of the item.
    - discount_percent (float): The discount percentage to apply.
    
    Returns:
    - float: The final price after discount if discount is 20% or higher; otherwise, the original price.
    """
    if discount_percent >= 20:
        discount_amount = (discount_percent / 100) * price
        final_price = price - discount_amount
    else:
        final_price = price
    return final_price

def main():
    # Prompt user for input
    try:
        original_price = float(input("Enter the original price of the item: "))
        discount_percent = float(input("Enter the discount percentage: "))
        
        # Calculate the final price
        final_price = calculate_discount(original_price, discount_percent)
        
        # Print the result
        print(f"The final price after applying the discount is: ${final_price:.2f}")
    except ValueError:
        print("Please enter valid numerical values.")

if __name__ == "__main__":
    main()
