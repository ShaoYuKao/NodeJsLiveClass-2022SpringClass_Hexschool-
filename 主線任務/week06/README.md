第六週：JWT 身份驗證機制
===

## 主線任務

請依照此[設計稿](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/)，設計API

### LV1：設計五個 API

- `POST：{url}/users/sign_up`：[註冊](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/1fc65740-4d7f-4df7-ac4d-8cf0d573f4e2)
- `POST：{url}/users/sign_in`：[登入](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/)
- `POST：{url}/users/updatePassword`: [重設密碼](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/3a7ed05f-8c2a-42c8-9b60-b73fcddb8822)
- `GET：{url}/users/profile`: [取得個人資料](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/112f9990-41f0-4c0d-8704-67279a52a49c)，需設計 `isAuth` middleware。
- `PATCH：{url}/users/profile`: [更新個人資料](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/112f9990-41f0-4c0d-8704-67279a52a49c)，需設計 `isAuth` middleware

### LV2：調整第四週 API，都加上登入驗證的 middleware

- `POST：{url}/posts/`：[張貼個人動態](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/dfc7891e-63fd-4141-989a-8776ee7ea9f0)
- `GET：{url}/posts/`：[觀看所有動態](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/5b6bb2a0-f0f3-4b39-841f-8cf3a0ed9707)

## 繳交內容

1. 您的 Discord 名稱
1. 作業網址：請提供 Github 連結，GitHub 需附上 POSTMAN Collections Heroku 版本檔案