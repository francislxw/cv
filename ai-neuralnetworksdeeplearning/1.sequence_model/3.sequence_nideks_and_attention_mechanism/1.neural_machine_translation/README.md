# Neural Machine Translation
This project is to build a Neural Machine Translation (NMT) model to translate human-readable dates ("25th of June, 2009") 
into machine-readable dates ("2009-06-25").
You will do this using an attention model, one of the most sophisticated sequence-to-sequence models.

<img align='middle' src="docs/1.data_set.jpg" width="90%" height="380">

## Techniques
* Convert each word in the input sentence into their word vector representations.
* Then take an average of the word vectors.
* Similar to the previous exercise, we will use pre-trained 50-dimensional GloVe embeddings.
* Because adore has a similar embedding as love, the algorithm has generalized correctly even to a word it has never seen before.
* Words such as heart, dear, beloved or adore have embedding vectors similar to love.
* In V1, the algorithm ignores word ordering, so is not good at understanding phrases like "not happy."
* In V1, it just averages all the words' embedding vectors together, without considering the ordering of words.
* 
<img align='middle' src="docs/2.emo_model.jpg" width="90%" height="330">

* In V2, the model will feed word embeddings into an LSTM.
* In V2, the LSTM will learn to predict the most appropriate emoji.
* Use padding for the same length of the mini-batch

<img align='middle' src="docs/3.emojifier-v2.png" width="90%" height="500">


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
