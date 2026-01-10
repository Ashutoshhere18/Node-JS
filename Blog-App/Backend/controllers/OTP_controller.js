import { otpModel } from '../models/Otp_Model.js'

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const data = await otpModel.findOne({ email, otp });

    if (!data) {
        return res.json({ message: "OTP Mismatched!" });
    }
    if (data.expiry < new Date(Date.now())) {
        return res.json({ message: "OTP expired!" });
    }
    res.cookie("Authentication", true, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })
    res.json({ message: "OTP verified and Sign In successfully!" });
}
