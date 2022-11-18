# express-turnstile

Validate your CloudFlare Turnstile token using a Express middleware.

## Usage

```
yarn add express-turnstile
```

Middleware is executed by calling `turnstile.validate(siteSecret)`.

```js
const express = require("express");
const { turnstile } = require("express-turnstile");

const app = express();

app.post(
  "/verify",
  turnstile.validate(process.env.TURNSTILE_SECRET),
  (req, res) => {
    res.json({ message: "verified!" });
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

Or as module

```js
import express from "express";
import { turnstile } from "express-turnstile";

const app = express();

app.post(
  "/verify",
  turnstile.validate(process.env.TURNSTILE_SECRET),
  (req, res) => {
    res.json({ message: "verified!" });
  }
);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```
