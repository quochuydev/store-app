sudo git reset --hard
sudo git pull
sudo docker-compose build
sudo docker push quochuydev/store-app:1.0.3
sudo docker-compose up -d