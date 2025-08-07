import React from "react";

const About = () => {
    return (
        <div className="bg-white text-gray-800 px-6 py-12 max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-700">About HireBizz</h1>
                <p className="text-lg text-gray-600">Where Talent Meets Opportunity, Powered by AI.</p>
            </div>

            <section className="space-y-6 text-lg leading-relaxed">
                <p>
                    <strong>HireBizz</strong> is a full-stack, AI-powered job platform designed for the next generation of
                    hiring. Whether you're a job seeker looking for the perfect opportunity or a recruiter hunting
                    for top-tier talent, HireBizz streamlines the entire process using modern cloud infrastructure,
                    microservices, and intelligent automation.
                </p>

                <p>
                    The platform goes beyond traditional job portals by integrating a smart <strong>Resume Analyzer Microservice</strong> that scores resumes based on job description matching, leveraging OpenAI embeddings. Employers can instantly assess applicant fit, while job seekers get actionable insights to enhance their resumes and cover letters.
                </p>

                <p>
                    Built with scalability, security, and performance in mind, HireBizz leverages:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                    <li>⚙️ A robust microservice architecture with Firebase chat support and mailing</li>
                    <li>☁️ Google Cloud Run deployment for backend scalability</li>
                    <li>📈 Resume-AI engine powered by OpenAI embeddings</li>
                    <li>📱 Responsive web UI built in React + TailwindCSS, and a full-featured React Native mobile app</li>
                    <li>🔐 JWT + OAuth authentication system (Google, GitHub, custom auth)</li>
                    <li>📬 Resume relevancy match, job recommendations, custom domain with email integration</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 text-indigo-600">🔗 Explore the Source Code</h2>
                <p>
                    HireBizz is proudly open-source. Dive into the code, contribute, or build your own ideas on top of it.
                </p>

                <div className="space-y-4 mt-4">
                    <div>
                        <strong>Main Website + Backend:</strong>{" "}
                        <a
                            href="https://github.com/akp2609/hirebizz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://github.com/akp2609/hirebizz
                        </a>
                    </div>

                    <div>
                        <strong>Resume Analyzer Microservice:</strong>{" "}
                        <a
                            href="https://github.com/akp2609/resume-analyzer-microservice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://github.com/akp2609/resume-analyzer-microservice
                        </a>
                    </div>

                    <div>
                        <strong>Mobile App (React Native + Expo):</strong>{" "}
                        <a
                            href="https://github.com/akp2609/hirebizz-mobile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://github.com/akp2609/hirebizz-mobile
                        </a>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mt-10 text-indigo-600">🚀 Built by Passion, for Production</h2>
                <p>
                    HireBizz is more than a project. It’s an evolving ecosystem built with a professional mindset,
                    designed to handle production-grade workflows while being flexible enough for future features
                    like admin dashboards, analytics, employer AI tools, and advanced recommendation engines.
                </p>

                <p>
                    Designed, developed, and deployed by <strong className="text-indigo-700">Aman Pandey</strong>,
                    with a vision to create real-world impact through scalable, intelligent software.
                </p>

                <div className="text-center mt-12">
                    <a
                        href="https://github.com/akp2609"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition"
                    >
                        ⭐ Visit My GitHub
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;
