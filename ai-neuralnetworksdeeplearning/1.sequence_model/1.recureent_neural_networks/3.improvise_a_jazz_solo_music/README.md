# Improvise a Jazz Solo with an LSTM Network
<img align='right' src="docs/3.1.jazz.jpg" height="300" width="250" >
This project is to implement a model that uses an LSTM to generate music. We will even be able to listen to your own music at the end of the assignment. 

* Apply an LSTM to music generation.
* Generate our own jazz music with deep learning.

## Techniques
* Use Keras to implement, include:
* Reshape(): Reshapes an output to a certain shape.
* LSTM(): Long Short-Term Memory layer
* Dense(): A regular fully-connected neural network layer.
* Lambda layer
* optimizer: Adam optimizer
* Loss function: categorical cross-entropy (for multi-class classification)

<img align='middle' src="docs/2.music_gen.jpg" width="90%" height="300">


## How to Setup DEV Environment
### On Mac/Linux/Windows 10
1. Install Docker. refer [here](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/dockerfiles/dockerfiles/cpu.Dockerfile) for the cpu dockerfile generation.
2. Clone the improvise-solo-music repository.
3. In the 3.improvise_solo_music dir, run below script to build docker image for testing:
    ```
    docker build -t improvise-solo-music .
    ```
4. In the 3.improvise_solo_music dir, run below scrip to run unit test:

    a) For Mac/Linux:
    ```
    bash run_ai.sh
    ```
    b) For Windows 10: 
    ```
    run_ai.bat
    ```
5. python version:3.6~3.8 (V3.6 here)
## Experiment Result
<img align='middle' src="docs/6.result.jpg" height="400" width="70%" >

<img align='middle' src="docs/2._result2.gif" height="300" width="90%" >
