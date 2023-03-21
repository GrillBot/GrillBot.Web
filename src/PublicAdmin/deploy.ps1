git pull --rebase;
git push;
docker build -t ghcr.io/grillbot/grillbot-public-web .
docker push ghcr.io/grillbot/grillbot-public-web
