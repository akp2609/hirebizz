import React, { useEffect, useState } from "react";
import { isAndroidBrowser } from "../../utils/deviceUtils";
import { Download, X, Smartphone, Star, Zap } from "lucide-react";
import { analyticsRecordDownload } from "../../services/analyticsService";

const APK_LINK = "https://storage.googleapis.com/hirebizz-mobile/hirebizz.apk";

const AndroidDownloadBanner = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("androidBannerDismissed");
    if (!dismissed && isAndroidBrowser()) {
      setShouldShow(true);
      // Delay entrance for smooth animation
      setTimeout(() => setIsVisible(true), 50);
    }
  }, []);

  const handleDownload = async () => {
    try {
      await analyticsRecordDownload();
    } catch (err) {
      console.error("Analytics error:", err.message);
    }
    window.open(APK_LINK, "_blank");
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Wait for exit animation before hiding
    setTimeout(() => {
      setShouldShow(false);
      localStorage.setItem("androidBannerDismissed", "true");
    }, 300);
  };

  if (!shouldShow) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 shadow-lg">
        {/* Content */}
        <div className="relative px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Side */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Icon */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Smartphone className="w-6 h-6 text-white animate-bounce" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-2 h-2 text-white" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">
                  HireBizz Mobile App
                </h3>
                <div className="hidden sm:flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                  <Zap className="w-3 h-3 text-yellow-300" />
                  <span className="text-xs text-white font-medium">NEW</span>
                </div>
              </div>
              <p className="text-white/90 text-sm sm:text-base">
                🚀 Get the <span className="font-semibold">premium mobile experience</span> with exclusive features
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 ml-4 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="group relative bg-white text-blue-600 font-bold px-6 py-2.5 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                <span className="hidden sm:inline text-sm">Download Now</span>
                <span className="sm:hidden text-sm">Get</span>
              </div>
            </button>

            <button
              onClick={handleDismiss}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-transform hover:scale-110 active:scale-90"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-50"></div>
      </div>
    </div>
  );
};

export default AndroidDownloadBanner;
