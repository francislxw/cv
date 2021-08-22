# Trigger Word Detection/Keyword Detection/Wake Word Detection
This project will construct a speech dataset and implement an algorithm for trigger word detection.

Perhaps you can also extend it to run on your laptop so that every time you say "activate" it starts up your favorite app, 
or turns on a network connected lamp in your house, or triggers some other event?

<img align='middle' src="docs/2.attn_model.png" width="80%" height="380">

## Techniques
* experiment with these models without using massive datasets, we will perform a simpler "date translation" task.
* The network will input a date written in a variety of possible formats (e.g. "the 29th of August 1958", "03/30/1968", "24 JUNE 1987")
* The network will translate them into standardized, machine readable dates (e.g. "1958-08-29", "1968-03-30", "1987-06-24").
* We will have the network learn to output dates in the common machine-readable format YYYY- MM-DD.
* 
<img align='middle' src="docs/1.attn_mechanism.png" width="70%" height="330">

## How to Setup DEV Environment
### On Mac/Linux/Windows 10
1. Install Docker. refer [here](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/dockerfiles/dockerfiles/cpu.Dockerfile) for the cpu dockerfile generation.
2. Clone the emojify repository.
3. In the Trigger_word_detection dir, run below script to build docker image for testing:
    ```
    docker build -t emojify .
    ```
4. In the triggerword-detection dir, run below scrip to launch the project:

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
```
```
