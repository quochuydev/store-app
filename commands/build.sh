sudo git reset --hard
sudo git pull
# sudo docker-compose build
sudo docker tag store-app:1.0.8 quochuydev/store-app:1.0.8
sudo docker push quochuydev/store-app
# sudo docker-compose up -d