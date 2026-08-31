import { useApp } from "../context/AppContext";
import { CheckCircle, XCircle } from "lucide-react";

function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white ${
        toast.type === "error" ? "bg-red-600" : "bg-green-600"
      }`}
    >
      {toast.type === "error" ? <XCircle size={18} /> : <CheckCircle size={18} />}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}

export default Toast;
