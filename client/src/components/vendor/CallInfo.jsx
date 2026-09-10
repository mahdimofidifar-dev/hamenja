import PhoneDialog from "../forms/PhoneDialog";

const CallInfo = ({ mobile, phone }) => {
  return (
    <div className="call-info px-4">
      <div className="flex items-center justify-between">
        <span>شماره تماس</span>
        <PhoneDialog mobile={mobile} phone={phone} />
      </div>
    </div>
  );
};
export default CallInfo;
