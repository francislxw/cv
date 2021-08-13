# Improvise a Jazz Solo with an LSTM Network
<img align='right' src="docs/3.1.jazz.jpg" height="250" width="350" >
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

<img align='middle' src="docs/2.music_gen.png" width="90%" height="300">


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
2021-08-11 09:29:34.538628: I tensorflow/compiler/xla/service/service.cc:168] XLA service 0x20c96d30 initialized for platform Host (this does not guarantee that XLA will be used). Devices:
2021-08-11 09:29:34.538638: I tensorflow/compiler/xla/service/service.cc:176]   StreamExecutor device (0): Host, Default Version
shape of X: (60, 30, 78)
number of training examples: 60
Tx (length of sequence): 30
total # of unique values: 78
Shape of Y: (30, 60, 78)
Model: "functional_1"
__________________________________________________________________________________________________
Layer (type)                    Output Shape         Param #     Connected to                     
==================================================================================================
input_1 (InputLayer)            [(None, 30, 78)]     0                                            
__________________________________________________________________________________________________
tf_op_layer_strided_slice (Tens [(None, 78)]         0           input_1[0][0]                    
__________________________________________________________________________________________________
reshape (Reshape)               (None, 1, 78)        0           tf_op_layer_strided_slice[0][0]  
                                                                 tf_op_layer_strided_slice_1[0][0]
                                                                 tf_op_layer_strided_slice_2[0][0]
                                                                 ...   
                                                                 tf_op_layer_strided_slice_28[0][0
                                                                 tf_op_layer_strided_slice_29[0][0
__________________________________________________________________________________________________
a0 (InputLayer)                 [(None, 64)]         0                                            
__________________________________________________________________________________________________
c0 (InputLayer)                 [(None, 64)]         0                                            
__________________________________________________________________________________________________
tf_op_layer_strided_slice_1 (Te [(None, 78)]         0           input_1[0][0]                    
__________________________________________________________________________________________________
    lstm (LSTM)                     [(None, 64), (None,  36608       reshape[0][0]                    
                                                                 a0[0][0]                         
                                                                 c0[0][0]                         
                                                                 reshape[1][0]                    
                                                                 lstm[0][0]                       
                                                                 lstm[0][2]                       
                                                                 reshape[2][0]                    
                                                                 lstm[1][0]                       
                                                                 lstm[1][2]                       
                                                                 ...                      
                                                                 reshape[29][0]                   
                                                                 lstm[28][0]                      
                                                                 lstm[28][2]                      
__________________________________________________________________________________________________
tf_op_layer_strided_slice_2 (Te [(None, 78)]         0           input_1[0][0]                    
__________________________________________________________________________________________________
tf_op_layer_strided_slice_3 (Te [(None, 78)]         0           input_1[0][0]                    
__________________________________________________________________________________________________
...            
__________________________________________________________________________________________________
tf_op_layer_strided_slice_27 (T [(None, 78)]         0           input_1[0][0]                    
__________________________________________________________________________________________________
tf_op_layer_strided_slice_28 (T [(None, 78)]         0           input_1[0][0]                    
__________________________________________________________________________________________________
tf_op_layer_strided_slice_29 (T [(None, 78)]         0           input_1[0][0]                    
__________________________________________________________________________________________________
dense (Dense)                   (None, 78)           5070        lstm[0][0]                       
                                                                 lstm[1][0]                       
                                                                 ...                        
                                                                 lstm[28][0]                      
                                                                 lstm[29][0]                      
==================================================================================================
Total params: 41,678
Trainable params: 41,678
Non-trainable params: 0
__________________________________________________________________________________________________


---model.fit---


Epoch 1/100
2/2 [==============================] - 0s 24ms/step - loss: 125.7240 - dense_loss: 4.3518 - dense_1_loss: 4.3412 - dense_2_loss: 4.3445 - dense_3_loss: 4.3410 - dense_4_loss: 4.3346 - dense_5_loss: 4.3464 - dense_6_loss: 4.3316 - dense_7_loss: 4.3382 - dense_8_loss: 4.3289 - dense_9_loss: 4.3342 - dense_10_loss: 4.3379 - dense_11_loss: 4.3335 - dense_12_loss: 4.3420 - dense_13_loss: 4.3289 - dense_14_loss: 4.3290 - dense_15_loss: 4.3219 - dense_16_loss: 4.3260 - dense_17_loss: 4.3388 - dense_18_loss: 4.3344 - dense_19_loss: 4.3364 - dense_20_loss: 4.3338 - dense_21_loss: 4.3336 - dense_22_loss: 4.3331 - dense_23_loss: 4.3376 - dense_24_loss: 4.3396 - dense_25_loss: 4.3344 - dense_26_loss: 4.3347 - dense_27_loss: 4.3286 - dense_28_loss: 4.3275 - dense_29_loss: 0.0000e+00 - dense_accuracy: 0.0667 - dense_1_accuracy: 0.1167 - dense_2_accuracy: 0.0667 - dense_3_accuracy: 0.0833 - dense_4_accuracy: 0.1167 - dense_5_accuracy: 0.0333 - dense_6_accuracy: 0.1667 - dense_7_accuracy: 0.0833 - dense_8_accuracy: 0.1000 - dense_9_accuracy: 0.1000 - dense_10_accuracy: 0.0667 - dense_11_accuracy: 0.0833 - dense_12_accuracy: 0.0500 - dense_13_accuracy: 0.1167 - dense_14_accuracy: 0.0667 - dense_15_accuracy: 0.1333 - dense_16_accuracy: 0.0833 - dense_17_accuracy: 0.0833 - dense_18_accuracy: 0.0667 - dense_19_accuracy: 0.0833 - dense_20_accuracy: 0.1000 - dense_21_accuracy: 0.0833 - dense_22_accuracy: 0.0500 - dense_23_accuracy: 0.0667 - dense_24_accuracy: 0.0500 - dense_25_accuracy: 0.0667 - dense_26_accuracy: 0.0167 - dense_27_accuracy: 0.0833 - dense_28_accuracy: 0.1000 - dense_29_accuracy: 0.0167                                                                                           
...
Epoch 10/100
2/2 [==============================] - 0s 8ms/step - loss: 98.3350 - dense_loss: 4.1922 - dense_1_loss: 3.8589 - dense_2_loss: 3.7898 - dense_3_loss: 3.6358 - dense_4_loss: 3.5741 - dense_5_loss: 3.3760 - dense_6_loss: 3.1940 - dense_7_loss: 3.3645 - dense_8_loss: 3.2147 - dense_9_loss: 3.4158 - dense_10_loss: 3.5626 - dense_11_loss: 3.3194 - dense_12_loss: 3.2437 - dense_13_loss: 3.1022 - dense_14_loss: 3.3207 - dense_15_loss: 3.1071 - dense_16_loss: 3.2814 - dense_17_loss: 3.3474 - dense_18_loss: 3.2137 - dense_19_loss: 3.3909 - dense_20_loss: 3.3456 - dense_21_loss: 3.3746 - dense_22_loss: 3.2867 - dense_23_loss: 3.3004 - dense_24_loss: 3.3021 - dense_25_loss: 3.2741 - dense_26_loss: 3.4520 - dense_27_loss: 3.3671 - dense_28_loss: 3.1278 - dense_29_loss: 0.0000e+00 - dense_accuracy: 0.1000 - dense_1_accuracy: 0.1833 - dense_2_accuracy: 0.1333 - dense_3_accuracy: 0.0833 - dense_4_accuracy: 0.2167 - dense_5_accuracy: 0.1167 - dense_6_accuracy: 0.2167 - dense_7_accuracy: 0.2500 - dense_8_accuracy: 0.2167 - dense_9_accuracy: 0.2167 - dense_10_accuracy: 0.0500 - dense_11_accuracy: 0.2000 - dense_12_accuracy: 0.1500 - dense_13_accuracy: 0.2000 - dense_14_accuracy: 0.1667 - dense_15_accuracy: 0.3000 - dense_16_accuracy: 0.3000 - dense_17_accuracy: 0.1833 - dense_18_accuracy: 0.1333 - dense_19_accuracy: 0.1333 - dense_20_accuracy: 0.1500 - dense_21_accuracy: 0.1500 - dense_22_accuracy: 0.1667 - dense_23_accuracy: 0.1667 - dense_24_accuracy: 0.1667 - dense_25_accuracy: 0.1833 - dense_26_accuracy: 0.1167 - dense_27_accuracy: 0.2000 - dense_28_accuracy: 0.1500 - dense_29_accuracy: 0.0500
...
Epoch 50/100
2/2 [==============================] - 0s 8ms/step - loss: 18.6113 - dense_loss: 3.9646 - dense_1_loss: 2.2808 - dense_2_loss: 1.6885 - dense_3_loss: 0.9106 - dense_4_loss: 0.6800 - dense_5_loss: 0.6445 - dense_6_loss: 0.4806 - dense_7_loss: 0.4752 - dense_8_loss: 0.3540 - dense_9_loss: 0.3699 - dense_10_loss: 0.3351 - dense_11_loss: 0.3576 - dense_12_loss: 0.3431 - dense_13_loss: 0.3476 - dense_14_loss: 0.3291 - dense_15_loss: 0.3393 - dense_16_loss: 0.2699 - dense_17_loss: 0.3958 - dense_18_loss: 0.3595 - dense_19_loss: 0.4343 - dense_20_loss: 0.3518 - dense_21_loss: 0.3925 - dense_22_loss: 0.3378 - dense_23_loss: 0.3470 - dense_24_loss: 0.3330 - dense_25_loss: 0.3713 - dense_26_loss: 0.3881 - dense_27_loss: 0.3480 - dense_28_loss: 0.3820 - dense_29_loss: 0.0000e+00 - dense_accuracy: 0.0833 - dense_1_accuracy: 0.4000 - dense_2_accuracy: 0.6000 - dense_3_accuracy: 0.8333 - dense_4_accuracy: 0.8667 - dense_5_accuracy: 0.9500 - dense_6_accuracy: 1.0000 - dense_7_accuracy: 0.9833 - dense_8_accuracy: 1.0000 - dense_9_accuracy: 0.9833 - dense_10_accuracy: 1.0000 - dense_11_accuracy: 1.0000 - dense_12_accuracy: 1.0000 - dense_13_accuracy: 1.0000 - dense_14_accuracy: 1.0000 - dense_15_accuracy: 0.9833 - dense_16_accuracy: 1.0000 - dense_17_accuracy: 0.9667 - dense_18_accuracy: 0.9833 - dense_19_accuracy: 0.9833 - dense_20_accuracy: 0.9833 - dense_21_accuracy: 0.9667 - dense_22_accuracy: 1.0000 - dense_23_accuracy: 1.0000 - dense_24_accuracy: 1.0000 - dense_25_accuracy: 1.0000 - dense_26_accuracy: 1.0000 - dense_27_accuracy: 1.0000 - dense_28_accuracy: 1.0000 - dense_29_accuracy: 0.0500
...
Epoch 99/100
2/2 [==============================] - 0s 7ms/step - loss: 9.0761 - dense_loss: 3.8436 - dense_1_loss: 1.5549 - dense_2_loss: 0.6558 - dense_3_loss: 0.2312 - dense_4_loss: 0.1405 - dense_5_loss: 0.1235 - dense_6_loss: 0.0970 - dense_7_loss: 0.1081 - dense_8_loss: 0.0799 - dense_9_loss: 0.0931 - dense_10_loss: 0.0824 - dense_11_loss: 0.1106 - dense_12_loss: 0.0763 - dense_13_loss: 0.0912 - dense_14_loss: 0.0897 - dense_15_loss: 0.0874 - dense_16_loss: 0.0755 - dense_17_loss: 0.1089 - dense_18_loss: 0.1155 - dense_19_loss: 0.1245 - dense_20_loss: 0.1029 - dense_21_loss: 0.1147 - dense_22_loss: 0.1096 - dense_23_loss: 0.1045 - dense_24_loss: 0.1149 - dense_25_loss: 0.1229 - dense_26_loss: 0.1450 - dense_27_loss: 0.1511 - dense_28_loss: 0.2209 - dense_29_loss: 0.0000e+00 - dense_accuracy: 0.1000 - dense_1_accuracy: 0.6333 - dense_2_accuracy: 0.8500 - dense_3_accuracy: 1.0000 - dense_4_accuracy: 1.0000 - dense_5_accuracy: 1.0000 - dense_6_accuracy: 1.0000 - dense_7_accuracy: 1.0000 - dense_8_accuracy: 1.0000 - dense_9_accuracy: 1.0000 - dense_10_accuracy: 1.0000 - dense_11_accuracy: 1.0000 - dense_12_accuracy: 1.0000 - dense_13_accuracy: 1.0000 - dense_14_accuracy: 1.0000 - dense_15_accuracy: 1.0000 - dense_16_accuracy: 1.0000 - dense_17_accuracy: 1.0000 - dense_18_accuracy: 1.0000 - dense_19_accuracy: 1.0000 - dense_20_accuracy: 1.0000 - dense_21_accuracy: 1.0000 - dense_22_accuracy: 1.0000 - dense_23_accuracy: 1.0000 - dense_24_accuracy: 1.0000 - dense_25_accuracy: 1.0000 - dense_26_accuracy: 1.0000 - dense_27_accuracy: 1.0000 - dense_28_accuracy: 1.0000 - dense_29_accuracy: 0.0500
Epoch 100/100
2/2 [==============================] - 0s 7ms/step - loss: 8.9612 - dense_loss: 3.8424 - dense_1_loss: 1.5477 - dense_2_loss: 0.6454 - dense_3_loss: 0.2279 - dense_4_loss: 0.1377 - dense_5_loss: 0.1215 - dense_6_loss: 0.0949 - dense_7_loss: 0.1053 - dense_8_loss: 0.0767 - dense_9_loss: 0.0935 - dense_10_loss: 0.0814 - dense_11_loss: 0.1057 - dense_12_loss: 0.0733 - dense_13_loss: 0.0869 - dense_14_loss: 0.0880 - dense_15_loss: 0.0873 - dense_16_loss: 0.0732 - dense_17_loss: 0.0988 - dense_18_loss: 0.1150 - dense_19_loss: 0.1154 - dense_20_loss: 0.0897 - dense_21_loss: 0.1101 - dense_22_loss: 0.1121 - dense_23_loss: 0.0984 - dense_24_loss: 0.1059 - dense_25_loss: 0.1211 - dense_26_loss: 0.1537 - dense_27_loss: 0.1401 - dense_28_loss: 0.2120 - dense_29_loss: 0.0000e+00 - dense_accuracy: 0.1000 - dense_1_accuracy: 0.6333 - dense_2_accuracy: 0.8667 - dense_3_accuracy: 1.0000 - dense_4_accuracy: 1.0000 - dense_5_accuracy: 1.0000 - dense_6_accuracy: 1.0000 - dense_7_accuracy: 1.0000 - dense_8_accuracy: 1.0000 - dense_9_accuracy: 1.0000 - dense_10_accuracy: 1.0000 - dense_11_accuracy: 1.0000 - dense_12_accuracy: 1.0000 - dense_13_accuracy: 1.0000 - dense_14_accuracy: 1.0000 - dense_15_accuracy: 1.0000 - dense_16_accuracy: 1.0000 - dense_17_accuracy: 1.0000 - dense_18_accuracy: 1.0000 - dense_19_accuracy: 1.0000 - dense_20_accuracy: 1.0000 - dense_21_accuracy: 1.0000 - dense_22_accuracy: 1.0000 - dense_23_accuracy: 1.0000 - dense_24_accuracy: 1.0000 - dense_25_accuracy: 1.0000 - dense_26_accuracy: 1.0000 - dense_27_accuracy: 1.0000 - dense_28_accuracy: 1.0000 - dense_29_accuracy: 0.0500


--music_inference_model
Model: "functional_3"
__________________________________________________________________________________________________
Layer (type)                    Output Shape         Param #     Connected to                     
==================================================================================================
input_2 (InputLayer)            [(None, 1, 78)]      0                                            
__________________________________________________________________________________________________
a0 (InputLayer)                 [(None, 64)]         0                                            
__________________________________________________________________________________________________
c0 (InputLayer)                 [(None, 64)]         0                                            
__________________________________________________________________________________________________
lstm (LSTM)                     [(None, 64), (None,  36608       input_2[0][0]                    
                                                                 a0[0][0]                         
                                                                 c0[0][0]                         
                                                                 lambda[0][0]                     
                                                                 lstm[30][0]                      
                                                                 lstm[30][2]                      
                                                                 lambda_1[0][0]                   
                                                                 ...                                                                                       
                                                                 lambda_18[0][0]                  
                                                                 lstm[48][0]                      
                                                                 lstm[48][2]                      
__________________________________________________________________________________________________
dense (Dense)                   (None, 78)           5070        lstm[30][0]                      
                                                                 lstm[31][0]                      
                                                                 lstm[32][0]                      
                                                                 ...                     
                                                                 lstm[48][0]                      
                                                                 lstm[49][0]                      
__________________________________________________________________________________________________
lambda (Lambda)                 (None, 1, 78)        0           dense[30][0]                     
__________________________________________________________________________________________________
lambda_1 (Lambda)               (None, 1, 78)        0           dense[31][0]                     
__________________________________________________________________________________________________
lambda_2 (Lambda)               (None, 1, 78)        0           dense[32][0]                                       
__________________________________________________________________________________________________
...
__________________________________________________________________________________________________
lambda_17 (Lambda)              (None, 1, 78)        0           dense[47][0]                     
__________________________________________________________________________________________________
lambda_18 (Lambda)              (None, 1, 78)        0           dense[48][0]                     
==================================================================================================
Total params: 41,678
Trainable params: 41,678
Non-trainable params: 0
__________________________________________________________________________________________________



Number of outputs: 20
Shape prob per time: (1, 78)
Print shape, index per time sample: (20, 1)
Print value for 0: [25]
Print value for 0, one-hot:
[0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 1. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.
 0. 0. 0. 0.]
np.argmax(results[12]) = 2
np.argmax(results[17]) = 36
list(indices[12:18]) = [array([2]), array([28]), array([39]), array([25]), array([66]), array([36])]
Predicting new values for different set of chords.
Generated 15 sounds using the predicted values for the set of chords ("1") and after pruning
Generated 15 sounds using the predicted values for the set of chords ("2") and after pruning
Generated 15 sounds using the predicted values for the set of chords ("3") and after pruning
Generated 15 sounds using the predicted values for the set of chords ("4") and after pruning
Generated 15 sounds using the predicted values for the set of chords ("5") and after pruning
Your generated music is saved in output/my_music.midi
done, the music is generated at /myapp/output/my_music.midi
```
