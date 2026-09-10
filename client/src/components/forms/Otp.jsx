import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useAuth } from "@/context/isLogin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function OTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { login } = useAuth();
  const handler = (val) => {
    setOtp(val);

    if (val.length === 4) {
      login();
      navigate("/");
    }
  };
  return (
    <div dir="ltr" className="w-full">
      <InputOTP
        className=""
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS}
        onChange={handler}
        value={otp}
      >
        <InputOTPGroup className=" flex  gap-3 justify-center">
          <InputOTPSlot className="size-14 rounded-2xl border" index={0} />
          <InputOTPSlot className="size-14 rounded-2xl border" index={1} />
          <InputOTPSlot className="size-14 rounded-2xl border" index={2} />
          <InputOTPSlot className="size-14 rounded-2xl border" index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
