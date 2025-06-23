import express from "express";
const csrfRouter = express.Router();
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true }); 

csrfRouter.get("/csrf-token",csrfProtection, (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.json({ csrfToken: req.csrfToken() });
});

export {csrfRouter}