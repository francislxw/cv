# Operations on word vectors - word embeddings
<img align='right' src="docs/3.1.jazz.jpg" height="250" width="350" >
This project is to implement a model that uses an LSTM to generate music. We will even be able to listen to your own music at the end of the assignment. 

* Load pre-trained word vectors, and measure similarity using cosine similarity
* Use word embeddings to solve word analogy problems such as Man is to Woman as King is to __.
* Modify word embeddings to reduce their gender bias

## Techniques
* one-hot vectors do not do a good job of capturing the level of similarity between words (every one-hot vector has the same Euclidean 
  distance from any other one-hot vector).
* Embedding vectors such as GloVe vectors provide much more useful information about the meaning of individual words.
* Cosine similarity: is a good way to compare the similarity between pairs of word vectors, L2 (Euclidean) distance also works.
* For NLP applications, using a pre-trained set of word vectors is often a good way to get started..
* Debiasing word vectors
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

```
luoxi@XIAWUs-MacBook-Pro 3.Improvise_a_Jazz_Solo % ./run_ai.sh
----deep-learning:improvise-musics----
```
