GCP demo: [http://cafeman.xyz/](http://cafeman.xyz/)

heroku demo: [https://dlcapp.herokuapp.com/](https://dlcapp.herokuapp.com/)

```shell
sudo cp nginx/default.conf /etc/nginx/conf.d/default.conf
sudo docker exec -it nginx /bin/bash
service nginx status
nginx -s reload
cat /etc/nginx/conf.d/default.conf
cd /etc/nginx/conf.d
```

**Nginx**

sudo docker logs nginx
sudo docker-compose exec nginx nginx -s reload

**Jenkins**
sudo docker run -p 8080:8080 -p 50000:50000 -d -v jenkins_home:/var/jenkins_home jenkins/jenkins
sudo docker run -d --name jenkins -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts

```shell
sudo cp /home/grocery/nginx/jenkins.conf /etc/nginx/conf.d/jenkins.conf
```
