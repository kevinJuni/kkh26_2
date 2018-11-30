ng build --prod;\
docker build --tag docker.crontiers.com/sac-manager:staging .;\
docker push docker.crontiers.com/sac-manager:staging