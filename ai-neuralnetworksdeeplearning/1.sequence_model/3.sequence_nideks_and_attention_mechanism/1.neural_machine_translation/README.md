# Neural Machine Translation
This project is to build a Neural Machine Translation (NMT) model to translate human-readable dates ("25th of June, 2009") 
into machine-readable dates ("2009-06-25").

You will do this using an attention model, one of the most sophisticated sequence-to-sequence models.

<img align='middle' src="docs/1.data_set.jpg" width="90%" height="380">

## Techniques
* experiment with these models without using massive datasets, we will perform a simpler "date translation" task.
* The network will input a date written in a variety of possible formats (e.g. "the 29th of August 1958", "03/30/1968", "24 JUNE 1987")
* The network will translate them into standardized, machine readable dates (e.g. "1958-08-29", "1968-03-30", "1987-06-24").
* We will have the network learn to output dates in the common machine-readable format YYYY- MM-DD.
* 
<img align='middle' src="docs/2.emo_model.jpg" width="90%" height="330">

## How to Setup DEV Environment
### On Mac/Linux/Windows 10
1. Install Docker. refer [here](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/dockerfiles/dockerfiles/cpu.Dockerfile) for the cpu dockerfile generation.
2. Clone the emojify repository.
3. In the emojify dir, run below script to build docker image for testing:
    ```
    docker build -t emojify .
    ```
4. In the wordvectors-embeddings dir, run below scrip to run unit test:

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
### emojify_v1 result
```
```
