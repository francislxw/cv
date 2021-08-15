# Emojify by Word Vectors/Embedding
This project is going to use word vector representations to build an Emojifier. includes:
1. Start with a baseline model (Emojifier-V1) using word embeddings. 
2. Build a more sophisticated model (Emojifier-V2) that further incorporates an LSTM.

When using word vectors, we'll see that even if the training set explicitly relates only a few words to a particular emoji, 
the algorithm will be able to generalize and associate additional words in the test set to the same emoji.
* This works even if those additional words don't even appear in the training set.
* This allows you to build an accurate classifier mapping from sentences to emojis, even using a small training set.

<img align='middle' src="docs/1.cosine_sim.png" width="90%" height="300">

## Techniques
* Convert each word in the input sentence into their word vector representations.
* Then take an average of the word vectors.
* Similar to the previous exercise, we will use pre-trained 50-dimensional GloVe embeddings.
* Because adore has a similar embedding as love, the algorithm has generalized correctly even to a word it has never seen before.
* Words such as heart, dear, beloved or adore have embedding vectors similar to love.
* In V1, the algorithm ignores word ordering, so is not good at understanding phrases like "not happy."
* In V1, it just averages all the words' embedding vectors together, without considering the ordering of words.

<img align='middle' src="docs/2.neutralize.png" width="90%" height="300">


## How to Setup DEV Environment
### On Mac/Linux/Windows 10
1. Install Docker. refer [here](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/dockerfiles/dockerfiles/cpu.Dockerfile) for the cpu dockerfile generation.
2. Clone the wordvectors-embeddings repository.
3. In the wordvectors-embeddings dir, run below script to build docker image for testing:
    ```
    docker build -t wordvectors-embeddings .
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

```
luoxi@XIAWUs-MacBook-Pro 2.1.Operations_on_word_vectors_word_embeddings % ./run_ai.sh
```

