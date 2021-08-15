# Emojify by Word Vectors
This project is going to use word vector representations to build an Emojifier. 

When using word vectors, we'll see that even if the training set explicitly relates only a few words to a particular emoji, 
the algorithm will be able to generalize and associate additional words in the test set to the same emoji.
* This works even if those additional words don't even appear in the training set.
* This allows you to build an accurate classifier mapping from sentences to emojis, even using a small training set.

<img align='middle' src="docs/1.cosine_sim.png" width="90%" height="300">

## Techniques
* one-hot vectors do not do a good job of capturing the level of similarity between words (every one-hot vector has the same Euclidean 
  distance from any other one-hot vector).
* Embedding vectors such as GloVe vectors provide much more useful information about the meaning of individual words.
* Cosine similarity: is a good way to compare the similarity between pairs of word vectors, L2 (Euclidean) distance also works.
* For NLP applications, using a pre-trained set of word vectors is often a good way to get started..
* Debiasing word vectors

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

