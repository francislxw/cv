# Trigger Word Detection/Keyword Detection/Wake Word Detection
This project will construct a speech dataset and implement an algorithm for trigger word detection.

Perhaps you can also extend it to run on your laptop so that every time you say "activate" it starts up your favorite app, 
or turns on a network connected lamp in your house, or triggers some other event?

<img align='middle' src="docs/2.attn_model.png" width="80%" height="380">

## Techniques
* Structure a speech recognition project
* Synthesize and process audio recordings to create train/dev datasets
* Train a trigger word detection model and make predictions
* Use audio sampled at 44100 Hertz，means the microphone gives us 44,100 numbers per second
* The spectrogram we computed tells us how much different frequencies are present in an audio clip at any moment in time.
* Trigger word detection that updating several consecutive time steps can make the training data more balanced
* Any newly inserted segment doesn't overlap with previously inserted segments.

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
