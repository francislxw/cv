#!/bin/bash
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/2.1.Operations_on_word_vectors_word_embeddings/wordvectors_embeddings.py improvise-musics:/myapp/
docker cp /Users/luoxi/EDisk/AI_Angela.Wu/AI_myself/I.Demo/2.1.Operations_on_word_vectors_word_embeddings/w2v_utils.py improvise-musics:/myapp/
docker run --rm -v $PWD:/myapp -w /myapp wordvectors-embeddings bash run_in_docker.sh
