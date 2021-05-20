import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";

import User from "../models/userModel";

const userController = {
  signIn: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        return res.status(404).json({ message: "User doesn't exist." });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect)
        return res.status(404).json({ message: "Invalid credentials." });

        const token = jwt.sign(
          { id: existingUser._id, email: existingUser.email },
          "test",
          {
            expiresIn: "1h",
          }
        );

      res.status(200).json({ result: existingUser, token });
    } catch (error: any) {
      res.status(500).json({ message: "something went wrong." });
    }
  },
  signUp: async (req: Request, res: Response) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exist." });

      if (password !== confirmPassword)
        return res.status(400).json({ message: "Passwords don't match." });

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });

      const token = jwt.sign({ email: result.email, id: result._id }, "test", {
        expiresIn: "1h",
      });

      res.status(200).json({ result, token });
    } catch (error: any) {
      res.status(500).json({ message: "something went wrong." });
    }
  },
};

module.exports = userController;
