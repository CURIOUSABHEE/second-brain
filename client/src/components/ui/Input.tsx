import React from "react";

function Input({ ref, placeholder }: { placeholder: string; ref: any }) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 m-2 border-slate-400 border rounded "
        ref={ref}
      />
    </div>
  );
}

export default Input;
    