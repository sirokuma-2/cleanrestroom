# アプケーション名
Quick Clean Restroom
# アプリケーション概要
最寄りの綺麗なトイレの位置をリアルタイムで案内し、トイレの情報を提供する
# URL
https://cleanrestrooms.net/posts

# 利用方法
# アプリケーションを作成した背景
外出先で最寄りのきれいなトイレを探す困難なことがある。googlemapでは公共トイレは多いが、綺麗なトイレがすぐに見つからない。同様の問題を抱えている方も多いと推測し、問題を解決するため、ユーザー同士がきれいなトイレ情報を共有できるアプリケーションを開発することにした。
# 要件

# 実装した機能についての画像やGIFおよびその説明
![ルート検索](https://i.gyazo.com/0515388e1d4be67320f3889b7b19163d.jpg)
![個別施設情報](https://i.gyazo.com/6702edd493a19db141f52c579e9582eb.jpg)

# データベース設計
![ER図](https://i.gyazo.com/cb4db6391737ad0c1f7b11f5940a068c.png)

# 画面遷移図
![画面遷移図](https://i.gyazo.com/5df70c98f86793eed3264bb64e9c60fc.png)

# 開発環境
* フロントエンド:HTML CSS Javascript
* バックエンド:Rails 7.0.0
* インフラ:EC2 S3 SES
* API:Google Maps API Directions API

# ローカルでの動作方法
以下のコマンドを順に実行\
% git clone\
% cd\
% bundle install

# 工夫したポイント
google map APIを活用し、ユーザーに使いやすい機能を実現