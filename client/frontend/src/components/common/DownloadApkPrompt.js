import React, { useEffect, useState } from "react";
import { isAndroidBrowser } from "../../utils/deviceUtils";
import { useNavigate } from "react-router-dom";
import { analyticsRecordDownload } from "../../services/analyticsService";
import { Smartphone, Download, X, Zap } from "lucide-react";

const APK_LINK = "https://storage.googleapis.com/hirebizz-mobile/hirebizz.apk";

const DownloadApkPrompt = () => {
    const [shouldShow, setShouldShow] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const dismissed = localStorage.getItem("apkPromptDismissed");
        if (!dismissed && isAndroidBrowser()) {
            setShouldShow(true);
            setTimeout(() => setIsVisible(true), 50); // smooth slide-in
        }
    }, []);

    const handleDownload = async () => {
        try {
            const link = document.createElement("a");
            link.href = APK_LINK;
            link.setAttribute("download", "hirebizz.apk");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            await analyticsRecordDownload();
            navigate("/download");
        } catch (err) {
            console.error("Download error:", err.message);
        }
        setIsVisible(false);
        setTimeout(() => {
            setShouldShow(false);
            localStorage.setItem("apkPromptDismissed", "true");
        }, 300);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShouldShow(false);
            localStorage.setItem("apkPromptDismissed", "true");
        }, 300);
    };

    if (!shouldShow) return null;

    return (
        <div
            className={`fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 transform transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
        >
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md">
                <div className="flex items-center gap-3 p-4">
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <Smartphone className="w-6 h-6 text-white animate-bounce" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                            <Zap className="w-2 h-2 text-white" />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 text-white">
                        <h3 className="font-bold text-base sm:text-lg leading-tight">
                            HireBizz Mobile App
                        </h3>
                        <p className="text-white/90 text-sm">
                            📱 Download now for a <span className="font-semibold">premium job-seeking experience</span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={handleDownload}
                            className="group relative bg-white text-blue-600 font-bold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-105 active:scale-95"
                        >
                            <div className="flex items-center gap-2">
                                <Download className="w-4 h-4 group-hover:animate-bounce" />
                                <span className="hidden sm:inline text-sm">Download</span>
                                <span className="sm:hidden text-sm">Get</span>
                            </div>
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-transform hover:scale-110 active:scale-90"
                            title="Dismiss"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Bottom gradient bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-50"></div>
            </div>
        </div>
    );
};

export default DownloadApkPrompt;
