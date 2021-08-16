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

* In V2, the model will feed word embeddings into an LSTM.
* In V2, the LSTM will learn to predict the most appropriate emoji.
* Use padding for the same length of the mini-batch

<img align='middle' src="docs/2.neutralize.png" width="90%" height="300">


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
* emojify_v1 result
```
luoxi@XIAWUs-MacBook-Pro 2.2.Emojify % ./run_ai.sh
----deep-learning:emojify_v1----
never talk to me again 😞
I am proud of your achievements 😄
It is the worst day in my life 😞
Miss you so much ❤️
food is life 🍴
I love you mum ❤️
Stop saying bullshit 😞
congratulations on your acceptance 😄
The assignment is too long  😞
I want to go play ⚾
Sentence 'I missed you' has label index 0, which is emoji ❤️
Label index 0 in one-hot encoding format is [1. 0. 0. 0. 0.]
the index of cucumber in the vocabulary is 113317
the 289846th word in the vocabulary is potatos
avg = 
 [-0.008005    0.56370833 -0.50427333  0.258865    0.55131103  0.03104983
 -0.21013718  0.16893933 -0.09590267  0.141784   -0.15708967  0.18525867
  0.6495785   0.38371117  0.21102167  0.11301667  0.02613967  0.26037767
  0.05820667 -0.01578167 -0.12078833 -0.02471267  0.4128455   0.5152061
  0.38756167 -0.898661   -0.535145    0.33501167  0.68806933 -0.2156265
  1.797155    0.10476933 -0.36775333  0.750785    0.10282583  0.348925
 -0.27262833  0.66768    -0.10706167 -0.283635    0.59580117  0.28747333
 -0.3366635   0.23393817  0.34349183  0.178405    0.1166155  -0.076433
  0.1445417   0.09808667]
(132,)
(132,)
(132, 5)
never talk to me again
<class 'numpy.ndarray'>
(20,)
(20,)
(132, 5)
<class 'numpy.ndarray'>
Epoch: 0 --- cost = 1.952049881281007
Accuracy: 0.3484848484848485
Epoch: 100 --- cost = 0.07971818726014807
Accuracy: 0.9318181818181818
Epoch: 200 --- cost = 0.04456369243681402
Accuracy: 0.9545454545454546
Epoch: 300 --- cost = 0.03432267378786059
Accuracy: 0.9696969696969697
[[3.]
 [2.]
 [3.]
 ...
 [4.]
 [3.]
 [0.]
 [2.]]
Training set:
Accuracy: 0.9772727272727273
Test set:
Accuracy: 0.8571428571428571
Accuracy: 0.8333333333333334

i adore you ❤️
i love you ❤️
funny lol 😄
lets play with a ball ⚾
food is ready 🍴
not feeling happy 😄
(56,)
           ❤️    ⚾    😄    😞   🍴
Predicted  0.0  1.0  2.0  3.0  4.0  All
Actual                                 
0            6    0    0    1    0    7
1            0    8    0    0    0    8
2            2    0   16    0    0   18
3            1    1    2   12    0   16
4            0    0    1    0    6    7
All          9    9   19   13    6   56

```
