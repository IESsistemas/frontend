git pull;
yarn build;
sshpass -p 'M00dTech2o2!' ssh root@89.117.32.199 rm -R /root/docker/IES/ies_frontendUP/prod/*;
sshpass -p 'M00dTech2o2!' scp -r ./build/* root@89.117.32.199:/root/docker/IES/ies_frontendUP/prod/;
