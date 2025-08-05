import React, { useEffect, useState } from "react";
import { isAndroidBrowser } from "../../utils/deviceUtils";
import { Download } from "lucide-react";

const APK_LINK = "https://storage.googleapis.com/hirebizz-mobile/hirebizz.apk";

const AndroidDownloadBanner = () => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem("androidBannerDismissed");
        if (!dismissed && isAndroidBrowser()) {
            setShouldShow(true);
        }
    }, []);

    const handleDownload = () => {
        window.open(APK_LINK, "_blank");
    };

    const handleDismiss = () => {
        setShouldShow(false);
        localStorage.setItem("androidBannerDismissed", "true");
    };

    if (!shouldShow) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white flex items-center justify-between px-4 py-2 shadow-md animate-slide-down">
            <div className="text-sm sm:text-base">
                📱 Download our Android App for the best experience
            </div>
            <div className="flex items-center gap-3 ml-4">
                <button
                    onClick={handleDownload}
                    className="bg-white text-blue-600 font-medium px-3 py-1 rounded-lg text-sm hover:bg-blue-100"
                >
                    <Download size={16} className="inline mr-1" /> Download
                </button>
                <button
                    onClick={handleDismiss}
                    className="text-white text-xs underline hover:text-gray-200"
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
};

export default AndroidDownloadBanner;
