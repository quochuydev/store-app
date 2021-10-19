sudo git reset --hard
sudo git pull
sudo docker build -t quochuydev/store-app:1.0.15 .
# sudo docker-compose build --no-cache
sudo docker-compose up -d