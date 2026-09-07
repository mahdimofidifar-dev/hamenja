import PhoneDialog from "../forms/PhoneDialog";

const CallInfo = () => {
  return (
    <div className="call-info px-4">
      <div className="flex items-center justify-between">
        <span>شماره تماس</span>

        <PhoneDialog />
      </div>
    </div>
  );
};
export default CallInfo;
