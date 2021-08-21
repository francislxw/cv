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
```
luoxi@XIAWUs-MacBook-Pro 3.1.Neural_machine_translation % ./run_ai.sh
----deep-learning:machine-translation----
100%|██████████| 10000/10000 [00:00<00:00, 51500.31it/s]2021-08-21 10:15:24.151113: W tensorflow/core/platform/profile_utils/cpu_utils.cc:108] Failed to find bogomips or clock in /proc/cpuinfo; cannot determine CPU frequency
2021-08-21 10:15:24.151267: I tensorflow/compiler/xla/service/service.cc:168] XLA service 0x3b864c30 initialized for platform Host (this does not guarantee that XLA will be used). Devices:
2021-08-21 10:15:24.151302: I tensorflow/compiler/xla/service/service.cc:176]   StreamExecutor device (0): Host, Default Version
X.shape: (10000, 30)
Y.shape: (10000, 10)
Xoh.shape: (10000, 30, 37)
Yoh.shape: (10000, 10, 11)
Source date: 9 may 1998
Target date: 1998-05-09

Source after preprocessing (indices): [12  0 24 13 34  0  4 12 12 11 36 36 36 36 36 36 36 36 36 36 36 36 36 36
 36 36 36 36 36 36]
Target after preprocessing (indices): [ 2 10 10  9  0  1  6  0  1 10]

Source after preprocessing (one-hot): [[0. 0. 0. ... 0. 0. 0.]
 [1. 0. 0. ... 0. 0. 0.]
 [0. 0. 0. ... 0. 0. 0.]
 ...
 [0. 0. 0. ... 0. 0. 1.]
 [0. 0. 0. ... 0. 0. 1.]
 [0. 0. 0. ... 0. 0. 1.]]
Target after preprocessing (one-hot): [[0. 0. 1. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 1.]
 [0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 1.]
 [0. 0. 0. 0. 0. 0. 0. 0. 0. 1. 0.]
 [1. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 1. 0. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 0. 0. 0. 0. 0. 1. 0. 0. 0. 0.]
 [1. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 1. 0. 0. 0. 0. 0. 0. 0. 0. 0.]
 [0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 1.]]
Model: "functional_1"
__________________________________________________________________________________________________
Layer (type)                    Output Shape         Param #     Connected to                     
==================================================================================================
input_1 (InputLayer)            [(None, 30, 37)]     0                                            
__________________________________________________________________________________________________
s0 (InputLayer)                 [(None, 64)]         0                                            
__________________________________________________________________________________________________
bidirectional (Bidirectional)   (None, 30, 64)       17920       input_1[0][0]                    
__________________________________________________________________________________________________
repeat_vector (RepeatVector)    (None, 30, 64)       0           s0[0][0]                         
                                                                 lstm[0][0]                       
                                                                 lstm[1][0]                       
                                                                 lstm[2][0]                       
                                                                 lstm[3][0]                       
                                                                 lstm[4][0]                       
                                                                 lstm[5][0]                       
                                                                 lstm[6][0]                       
                                                                 lstm[7][0]                       
                                                                 lstm[8][0]                       
__________________________________________________________________________________________________
concatenate (Concatenate)       (None, 30, 128)      0           bidirectional[0][0]              
                                                                 repeat_vector[0][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[1][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[2][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[3][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[4][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[5][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[6][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[7][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[8][0]              
                                                                 bidirectional[0][0]              
                                                                 repeat_vector[9][0]              
__________________________________________________________________________________________________
dense (Dense)                   (None, 30, 10)       1290        concatenate[0][0]                
                                                                 concatenate[1][0]                
                                                                 concatenate[2][0]                
                                                                 concatenate[3][0]                
                                                                 concatenate[4][0]                
                                                                 concatenate[5][0]                
                                                                 concatenate[6][0]                
                                                                 concatenate[7][0]                
                                                                 concatenate[8][0]                
                                                                 concatenate[9][0]                
__________________________________________________________________________________________________
dense_1 (Dense)                 (None, 30, 1)        11          dense[0][0]                      
                                                                 dense[1][0]                      
                                                                 dense[2][0]                      
                                                                 dense[3][0]                      
                                                                 dense[4][0]                      
                                                                 dense[5][0]                      
                                                                 dense[6][0]                      
                                                                 dense[7][0]                      
                                                                 dense[8][0]                      
                                                                 dense[9][0]                      
__________________________________________________________________________________________________
attention_weights (Activation)  (None, 30, 1)        0           dense_1[0][0]                    
                                                                 dense_1[1][0]                    
                                                                 dense_1[2][0]                    
                                                                 dense_1[3][0]                    
                                                                 dense_1[4][0]                    
                                                                 dense_1[5][0]                    
                                                                 dense_1[6][0]                    
                                                                 dense_1[7][0]                    
                                                                 dense_1[8][0]                    
                                                                 dense_1[9][0]                    
__________________________________________________________________________________________________
dot (Dot)                       (None, 1, 64)        0           attention_weights[0][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[1][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[2][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[3][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[4][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[5][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[6][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[7][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[8][0]          
                                                                 bidirectional[0][0]              
                                                                 attention_weights[9][0]          
                                                                 bidirectional[0][0]              
__________________________________________________________________________________________________
c0 (InputLayer)                 [(None, 64)]         0                                            
__________________________________________________________________________________________________
lstm (LSTM)                     [(None, 64), (None,  33024       dot[0][0]                        
                                                                 s0[0][0]                         
                                                                 c0[0][0]                         
                                                                 dot[1][0]                        
                                                                 lstm[0][0]                       
                                                                 lstm[0][2]                       
                                                                 dot[2][0]                        
                                                                 lstm[1][0]                       
                                                                 lstm[1][2]                       
                                                                 dot[3][0]                        
                                                                 lstm[2][0]                       
                                                                 lstm[2][2]                       
                                                                 dot[4][0]                        
                                                                 lstm[3][0]                       
                                                                 lstm[3][2]                       
                                                                 dot[5][0]                        
                                                                 lstm[4][0]                       
                                                                 lstm[4][2]                       
                                                                 dot[6][0]                        
                                                                 lstm[5][0]                       
                                                                 lstm[5][2]                       
                                                                 dot[7][0]                        
                                                                 lstm[6][0]                       
                                                                 lstm[6][2]                       
                                                                 dot[8][0]                        
                                                                 lstm[7][0]                       
                                                                 lstm[7][2]                       
                                                                 dot[9][0]                        
                                                                 lstm[8][0]                       
                                                                 lstm[8][2]                       
__________________________________________________________________________________________________
dense_2 (Dense)                 (None, 11)           715         lstm[0][0]                       
                                                                 lstm[1][0]                       
                                                                 lstm[2][0]                       
                                                                 lstm[3][0]                       
                                                                 lstm[4][0]                       
                                                                 lstm[5][0]                       
                                                                 lstm[6][0]                       
                                                                 lstm[7][0]                       
                                                                 lstm[8][0]                       
                                                                 lstm[9][0]                       
==================================================================================================
Total params: 52,960
Trainable params: 52,960
Non-trainable params: 0
__________________________________________________________________________________________________
100/100 [==============================] - 3s 26ms/step - loss: 16.4389 - dense_2_loss: 1.2520 - dense_2_1_loss: 1.0689 - dense_2_2_loss: 1.8431 - dense_2_3_loss: 2.6484 - dense_2_4_loss: 0.6695 - dense_2_5_loss: 1.2673 - dense_2_6_loss: 2.6651 - dense_2_7_loss: 0.8187 - dense_2_8_loss: 1.6448 - dense_2_9_loss: 2.5610 - dense_2_accuracy: 0.4596 - dense_2_1_accuracy: 0.6256 - dense_2_2_accuracy: 0.2609 - dense_2_3_accuracy: 0.0728 - dense_2_4_accuracy: 0.9875 - dense_2_5_accuracy: 0.3557 - dense_2_6_accuracy: 0.0561 - dense_2_7_accuracy: 0.9946 - dense_2_8_accuracy: 0.2426 - dense_2_9_accuracy: 0.0913                   
source: May 3 1979
output: 1979-05-03 

source: 5 April 09
output: 2009-04-05 

source: 21rd of August 2016
output: 2016-08-12 

source: Tue 10 Jul 2007
output: 2007-07-10 

source: Saturday May 9 2018
output: 2018-05-09 

source: March 3 2001
output: 2001-03-03 

source: March 3rd 2001
output: 2001-03-03 

source: 1 March 2001
output: 2001-03-01 
```
