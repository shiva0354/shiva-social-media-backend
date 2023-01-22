import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import * as apiresponse from "../library/apiresponse.js";
import User from "../models/user.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) return apiresponse.notfound(res, "User not found.");

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) return apiresponse.failed(res, "Wrong password");

    const token = jwt.sign({ id: user._id }, config.jwt_secret, { expiresIn: '2h' });

    return apiresponse.success(res, { token: token });
  } catch (error) {
    return apiresponse.exception(res, error);
  }
};

export const sendLoginOtp = async (req, res) => {
  const { mobile } = req.body

  const user = await User.findOne({ mobile: mobile })

  console.log(user);

  if (!user) return apiresponse.notfound(res, "User not found.");

  const otp = generateOTP()

  // const message_url = ``;
  // const response = await axios.get(message_url)

  // if (response.data.status != 6001) {
  //   return apiresponse.exception(res, error)
  // }

  user.otp = otp
  await user.save()

  return apiresponse.success(res, null, 'OTP sent on your mobile. ' + otp)
}

export const validateLoginOtp = async (req, res) => {
  const { mobile, otp } = req.body

  try {
    const user = await User.findOne({ mobile: mobile })

    if (!user) return apiresponse.notfound(res, "User not found.");

    if (user.otp != otp) return apiresponse.failed(res, 'Invalid OTP.')

    user.otp = null
    await user.save()

    const token = jwt.sign({ id: user._id }, config.jwt_secret, { expiresIn: '2h' });

    return apiresponse.success(res, { token: token });
  } catch (error) {
    return apiresponse.exception(res, error)
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, mobile, password, picturePath, location, occupation } =
      req.body;

    let user = await User.findOne({ email: email });
    console.log(user);
    if (user) return apiresponse.failed(res, "Email is already in use.");
    user = await User.findOne({ mobile: mobile });
    if (user) return apiresponse.failed(res, "Mobile is already in use.");

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user = await User.create({
      name: name,
      email: email,
      mobile: mobile,
      password: hashPassword,
      picturePath: req.file.filename,
      location: location,
      occupation: occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    //TODO send welcome email
    return apiresponse.success(res, user);
  } catch (error) {
    return apiresponse.exception(res, error);
  }
};

const generateOTP = () => {

  // Declare a digits variable 
  // which stores all digits
  let digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
