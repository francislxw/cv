# Writing like Shakespeare by Long Short Term Memory (LSTM)
<img align='right' src="docs/1.shakespeare.jpg" height="300" width="250" >
This project is to generate Shakespeare poems by using a collection of Shakespearian poems with LSTM. 

Using LSTM cells, you can learn longer term dependencies that span many characters in the text--e.g., where a character appearing somewhere a sequence can influence what should be a different character much much later in the sequence.

## Techniques
### Recurrent Neural Network
* Forward propagation to compute the loss function
* Backward propagation to compute the gradients with respect to the loss function
* Clip the gradients to avoid exploding gradients
* Using the gradients, update parameters with the gradient descent update rule.

<img align='middle' src="docs/3.rnn.png" width="90%" height="300">


## How to Setup DEV Environment
### On Mac/Linux/Windows 10
1. Install Docker.
2. Clone the ci-pipeline repository.
3. In the 1.dinosaurus_name dir, run below script to build docker image for testing:
    ```
    docker build -t shakespeare-poem .
    ```
4. In the 1.dinosaurus_name dir, run below scrip to run unit test:

    a) For Mac/Linux:
    ```
    bash run_ai.sh
    ```
    b) For Windows 10: 
    ```
    run_ai.bat
    ```
## Experiment Result
```
[luoxi@XIAWUs-MacBook-Pro 2.Shakespeare_Poem % ./run_ai.sh 
----ai:shakespeare_poem----

   
