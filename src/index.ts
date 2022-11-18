import { NextFunction, Request, Response } from "express";
import { default as FormData } from "form-data";

// validate takes Turnstile secret key and returns a middleware function
const validate =
  (secret: string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.body && req.body.token;
    const ip = req.headers["cf-connecting-ip"] || req.socket.remoteAddress;

    if (!token) {
      return res.status(400).json({
        success: false,
        data: {
          message: "No token provided",
        },
      });
    }

    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);
    formData.append("remoteip", ip);

    // "https://challenges.cloudflare.com/turnstile/v0/siteverify"
    const response = fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData as any,
      }
    );

    response
      .then(async (response) => {
        const json = await response.json();
        if (!json.success) {
          return res.status(400).json({
            success: false,
            data: {
              message: "Invalid token",
            },
          });
        }

        next();
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          data: {
            message: String(error),
          },
        });
      });
  };

export const middleware = {
  validate,
};
