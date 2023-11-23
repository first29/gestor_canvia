set -e

npm run build

cd dist

git init
git chekout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:first29/gestor_canvia.git main:gh-pages

cd -