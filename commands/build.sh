sudo git reset --hard
sudo git pull
sudo docker-compose build
sudo docker push quochuydev/store-app
sudo docker-compose up -d