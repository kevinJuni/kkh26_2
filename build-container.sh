ng build --prod;\
docker build --tag docker.crontiers.com/sac-manager:staging .;\
docker push docker.crontiers.com/sac-manager:staging; \
\
ng build --prod --configuration=vroadway-staging;\
docker build --tag docker.crontiers.com/vroadway-manager:staging .;\
docker push docker.crontiers.com/vroadway-manager:staging