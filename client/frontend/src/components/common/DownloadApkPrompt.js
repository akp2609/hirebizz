
import React, { useEffect, useState } from "react";
import { isAndroidBrowser } from "../../utils/deviceUtils";
import { useNavigate } from "react-router-dom";


const APK_LINK = "https://storage.googleapis.com/hirebizz-mobile/hirebizz.apk";
const DownloadApkPrompt = () => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem("apkPromptDismissed");
        if (!dismissed && isAndroidBrowser()) {
            setShouldShow(true);
        }
    }, []);

    const navigate = useNavigate();

    const handleDownload = () => {

        const link = document.createElement("a");
        link.href = APK_LINK;
        link.setAttribute("download", "hirebizz.apk");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);


        navigate("/download");


        setShouldShow(false);
        localStorage.setItem("apkPromptDismissed", "true");
    };


    const handleDismiss = () => {
        setShouldShow(false);
        localStorage.setItem("apkPromptDismissed", "true");
    };

    if (!shouldShow) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 bg-white shadow-lg border border-gray-200 rounded-2xl p-4 flex items-center justify-between animate-fade-in">
            <div className="text-sm text-gray-800">
                📱 Enhance your experience! Download our official mobile app.
            </div>
            <div className="flex gap-3 ml-4">
                <button
                    onClick={handleDownload}
                    className="bg-blue-600 text-white px-3 py-1 text-sm rounded-xl hover:bg-blue-700 transition"
                >
                    Download
                </button>
                <button
                    onClick={handleDismiss}
                    className="text-gray-500 text-xs underline hover:text-gray-700"
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
};

export default DownloadApkPrompt;
