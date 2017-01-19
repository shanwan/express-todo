# Express Todo List Part 1

So far we've built a TODO list application that uses the command line as the user interface. Let's take this a step forward and use what we've learnt about express to create a web server interface. For this version we'll just be working with JSON data to build a RESTful API.

## Getting Started

* Fork and clone this repository
* Run `npm install` to install dependencies
* `npm test` - run test suite
* `npm start` - run the server


## Requirements

- Create an Express app
- This app will only respond to JSON; it is just an API, so don't worry about the views
- The resource `Todo` should be accessible via the endpoint `/todos` and be RESTful
- Implement `index`,`show`, `create`, `update`, and `destroy` functionality

Try to keep your express code organized as we taught. Main app code should be in `index.js` and your express routes in `controllers/todos.js`

Once you spin up your local server, look below at the cURL commands with the expected responses we want you to test on this app once you've finished building - the HTTP status should always be 2XX.

`Index` cURL Request

```bash
curl -XGET http://localhost:3000/todos

```

  - Example Response
  ```json
  [{"id":1234,"name":"Write Code","description":"Write a Super Project", "completed":"false"},
  {"id":13456,"name":"Chew Gum","description":"Must Chew some gum", "completed":"true"}]
  ```
---

`Show` cURL Request

```bash
curl -XGET http://localhost:3000/todos/1234

```

  - Expected Response
  ```json
  {"id":1234,"name":"Write Code","description":"Write a Super Project", "completed":"false"}
  ```
---

`Create` cURL Request

```bash
curl -XPOST -H "Content-Type: application/json" -d '{"name":"Buy Cake","description":"you can never have too much"}' http://localhost:3000/todos

```

  - Example Response
    ```json
    {"id":3564,"name":"Buy Cake","description":"you can never have too much", "completed":"false"}
    ```

---


- A second `Index`cURL Request

  ```bash
  curl -XGET http://localhost:3000/todos
  ```

  - Expected Response

  ```json

  [{"id":1234,"name":"Write Code","description":"Write a Super Project", "completed":"false"},
  {"id":13456,"name":"Chew Gum","description":"Must Chew some gum", "completed":"true"},
  {"id":3564,"name":"Buy Cake","description":"you can never have too much", "completed":"false"}]
  ```
  > Note: The new record is sent back !

---

`Update` cURL Request

```bash
curl -XPUT -H "Content-Type: application/json" -d '{"name":"Buy Cheese Cake"}' http://localhost:3000/todos/3564
```

---

Another `Index` Request

```bash
curl -XGET http://localhost:3000/todos
```

  - Expected Response

  ```json

  [{"id":1234,"name":"Write Code","description":"Write a Super Project", "completed":"false"},
  {"id":13456,"name":"Chew Gum","description":"Must Chew some gum", "completed":"true"},
  {"id":3564,"name":"Buy Cheese Cake","description":"you can never have too much", "completed":"false"}]
  ```
  The record corresponding to the ID passed in the first request has been updated

---

`Destroy` cURL Request

```bash
curl -XDELETE http://localhost:3000/todos/3564
```

  - Expected Response
    ```json
    {"message":"deleted"}
    ```

---

`Index` cURL request, again!

```bash
curl -XGET http://localhost:3000/todos
```

 - Expected Response

  ```json

  [{"id":1234,"name":"Write Code","description":"Write a Super Project", "completed":"false"},
  {"id":13456,"name":"Chew Gum","description":"Must Chew some gum", "completed":"true"}]
  ```

> Note: The record corresponding to the ID passed in the first request has been deleted.


## Additional Resources

- [Curl Manual](http://curl.haxx.se/docs/manual.html)
- [ExpressJS documentation](http://expressjs.com/4x/api.html)

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
