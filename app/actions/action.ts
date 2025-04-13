"use server";
import excuteQuery from "@/database/db";
import { log } from "console";
import { cookies } from "next/headers";
import monstres from "../accueil/monstres/page";
const pswHash = require("password-hash");
const jwt = require("jsonwebtoken");

export const postSignIn = async ({ formulaire }: { formulaire: any }) => {
  if (
    formulaire.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
      ? true
      : false
  ) {
    if (
      formulaire.password.match(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*£§_-]).{8,}$/
      )
        ? true
        : false
    ) {
      var pswHashed = pswHash.generate(formulaire.password);
      var date = new Date();
      var admin = 0;
      const result = await excuteQuery({
        query:
          "INSERT INTO users (us_nom,us_prenom,us_email,us_password,us_date_inscription, us_admin) VALUES (?,?,?,?,?,?)",
        values: [
          formulaire.nom,
          formulaire.prenom,
          formulaire.email,
          pswHashed,
          date,
          admin,
        ],
      });
      return { success: true };
    } else {
      return { error: "password" };
    }
  } else {
    return { error: "email" };
  }
};
export const postLogin = async ({ formulaire }: { formulaire: any }) => {
  const user = await excuteQuery({
    query: "SELECT * FROM users WHERE us_email = ?",
    values: [formulaire.email],
  });
  if (pswHash.verify(formulaire.password, user[0].us_password)) {
    console.log("bon mdp");
    var token = jwt.sign(
      {
        id: user[0].us_id,
        email: user[0].us_email,
        prenom: user[0].us_prenom,
        pp: user[0].us_pp,
        admin: user[0].us_admin,
      },
      process.env.JWT_KEY,
      { expiresIn: "8h" }
    );
    const cookieStore = await cookies();
    cookieStore.set("you", token, {
      httpOnly: true,
      path: "/",
      secure: false,
      maxAge: 8 * 60 * 60 * 1000,
    });
    return {
      success: true,
    };
  } else {
    console.log("erreur");
    return { error: "password" };
  }
};

export const getCookies = async () => {
  const userCookie = await cookies();
  const user = userCookie.get("you");
  if (user) {
    if (jwt.verify(user?.value, process.env.JWT_KEY)) {
      var decode = jwt.decode(user?.value);
      return decode;
    } else {
      userCookie.delete("you");
      return { error: true, msg: "token tampered or expiered" };
    }
  } else {
    return { nocookie: true, msg: "nocookie" };
  }
};

export const Logout = async () => {
  const userCookie = await cookies();
  userCookie.delete("you");
};

export const getUsers = async () => {
  const result = await excuteQuery({
    query: "SELECT * FROM users ",
    values: null,
  });
  var users = JSON.stringify(result);
  return users;
};
