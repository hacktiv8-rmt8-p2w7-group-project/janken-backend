**Login**
----
  User login to website.

* **URL**

  https://janken-server-p2w7d5.herokuapp.com/

* **Method:**

  `POST`
  
*  **HEADERS**

   NO

*  **AUTHORIZE**

   NO

*  **URL Params**

   NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFzZCIsImlhdCI6MTYxMzY3NzMzOH0.aQ0Fj6keMRQy0E7o-fYdeGxPIIF00dInBWbPkaD6GIs",
      "id": 1,
      "name": "asd"
    }
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Message:** Internal Server Error 




---
**Show All Rooms**
----
  Returns data rooms all user.

* **URL**

  https://janken-server-p2w7d5.herokuapp.com/rooms

* **Method:**

  `GET`
  
*  **HEADERS**

    **Required:**
    
    access_token

*  **AUTHORIZE**

   NO

*  **URL Params**

   NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        "id": 1,
        "name": "room_1",
        "maxPlayer": 2,
        "UserId": 1,
        "createdAt": "2021-02-18T17:02:48.763Z",
        "updatedAt": "2021-02-18T17:02:48.763Z",
        "User": {
          "id": 1,
          "name": "asd",
          "score": 0,
          "createdAt": "2021-02-18T17:02:28.779Z",
          "updatedAt": "2021-02-18T17:02:28.779Z"
        }
      },
      {
        "id": 3,
        "name": "room_3",
        "maxPlayer": 2,
        "UserId": 1,
        "createdAt": "2021-02-18T19:17:40.237Z",
        "updatedAt": "2021-02-18T19:17:40.237Z",
        "User": {
          "id": 1,
          "name": "asd",
          "score": 0,
          "createdAt": "2021-02-18T17:02:28.779Z",
          "updatedAt": "2021-02-18T17:02:28.779Z"
        }
      }
    ]
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Message:** Internal Server Error 



---
**Create New Room**
----
  Create new room and return data to client.

* **URL**

  https://janken-server-p2w7d5.herokuapp.com/rooms

* **Method:**

  `POST`

*  **HEADERS**

    **Required:**
    
    access_token

*  **AUTHORIZE**

   NO
  
*  **URL Params**

   NONE

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "id": 3,
      "name": "room_3",
      "maxPlayer": 2,
      "UserId": 1,
      "updatedAt": "2021-02-18T19:17:40.237Z",
      "createdAt": "2021-02-18T19:17:40.237Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Message:** Internal Server Error 


---
**Join Room**
----
  Join room by id.

* **URL**

  https://janken-server-p2w7d5.herokuapp.com/rooms/:id

* **Method:**

  `GET`

*  **HEADERS**

    **Required:**
    
    access_token

*  **AUTHORIZE**

   NO
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "UserId": 1,
      "RoomId": 1,
      "updatedAt": "2021-02-18T17:03:35.682Z",
      "createdAt": "2021-02-18T17:03:35.682Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />




---
**Delete Room**
----
  Delete room by id.

* **URL**

  https://janken-server-p2w7d5.herokuapp.com/rooms/:id

* **Method:**

  `DELETE`

*  **HEADERS**

    **Required:**
    
    access_token

*  **AUTHORIZE**

   YES
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "msg": "Delete Success"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />