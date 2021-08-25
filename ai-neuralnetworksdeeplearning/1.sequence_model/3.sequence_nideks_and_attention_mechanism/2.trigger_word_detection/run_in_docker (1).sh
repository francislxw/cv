#!/bin/bash
echo ----Compile Jenkinsfile scripts----
# In the step of creating report, the cobertura requires all source files to be in one folder.
rm -rf temp/
mkdir -p temp/src
mkdir -p temp/external_commands/src
cp $(ls -d $PWD/* | grep -E '\/Jenkinsfile[0-9A-Za-z]+(\.groovy)?$') temp/src/
cp $(ls -d $PWD/unify_lib/* | grep '\.groovy$') temp/src/
cp $(ls -d $PWD/external_commands/src/*) temp/external_commands/src
cp -r $PWD/external_commands/spec temp/external_commands/spec
cp $PWD/external_commands/.coveragerc temp/external_commands
groovyc -d temp/obj $(ls -d $PWD/temp/src/*)

echo ----Instrument the Jenkinsfile classes----
# If we delete cobertura.ser before instr, the final CC report will be binded with source code,
# meanwhile, it will include the top level code in the scripts.
# If we delete cobertura.ser before test, the final CC report won't be binded with source code,
# but it will exclude the top level code.
rm -f temp/cobertura.ser
/usr/bin/cobertura-instrument --destination temp/instr temp/obj --datafile temp/cobertura.ser --srcdir lib --auxClasspath /usr/share/java/groovy.jar 2>&1 | tee -a temp/log.txt

echo ----Run unit tests and generate coverage data----
rm -f temp/err.txt
groovy -cp /usr/share/java/cobertura.jar:temp/instr:test -Dnet.sourceforge.cobertura.datafile=temp/cobertura.ser test/RunTest.groovy 2>&1 | tee -a temp/err.txt
if grep -Rq "^FAILURES\!\!\!" temp/err.txt
then
  exit 2
fi

echo ----Create coverage report----
/usr/bin/cobertura-report --datafile temp/cobertura.ser --format html --destination temp/coverage temp/src 2>&1 | tee -a temp/log.txt

echo ----Check coverage rate, target: 100%----
/usr/bin/cobertura-check --datafile temp/cobertura.ser --line 100 2>&1 | tee -a temp/log.txt
groovy_cov_exit_code=${PIPESTATUS[0]}

if [ $groovy_cov_exit_code -ne 0 ]
then
  echo "Groovy code coverage checking failed!!! Exit Code: $groovy_cov_exit_code"
fi

cd temp/external_commands
echo ----Run Python unit tests and generate coverage data of external commands----
mamba  --enable-coverage > result.txt
cat result.txt
if cat result.txt | grep "failed"
then
  exit 2
fi

echo ----Check coverage rate of external commands, target: 100%----
coverage report -m  > cov.txt
cat cov.txt
if ! cat cov.txt | tail -n 1 | grep "100%"
then
  echo "Python code coverage checking failed!"
  coverage html
  exit 2
fi
python_cov_exit_code=$?

if [ $groovy_cov_exit_code -ne 0 ]
then
  echo "Groovy code coverage checking failed!!! Exit Code: $groovy_cov_exit_code"
  exit $groovy_cov_exit_code
else
  exit $python_cov_exit_code
fi
