#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'init'

# 如果发布到 https://<USERNAME>.github.io
# git push -f https://github.com/cloudsTwo.github.io.git
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f https://github.com/cloudsTwo/vuepress_show_page.git main:gh-pages

cd -