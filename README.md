# cryptnote

## API for stroring and retrieving notes (Encrypted)

#### General Response
For routes that return a single item the response is the object requested with status 200 header
```json 
{
    id:"idwe23r",
    ....
}
```

For routes with more item returns, the result is paginated and has the structure below
```json 
{
    data: [{
        "id": "idwe23r"
        .... 
    }]
    pagination: {
        currentPage: number,
        numberOfPages: number,
        total: number
    }
}
```

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->
1. [Create Note](#1-create-note)
   1. [Create Note - successful](#i-example-request-create-note---successful)
   1. [Create Note- Bad Request](#ii-example-request-create-note--bad-request)
1. [Get All Notes](#2-get-all-notes)
   1. [Get All Notes](#i-example-request-get-all-notes)
1. [Get Encrypted Note](#3-get-encrypted-note)
   1. [Get Encrypted Note - successful](#i-example-request-get-encrypted-note---successful)
   1. [Get Encrypted Note - Bad Request](#ii-example-request-get-encrypted-note---bad-request)
1. [Get Dencrypted Note](#4-get-dencrypted-note)
   1. [Get Dencrypted Note- successful](#i-example-request-get-dencrypted-note--successful)
1. [update note](#5-update-note)
   1. [update note-successful](#i-example-request-update-note-successful)
   1. [update note - Bad Request](#ii-example-request-update-note---bad-request)
1. [Delete note](#6-delete-note)
   1. [Delete note - succesfull](#i-example-request-delete-note---succesfull)



## Endpoints


--------



### 1. Create Note



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/v1/notes
```



***Body:***

```js        
{
    "note": "final"
}
```



***More example Requests/Responses:***


#### I. Example Request: Create Note - successful



***Body:***

```js        
{
    "note": "new issue"
}
```



#### I. Example Response: Create Note - successful
```js
{
    "note": "c91a5fccbcc14330a1a0a9c300e6efe6:8b5842f4ed55be7445",
    "created_at": "2022-10-26T10:30:57.920Z",
    "updated_at": "2022-10-26T10:30:57.920Z",
    "id": "63590c61e98aea6b14d51087"
}
```


***Status Code:*** 201

<br>



#### II. Example Request: Create Note- Bad Request



***Body:***

```js        
{
    "note": ""
}
```



#### II. Example Response: Create Note- Bad Request
```js
{
    "statusCode": 400,
    "message": [
        "note must be longer than or equal to 5 characters",
        "note should not be empty"
    ],
    "error": "Bad Request"
}
```


***Status Code:*** 400

<br>



### 2. Get All Notes



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/v1/notes
```



***More example Requests/Responses:***


#### I. Example Request: Get All Notes



***Body: None***



#### I. Example Response: Get All Notes
```js
{
    "data": [
        {
            "note": "cheking;s correct note",
            "created_at": "2022-10-25T16:48:19.054Z",
            "updated_at": "2022-10-25T16:48:19.054Z",
            "id": "63581353bd3e31798ecea32c"
        },
        {
            "note": "cd3ab991413cd8ccf3ddbfd46e2f756a:82408c35e0527ffe60d51803ce1c6dff4e947b323a",
            "created_at": "2022-10-26T09:07:28.617Z",
            "updated_at": "2022-10-26T09:07:28.617Z",
            "id": "6358f8d0f3f02bca0ce4a155"
        },
        {
            "note": "27029b81db5f42e17d4bdc81b8c9d592:511c2b8c3f66d26983bf33ab28857b152472b6d1dc62237031efede6ac28bb6adc9a72c767",
            "created_at": "2022-10-26T09:09:26.967Z",
            "updated_at": "2022-10-26T09:09:26.967Z",
            "id": "6358f94618a08649bec96637"
        },
        {
            "note": "c91a5fccbcc14330a1a0a9c300e6efe6:8b5842f4ed55be7445",
            "created_at": "2022-10-26T10:30:57.920Z",
            "updated_at": "2022-10-26T10:30:57.920Z",
            "id": "63590c61e98aea6b14d51087"
        }
    ],
    "pagination": {
        "numOfPages": 1,
        "total": 4
    }
}
```


***Status Code:*** 200

<br>



### 3. Get Encrypted Note



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/v1/notes/:id/encrypted
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f8d0f3f02bca0ce4a155sdf |  |



***More example Requests/Responses:***


#### I. Example Request: Get Encrypted Note - successful



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f8d0f3f02bca0ce4a155 |  |



***Body: None***



#### I. Example Response: Get Encrypted Note - successful
```js
{
    "note": "cd3ab991413cd8ccf3ddbfd46e2f756a:82408c35e0527ffe60d51803ce1c6dff4e947b323a",
    "created_at": "2022-10-26T09:07:28.617Z",
    "updated_at": "2022-10-26T09:07:28.617Z",
    "id": "6358f8d0f3f02bca0ce4a155"
}
```


***Status Code:*** 200

<br>



#### II. Example Request: Get Encrypted Note - Bad Request



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f8d0f3f02bca0ce4a155sdf |  |



***Body: None***



#### II. Example Response: Get Encrypted Note - Bad Request
```js
{
    "statusCode": 400,
    "message": [
        "The id param is not valid"
    ],
    "error": "Bad Request"
}
```


***Status Code:*** 400

<br>



### 4. Get Dencrypted Note



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/v1/notes/:id/decrypted
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f94618a08649bec96637 |  |



***More example Requests/Responses:***


#### I. Example Request: Get Dencrypted Note- successful



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f94618a08649bec96637 |  |



***Body: None***



#### I. Example Response: Get Dencrypted Note- successful
```js
{
    "note": "cheking to see if there is any issues",
    "created_at": "2022-10-26T09:09:26.967Z",
    "updated_at": "2022-10-26T09:09:26.967Z",
    "id": "6358f94618a08649bec96637"
}
```


***Status Code:*** 200

<br>



### 5. update note



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{base_url}}/v1/notes/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f8d0f3f02bca0ce4a155 |  |



***Body:***

```js        
{
    "note": "checking the final",
    "encrypted": false
}
```



***More example Requests/Responses:***


#### I. Example Request: update note-successful



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f8d0f3f02bca0ce4a155 |  |



***Body:***

```js        
{
    "note": "checking the final",
    "encrypted": false
}
```



#### I. Example Response: update note-successful
```js
{
    "note": "173fe7bf25f8ad7d213d4bb5c876403c:ac4241aa997479e0588bcf07fa257bbd0a96",
    "created_at": "2022-10-26T09:07:28.617Z",
    "updated_at": "2022-10-26T10:39:48.193Z",
    "id": "6358f8d0f3f02bca0ce4a155"
}
```


***Status Code:*** 200

<br>



#### II. Example Request: update note - Bad Request



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f8d0f3f02bca0ce4a1559 |  |



***Body:***

```js        
{
    "note": "checking the final",
    "encrypted": "try"
}
```



#### II. Example Response: update note - Bad Request
```js
{
    "statusCode": 400,
    "message": [
        "encrypted must be a boolean value"
    ],
    "error": "Bad Request"
}
```


***Status Code:*** 400

<br>



### 6. Delete note



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{base_url}}/v1/notes/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f8d0f3f02bca0ce4a155 |  |



***More example Requests/Responses:***


#### I. Example Request: Delete note - succesfull



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| id | 6358f8d0f3f02bca0ce4a155 |  |



***Body: None***



#### I. Example Response: Delete note - succesfull
```js
{
    "message": "deleted successfully"
}
```


***Status Code:*** 200

<br>



---
[Back to top](#cryptnote)