# 第一週主線任務

### 前置作業
1. 請建立一個 database，並建立一個 `posts` collection
2. 將此 [JSON 資料](https://drive.google.com/file/d/1VCuWX2M6K-Du8pWlrcGImO_ux4Zwsa6v/view?usp=sharing)，透過 Compass 倒入到 `posts` collection

```
貼文集合欄位介紹
- name：貼文姓名
- image：貼文圖片
- content：貼文內容
- likes：按讚數
- comments：留言數
- createdAt：發文時間
- type：貼文種類[fan(粉絲)、group(社團)]
- tags：貼文標籤
```

## 題庫

### 課程範圍
1. 搜尋 name 欄位為 "Ray Xu" 的 document 列表

```js
db.posts.find({"name":"Ray Xu"})
```


2. 新增一筆 document，請全部欄位皆填寫

```js
db.posts.insertOne(
  {
  "name": "maverick",
  "tags": [
    "動作",
    "劇情"
  ],
  "type": "movie",
  "image": "https://www.vscinemas.com.tw/vsweb/upload/film/film_20220419003.jpg",
  "createdAt": "2022-05-25 18:02:43 UTC",
  "content": "身為海軍頂尖飛行員的",
  "likes": 1000,
  "comments": 666
   }
)
```

3. 新增多筆 document，請全部欄位皆填寫

```js
db.posts.insertMany(
  [
    {
      "name": "snoopy",
      "image": null,
      "content": "Hello snoopy",
      "likes": 59,
      "comments": 1,
      "createdAt": "2022-05-01 05:00:30 UTC",
      "type": "group",
      "tags": ["心情"]
    },
    {
      "name": "kitty",
      "image": null,
      "content": "Hello kitty",
      "likes": 100,
      "comments": 30,
      "createdAt": "2022-04-24 05:10:40 UTC",
      "type": "group",
      "tags": ["謎因"]
    },
  ]
)
```

4. 修改一筆 document，filter 條件請用 `_id` 指定其中一筆資料，`content` 欄位調整為`測試資料`

```js
db.posts.updateOne(
    {
        "_id": ObjectId("62791a0b69111e911deb4eaf")
    },
    {
        $set: {
            content:"測試資料"
        }
    }
)
```

5. 修改多筆 `name` 欄位為 `"Ray Xu"` 的 document 列表，`content` 欄位都調整為`哈哈你看看你`

```js
db.posts.updateMany(
    { name: 'Ray Xu' },
    { $set: 
        { content: '哈哈你看看你' }
    }
)
```

6. 刪除一筆 document，filter 條件請用 `_id` 任意指定其中一筆資料
   
```js
db.posts.deleteOne(
    {
        _id: ObjectId('62791a0b69111e911deb4eaf')
    }
)
```

7. 刪除多筆 document，filter 條件請用 `type` 為 `group` 的值，刪除所有社團貼文

```js
db.posts.deleteMany(
    { "type": "group" }
)
```

8. 刪除多筆 document，filter 條件為以下條件

a. `name`:`"Ray Xu"`\
b. `likes`: 500(含) 個讚以下

```js
db.posts.deleteMany(
    { 
        name: 'Ray Xu', 
        likes: { $lte: 500 } 
    }
)
```

9. 查詢全部 `posts` 的 document 列表

```js
db.rooms.find().pretty()
```

10.  關鍵字搜尋 `name` 裡面含有 `o` 的 document 列表

```js
db.posts.find(
    { name: /o/ }
).pretty()
```

11.  查詢`name` 欄位為 `"Ray Xu"` ，filter 篩選出介於 500 ~ 1000(含) 個讚

```js
db.posts.find(
    { 
        name: 'Ray Xu',  
        likes: { 
            $gte: 500, $lte: 1000 
        } 
    }
).pretty()
```

12.  查詢 `comments` 有超過 500(含)以上的 document 列表

```js
db.posts.find(
    { 
        comments: { 
            $gte: 500 
        } 
    }
).pretty()
```

13.  查詢 `tags`  欄位，有 `謎因` **或(or)** `幹話` 的 document 列表

```js
db.posts.find(
    { 
        tags: { 
            $in: ['幹話', '謎因'] 
        }
    }
).pretty()
```

14.  查詢 `tags`  欄位，有 `幹話` 的 document 列表，需隱藏 `_id` 欄位

```js
db.posts.find(
    { 
        tags: { 
            $in: ['幹話'] 
        }
    }, 
    {
        '_id': 0
    }
).pretty()
```

15.  請嘗試用 Mongo Shell 指令刪除全部 Documents

```js
db.posts.deleteMany({})
```

### 自主研究題

1. posts 所有 document 數量為？(回傳數字)

```js
db.posts.find().count()
```

2. 請查詢 `name` 為 `Ray Xu` 的 document 列表，排序為由新到舊

註：createdAt => 升序: 1，降序: -1

```js
db.posts.find(
    {
        "name": "Ray Xu"
    }
).sort( 
    { 
        "createdAt": -1 
    } 
).pretty()
```

1. 請查詢 `name` 為 `Ray Xu` 的 document 列表，顯示前 30 筆資料

```js
db.posts.find(
    {
        "name": "Ray Xu"
    }
).limit(30).pretty()
```

4. 請查詢 `name` 為 `Ray Xu` ，顯示100(含) 個讚以上的前 30 筆 document 列表，時間排序由新到舊

```js
db.posts.find(
    {
        "name": "Ray Xu",
        "likes": {
            $gte: 100
        }
    }
).limit(30).sort({"createdAt": -1}).pretty()
```

5. 請查詢 `comments` 超過 `100` 的 document 列表，跳過前 30 筆資料，再顯示 30 筆資料 

```js
db.posts.find(
    {"comments": {
            $gt: 100
        }
    }
).skip(30).limit(30).pretty()
```

6. 尋找超夯熱門貼文，請查詢 `likes` **且(and)** `comments` 都超過 `1,500(含)` 的 document 列表

```js
db.posts.find({
    $and:
        [
            {"likes": { $gte: 1500 }},
            {"comments": { $gte: 1500 }}
        ]
}).pretty()
```

7. 尋找普通熱門貼文，請查詢 `likes` **或(or)** `comments` 超過 `1,000(含)` 的 document 列表

```js
db.posts.find({
    $or:
        [
            {"likes": { $gte: 1000}},
            {"comments": { $gte: 1000}}
        ]
}).pretty()
```

8. 查詢 `image` 欄位為 `null` 的 document 列表

```js
db.posts.find(
    {
        "image": {
            $eq: null
        }
    }
).pretty()
```

9. 隨意找一筆 document 資料，將 `tags` 欄位裡的陣列，新增一個新 tags 為 `遊記`

```js
db.posts.updateOne(
    { "_id": ObjectId("6252ea069c8da3f354e88f34") },
    { $push: {
            "tags": { $each:["遊記"] }
        }
    }
)
```

10.  將所有 `tags` 陣列裡的 `感情` 都移除

```js
db.posts.updateMany(
    {}, 
    { 
        $pullAll: { 
            "tags": ["感情"]
        }
    }
)
```

