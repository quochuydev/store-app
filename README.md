GCP demo: [http://cafeman.xyz/](http://cafeman.xyz/)

heroku demo: [https://dlcapp.herokuapp.com/](https://dlcapp.herokuapp.com/)

```shell
sudo cp nginx/default.conf /etc/nginx/conf.d/default.conf
sudo cp /home/grocery/nginx/jenkins.conf /etc/nginx/conf.d/jenkins.conf
sudo docker exec -it nginx /bin/bash
service nginx status
nginx -s reload
cat /etc/nginx/conf.d/default.conf
cd /etc/nginx/conf.d
```
