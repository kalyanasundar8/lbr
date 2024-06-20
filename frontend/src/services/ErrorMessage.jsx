import { useEffect, useState } from "react";

export const ErrorMessage = ({ error }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)        
        }, 3000);

        return () => clearTimeout(timer);
    }, [])

    if(!visible) return null;
    
  return (
    <div className="flex items-center justify-center mt-3 font-primaryFont">
      <p className="text-center text-[15px] text-red-600 font-medium bg-red-200 w-[320px] px-[4px] py-[4px] rounded-sm">
        {error}
      </p>
    </div>
  );
};
