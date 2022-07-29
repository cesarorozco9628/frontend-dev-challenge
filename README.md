# Morgana Frontend Challenge for Potential Hires

In Morgana, we strive to get you a mortgage as fast as possible, with the widest menu possible across the entire set of offers in the Mexican market.

One of the first steps to get this mortgage is to test some financial scenarios of your particular context using our simulator.

This simulator takes the value of the property you wish to buy, the amount of your downpayment, and makes some calculations to project the amount of the mortgage, the rate we can get you, how much you would have to pay monthly, and how much you should earn in order to have access to this mortgage configuration.

This simulation is not saved anywhere, and it is only used for information purposes.

Here is a picture of the simulator:

![image](https://user-images.githubusercontent.com/1316464/181802764-71bd1b7e-bfca-4742-89af-b447575473b6.png)


## Functional requirements

### Inputs

1. The property value should be greater than or equal to $400,000, as anything below this line is not profitable for morgana.
  - We should not limit the user to input this amount only, since the user can input whatever; rather, we should display an error message.
2. The downpayment should be greater than or equal to 5% of the property value, as anything below this threshold is not profitable for morgana.
  - We should not limit the user to input this amount only; rather, we should display an error message.
3. :warning: The slider, the input text of the downpayment, and the input text of the property value are connected. If one moves, so must the other two, and the be constantly validated. :warning:
4. The slider representing the mortgage term in years must be stored internally in a variable named `term_in_months`, multiplied by `12` to convert it into months.

### The constants

4. The rate of the mortgage can be assumed constant at 10.5%, and this is what appears on our simulator.
5. HOWEVER, the for calculation purposes, the `monthly_rate` is `0.0098`.

### The results

5. The amount of the mortgage loan is `mortgage_amount = property_value - downpayment` (remember that slider, text input for the property value, and text input for the downpayment should all be synchronized).
6. The required income is 2.5x the `monthly_payment`.
7. The `monthly_payment` is equal to `(mortgage_amount * monthly_rate) / (1 - (1 + monthly_rate)^term_in_months)`.
8. These 3 fields must refresh immediately as the 4 original input variables change.
