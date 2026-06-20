/** "or" divider between Google and the email form. */
export default function Divider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-[#ECEBF3]" />
      <span className="text-xs font-medium text-[#9A99A8]">or</span>
      <span className="h-px flex-1 bg-[#ECEBF3]" />
    </div>
  );
}
