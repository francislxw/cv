#!/bin/bash
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/2.Writing_like_Shakespeare/shakespeare_poem.py shakespeare-poem:/myapp/
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/2.Writing_like_Shakespeare/shakespeare.txt shakespeare-poem:/myapp/
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/2.Writing_like_Shakespeare/models/model_shakespeare_kiank_350_epoch.h5 shakespeare-poem:/myapp/models/    
docker run --rm -v $PWD:/myapp -w /myapp shakespeare-poem bash run_in_docker.sh
