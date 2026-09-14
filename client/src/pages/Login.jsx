import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ShieldCheck } from "lucide-react";

import { checkOtp, requestOtp, signIn } from "../apis/users";
import { useAuth } from "@/context/authContext";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function Auth() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const { login } = useAuth();
  console.log(name, lastName);

  // -------------------------
  // Request OTP
  // -------------------------

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    if (phone.length !== 11) {
      alert("لطفاً شماره موبایل معتبر ۱۱ رقمی وارد کنید.");
      return;
    }

    try {
      await requestOtp({ phone });

      setStep(2);
    } catch (error) {
      console.error("Request OTP error:", error);

      alert("ارسال کد تایید با خطا مواجه شد.");
    }
  };

  // -------------------------
  // OTP Input
  // -------------------------

  const handleOtpChange = (value) => {
    setOtp(value);
  };
  const handleInfoSubmit = async (value) => {
    value.preventDefault();

    const response = await signIn({
      name,
      lastName,
      phone,
      otpCode: otp,
    });
    console.log(response);
    if (response.status === 201) {
      const { accessToken, user } = response.data;
      console.log(user, accessToken);
      login(user, accessToken);
      navigate(-1);
    }
  };
  // -------------------------
  // Verify OTP
  // -------------------------

  useEffect(() => {
    if (otp.length !== 4) return;

    const verifyOtp = async () => {
      try {
        const response = await checkOtp({
          phone,
          otpCode: otp,
        });
        if (response.data.isNewUser) {
          setStep(3);
        } else {
          if (response.status === 201) {
            const { accessToken, user } = response.data;
            login(user, accessToken);
            navigate(-1);
          }
        }
      } catch (error) {
        console.error("Verify OTP error:", error);

        setOtp("");

        return alert("کد تایید صحیح نیست.");
      }
    };

    verifyOtp();
  }, [otp, phone, login, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 dir-rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        {/* Header */}

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-brand-800">
            {step === 1
              ? "ورود یا ثبت‌نام"
              : step === 2
                ? "کد تایید را وارد کنید"
                : "اطلاعات خود را وارد کنید"}
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            {step === 1
              ? "برای دسترسی به امکانات سایت و ثبت نظر، شماره خود را وارد کنید"
              : step === 2
                ? `کد ۴ رقمی ارسال شده به شماره ${phone} را وارد کنید`
                : ""}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                شماره موبایل
              </label>

              <div className="relative">
                <input
                  type="tel"
                  maxLength="11"
                  placeholder="09123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-left text-lg font-mono tracking-wider transition-all"
                  required
                />

                <Phone className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              دریافت کد تایید
            </button>
          </form>
        )}

        {step === 2 && (
          <div dir="ltr" className="w-full">
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              onChange={handleOtpChange}
              value={otp}
            >
              <InputOTPGroup className="flex gap-3 justify-center">
                <InputOTPSlot
                  className="size-14 rounded-2xl border"
                  index={0}
                />

                <InputOTPSlot
                  className="size-14 rounded-2xl border"
                  index={1}
                />

                <InputOTPSlot
                  className="size-14 rounded-2xl border"
                  index={2}
                />

                <InputOTPSlot
                  className="size-14 rounded-2xl border"
                  index={3}
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleInfoSubmit} dir="rtl" className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                نام خود را وارد کنید
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="مثلا :علی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-right text-lg font-mono tracking-wider transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                نام خانوادگی خود را وارد کنید
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="مثلا :احمدی"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-right text-lg font-mono tracking-wider transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              ورود
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
