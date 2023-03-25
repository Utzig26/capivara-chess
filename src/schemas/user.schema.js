import * as Yup from "yup";

export const userInitial = {
  username: "",
  password: "",
};

export const userSchema = Yup.object().shape({
  username: Yup.string()
    .required("This field is required!")
    .max(32, "Username must be at maximun 32 characters long")
    .min(2, "Username must be at least 2 characters long")
    .matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username can only contain alphanumeric charcters, _ and ."),

  password: Yup.string()
    .required("This field is required!")
    .max(128, "Password must be at maximun 128 characters long")
    .min(8, "Password must be at least 8 characters long")
});
