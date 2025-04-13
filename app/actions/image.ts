"use server";
import axios from "axios";
import FormData from "form-data";
import fs from "node:fs";

export const createImage = async () => {
  // const payload = {
  //   prompt: "Lighthouse on a cliff overlooking the ocean",
  //   output_format: "jpeg"
  // };
  // const response = await axios.postForm(
  //   `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
  //   axios.toFormData(payload, new FormData()),
  //   {
  //     validateStatus: undefined,
  //     responseType: "arraybuffer",
  //     headers: {
  //       Authorization: `Bearer sk-MYAPIKEY`,
  //       Accept: "image/*",
  //       "Content-Type": "multipart/form-data"
  //     },
  //   },
  // );
  // if (response.status === 200) {
  //   fs.writeFileSync("./lighthouse.jpeg", Buffer.from(response.data));
  // } else {
  //   throw new Error(`${response.status}: ${response.data.toString()}`);
  // }
};
