import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { analyticsRecordDownload } from '../../services/analyticsService';

const DownloadAPKPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-6 py-12">
            <div className="max-w-2xl text-center">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">📱 Download HireBizz</h1>
                <p className="text-lg text-gray-700 mb-6">
                    A modern job portal to connect applicants and employers efficiently. Built with ❤️ using MERN, Firebase, GCP, and React Native.
                </p>

                <a
                    href="https://storage.googleapis.com/hirebizz-chat.firebasestorage.app/hirebizz.apk"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all mb-8"
                    onClick={()=>async()=>{analyticsRecordDownload()}}
                    download
                >
                    ⬇️ Download APK (76 MB)
                </a>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium text-blue-600">
                    <a
                        href="https://github.com/akp2609/hirebizz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 hover:underline"
                    >
                        <FaGithub /> Main Project
                    </a>
                    <a
                        href="https://github.com/akp2609/hirebizz-mobile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 hover:underline"
                    >
                        <FaGithub /> Mobile App
                    </a>
                    <a
                        href="https://github.com/akp2609/resume-analyzer-microservice"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 hover:underline"
                    >
                        <FaGithub /> Resume Analyzer
                    </a>
                </div>

                <p className="mt-10 text-xs text-gray-500">
                    Proudly open-sourced by Aman Pandey • Version 1.0.0
                </p>
            </div>
        </div>
    );
};

export default DownloadAPKPage;
