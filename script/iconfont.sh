#!/bin/sh
curl -o iconfontTemp.json -s 'https://www.iconfont.cn/api/project/detail.json?pid=3703384&t=1665642357754&ctoken=h2dgBuRiKch0b7dDNy-qkefy' \
  -H 'authority: www.iconfont.cn' \
  -H 'sec-ch-ua: "Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'x-requested-with: XMLHttpRequest' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3703384&keyword=&project_type=&page=' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'cookie: cna=k/yqG8OhIRcCAbcPsuK/C1di; EGG_SESS_ICONFONT=LwyPfFe9mdLtPg5kAyRM2oKTWe0dYQN45w0qN-zVhK6dp-njsVT2v8vj0y7Na1xO_qxR0Q5yn44fvFMYv4dAbFkkPN7Q2SIT7WFQ5FO2LlLOPY8Z0SF1Bl7Er7vr9oGyZ0kuuKpyTGt6r1KWP_so-VglVTY7NhaGnkIGjh9P7wOvrspV9bphAeKynfxQ6J_7C-RvxCgYZKmCnajawaDU_g==; u=6304610; u.sig=MwAxs6MX_w9fQduPC6NS6-8vhXFdJ4emPWiUwOXXXaM; ctoken=h2dgBuRiKch0b7dDNy-qkefy; xlly_s=1; isg=BGZmz-dXObYDju1mSTTc9PzKt9zoR6oBeGSA7lAOcAlk0wTtuNZVEGXlK8_f-6IZ' \

cd './script' || exit

node updateIconfont.js
