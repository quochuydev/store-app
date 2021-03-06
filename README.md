GCP demo: [http://cafeman.xyz/](http://cafeman.xyz/)

heroku demo: [https://dlcapp.herokuapp.com/](https://dlcapp.herokuapp.com/)

**Linux**

cd /home/grocery/ && sudo bash ./commands/build.sh

**Docker**

docker build . --tag quochuydev/store-app:1.0.0
docker build -t quochuydev/store-app .
docker push quochuydev/store-app

**Nginx**

```shell
sudo cp /home/grocery/nginx/default.conf /etc/nginx/conf.d/default.conf
sudo docker exec -it nginx /bin/bash
service nginx status
nginx -s reload
cat /etc/nginx/conf.d/default.conf
cd /etc/nginx/conf.d
```

```shell
sudo docker logs nginx
sudo docker-compose exec nginx nginx -s reload
```

**Jenkins**

1.  sudo docker run -p 8080:8080 -p 50000:50000 -d -v jenkins_home:/var/jenkins_home jenkins/jenkins
    sudo docker run -d --name jenkins -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
2.  sudo mkdir /data/jenkins_home
    sudo chown -R 1000:1000 /data/jenkins_home

```shell
sudo cp /home/grocery/nginx/jenkins.conf /etc/nginx/conf.d/jenkins.conf
sudo docker exec -it nginx /bin/bash
service nginx status
nginx -s reload
```

```shell
https://stackoverflow.com/questions/47709208/how-to-find-docker-host-uri-to-be-used-in-jenkins-docker-plugin
If your docker running at the same host were you use Jenkins inside a container than you can use unix:///var/run/docker.sock as the “Docker Host URI”, but you must check & obtain the permissions for jenkins user by using
sudo groupadd docker
sudo usermod -aG docker $USER
sudo chmod a+rwx /var/run/docker.sock
sudo chmod a+rwx /var/run/docker.pid
```
