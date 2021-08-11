#!/bin/bash
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/3.Improvise_a_Jazz_Solo/music_utils.py improvise-musics:/myapp/
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/3.Improvise_a_Jazz_Solo/improvise_musics.py improvise-musics:/myapp/
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/3.Improvise_a_Jazz_Solo/inference_code.py improvise-musics:/myapp/
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/3.Improvise_a_Jazz_Solo/data_utils.py improvise-musics:/myapp/
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/3.Improvise_a_Jazz_Solo/output/my_music.midi improvise-musics:/myapp/output/

#docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/3.Improvise_a_Jazz_Solo/preprocess.py improvise-musics:/myapp/
#docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/3.Improvise_a_Jazz_Solo/grammar.py improvise-musics:/myapp/
docker run --rm -v $PWD:/myapp -w /myapp improvise-musics bash run_in_docker.sh
