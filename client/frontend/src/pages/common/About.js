import React, { useState, useEffect } from "react";
import {
    Briefcase,
    Cloud,
    Smartphone,
    Shield,
    Brain,
    Github,
    Code,
    ExternalLink,
    Globe,
    Star,
    ChevronDown,
    Sparkles,
    Heart,
} from "lucide-react";

const About = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll("[id]").forEach((el) => observer.observe(el));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const features = [
        {
            icon: Brain,
            title: "AI-Powered Resume Analyzer",
            description:
                "Uses OpenAI embeddings to score resumes against job descriptions.",
            color: "from-blue-500 to-indigo-500",
            details: ["Resume scoring", "Job relevancy matching", "Cover letter insights"],
        },
        {
            icon: Cloud,
            title: "Cloud-Native Deployment",
            description: "Scalable backend services deployed on Google Cloud Run.",
            color: "from-cyan-500 to-blue-500",
            details: ["Microservice architecture", "Firebase chat + mailing", "99.9% uptime"],
        },
        {
            icon: Smartphone,
            title: "Cross-Platform Experience",
            description: "React web app and React Native mobile app for accessibility.",
            color: "from-indigo-500 to-cyan-500",
            details: ["Responsive web UI", "Mobile-ready", "Modern UX with TailwindCSS"],
        },
        {
            icon: Shield,
            title: "Enterprise-Grade Security",
            description:
                "JWT + OAuth authentication with Google, GitHub, and custom login.",
            color: "from-blue-600 to-indigo-600",
            details: ["Role-based access", "Secure APIs", "Data privacy"],
        },
    ];

    const repositories = [
        {
            name: "Main Platform",
            description: "Full-stack web app with backend APIs.",
            url: "https://github.com/akp2609/hirebizz",
            language: "React + Node.js",
            color: "from-blue-500 to-indigo-500",
        },
        {
            name: "Resume Analyzer",
            description: "AI-powered microservice for resume relevancy scoring.",
            url: "https://github.com/akp2609/resume-analyzer-microservice",
            language: "Python + OpenAI",
            color: "from-cyan-500 to-blue-500",
        },
        {
            name: "Mobile App",
            description: "Cross-platform React Native + Expo mobile app.",
            url: "https://github.com/akp2609/hirebizz-mobile",
            language: "React Native",
            color: "from-indigo-500 to-cyan-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
            {/* Background visuals */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
                    }}
                />
                <div
                    className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
                    style={{
                        transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.1}px)`,
                    }}
                />
            </div>

            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center">
                <div className="text-center px-6 max-w-5xl mx-auto">
                    <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                        HireBizz
                    </h1>
                    <p className="text-2xl text-gray-300 font-light mb-8">
                        Where Talent Meets Opportunity, Powered by AI
                    </p>
                    <ChevronDown className="w-8 h-8 text-white/60 mx-auto animate-bounce" />
                </div>
            </div>

            {/* Mission */}
            <div
                id="mission"
                className={`py-20 px-6 transition-all duration-1000 ${isVisible.mission
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <p className="text-lg text-gray-300">
                        <strong className="text-white">HireBizz</strong> is a full-stack,
                        AI-powered job platform designed for the next generation of hiring.
                        It bridges the gap between job seekers and recruiters through
                        scalable microservices, cloud-native deployment, and AI-driven
                        automation.
                    </p>
                    <p className="text-lg text-gray-300">
                        With features like an AI Resume Analyzer, Firebase-powered chat,
                        secure authentication, and mobile-first design, HireBizz provides a
                        professional-grade ecosystem that evolves continuously.
                    </p>
                </div>
            </div>

            {/* Features */}
            <div
                id="features"
                className={`py-20 px-6 transition-all duration-1000 ${isVisible.features
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                        Platform Features
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:scale-105 transition transform"
                        >
                            <div
                                className={`p-4 bg-gradient-to-r ${f.color} rounded-2xl`}
                            >
                                <f.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-left mt-4">
                                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                                <p className="text-gray-300 mb-2">{f.description}</p>
                                <ul className="text-sm text-gray-400 space-y-1">
                                    {f.details.map((d, idx) => (
                                        <li key={idx}>• {d}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Repositories */}
            <div id="repositories" className="py-20 px-6">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <Github className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                    <h2 className="text-3xl font-bold mb-4">Open Source & Transparent</h2>
                    <p className="text-gray-300">
                        Explore the codebase, contribute, or build your own solutions.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {repositories.map((repo, idx) => (
                        <div
                            key={idx}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:scale-105 transition"
                        >
                            <div
                                className={`p-3 bg-gradient-to-r ${repo.color} rounded-xl mb-4 inline-block`}
                            >
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{repo.name}</h3>
                            <p className="text-gray-300 mb-4">{repo.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">{repo.language}</span>
                                <a
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:underline flex items-center gap-1"
                                >
                                    View Code <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Creator */}
            <div id="creator" className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <Heart className="w-12 h-12 text-cyan-400 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl font-bold mb-6">
                        Built by Passion, for Production
                    </h2>
                    <p className="text-gray-300 mb-4">
                        Designed, developed, and deployed by{" "}
                        <span className="font-bold text-indigo-300">Aman Pandey</span>,
                        HireBizz is built with professional workflows, cloud-native
                        infrastructure, and continuous innovation in mind.
                    </p>
                    <div className="flex justify-center gap-6 mt-6 flex-wrap">
                        <a
                            href="https://github.com/akp2609"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:scale-105 transition"
                        >
                            <Github className="inline w-5 h-5 mr-2" />
                            Visit My GitHub
                        </a>
                        <a
                            href="https://hirebizz.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition"
                        >
                            <Globe className="inline w-5 h-5 mr-2" />
                            Live Platform
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
