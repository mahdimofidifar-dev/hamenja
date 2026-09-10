import { useEffect, useState } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { OTP } from "../components/forms/Otp";
import { auth } from "../apis/users";

export default function Auth() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [opt, setOpt] = useState("");
  const [authUser, setAuthUser] = useState([]);
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 11) {
      setStep(2);
    } else {
      alert("لطفاً شماره موبایل معتبر ۱۱ رقمی وارد کنید.");
    }
  };

  const handelOpt = (code) => {
    setOpt(code);
  };
  useEffect(() => {
    if (opt.length === 4) {
      const sendData = async () => {
        const data = await auth({ phone, opt });
        setAuthUser(data);
      };
      sendData();
    }
  }, [opt, phone]);
  console.log(authUser);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 dir-rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-brand-800">
            {step === 1 ? "ورود یا ثبت‌نام" : "کد تایید را وارد کنید"}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {step === 1
              ? "برای دسترسی به امکانات سایت و ثبت نظر، شماره خود را وارد کنید"
              : `کد ۴ رقمی ارسال شده به شماره ${phone} را وارد کنید`}
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

        {step === 2 && <OTP onOtpComplete={handelOpt} />}
      </div>
    </div>
  );
}
