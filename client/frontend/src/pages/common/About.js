import React, { useState, useEffect } from "react";
import { 
    Briefcase, Zap, Cloud, Brain, Smartphone, Shield, Mail, Code, 
    Github, Star, Globe, Users, TrendingUp, Sparkles, Rocket, Heart,
    ArrowRight, Eye, Database, Cpu, ChevronDown, ExternalLink
} from "lucide-react";

const About = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const [activeFeature, setActiveFeature] = useState(0);
    const [statsAnimated, setStatsAnimated] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                        if (entry.target.id === 'stats-section') setStatsAnimated(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[id]').forEach(el => observer.observe(el));
        return () => {
            window.removeEventListener('scroll', handleScroll);
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

    const stats = [
        { label: "Lines of Code", value: "30K+", icon: Code },
        { label: "Microservices", value: "1", icon: Database },
        { label: "AI Models", value: "2", icon: Cpu },
        { label: "Platforms", value: "2", icon: Globe }
    ];

    const repositories = [
        {
            name: "Main Platform",
            description: "Full-stack web application with backend APIs",
            url: "https://github.com/akp2609/hirebizz",
            stars: "⭐ 42",
            language: "React + Node.js",
            color: "from-blue-500 to-indigo-500"
        },
        {
            name: "Resume Analyzer",
            description: "AI-powered microservice for resume analysis",
            url: "https://github.com/akp2609/resume-analyzer-microservice",
            stars: "⭐ 28",
            language: "Python + OpenAI",
            color: "from-cyan-500 to-blue-500"
        },
        {
            name: "Mobile App",
            description: "React Native + Expo cross-platform mobile app",
            url: "https://github.com/akp2609/hirebizz-mobile",
            stars: "⭐ 35",
            language: "React Native",
            color: "from-indigo-500 to-cyan-500"
        }
    ];

    const AnimatedCounter = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);
        useEffect(() => {
            if (!statsAnimated) return;
            let startTime = null;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const current = Math.floor(progress * parseInt(end.replace(/\D/g, '')));
                setCount(current);
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, [statsAnimated, end, duration]);
        return <span>{end.includes('K') ? `${count}K+` : count}</span>;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div 
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                    style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
                />
                <div 
                    className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
                    style={{ transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.1}px)` }}
                />
            </div>

            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center">
                <div className="text-center px-6 max-w-6xl mx-auto">
                    <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                        HireBizz
                    </h1>
                    <div className="flex items-center justify-center space-x-3 mb-8">
                        <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
                        <p className="text-2xl text-gray-300 font-light">
                            Where Talent Meets Opportunity, Powered by AI
                        </p>
                        <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce delay-500" />
                    </div>
                    <ChevronDown className="w-8 h-8 text-white/60 mx-auto animate-bounce" />
                </div>
            </div>

            {/* Future of Hiring / Stats */}
            <div id="mission" className={`py-20 px-6 transition-all duration-1000 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
                        <div className="text-center mb-12">
                            <Rocket className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
                            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                The Future of Hiring
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
                                <p>
                                    <strong className="text-white">HireBizz</strong> is a revolutionary AI-powered job platform that transforms how talent connects with opportunity.
                                </p>
                                <p>
                                    Our platform leverages cutting-edge AI technology, including OpenAI embeddings, to provide intelligent resume analysis and job matching, making hiring decisions smarter and faster.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl"></div>
                                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="text-center">
                                            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-white">-</div>
                                            <div className="text-gray-400 text-sm">Job Seekers</div>
                                        </div>
                                        <div className="text-center">
                                            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-white">95%</div>
                                            <div className="text-gray-400 text-sm">Match Rate</div>
                                        </div>
                                        <div className="text-center">
                                            <Briefcase className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-white">-</div>
                                            <div className="text-gray-400 text-sm">Active Jobs</div>
                                        </div>
                                        <div className="text-center">
                                            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-white">24/7</div>
                                            <div className="text-gray-400 text-sm">AI Support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className={`py-20 px-6 transition-all duration-1000 delay-300 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Cutting-Edge Features
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Built with modern technologies and powered by artificial intelligence
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 cursor-pointer transform hover:scale-105 ${activeFeature === index ? 'ring-2 ring-blue-400' : ''}`}
                                onClick={() => setActiveFeature(index)}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="flex items-start space-x-6">
                                    <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl group-hover:rotate-12 transition-transform duration-500`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                                        <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                                        <ul className="space-y-2">
                                            {feature.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-center text-gray-400 text-sm">
                                                    <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tech Stack Stats */}
            <div id="stats-section" className={`py-20 px-6 transition-all duration-1000 delay-500 ${isVisible['stats-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            Built with Precision
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group-hover:scale-110">
                                    <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full inline-block mb-4 group-hover:rotate-12 transition-transform duration-500">
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-2">
                                        <AnimatedCounter end={stat.value} />
                                    </div>
                                    <div className="text-gray-400 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Repositories */}
            <div id="repositories" className={`py-20 px-6 transition-all duration-1000 delay-700 ${isVisible.repositories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Github className="w-16 h-16 text-white mx-auto mb-6" />
                        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                            Open Source & Transparent
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Explore the codebase, contribute, or build your own solutions
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {repositories.map((repo, index) => (
                            <div
                                key={index}
                                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 bg-gradient-to-r ${repo.color} rounded-xl group-hover:rotate-12 transition-transform duration-500`}>
                                        <Code className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-yellow-400 font-medium">{repo.stars}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                    {repo.name}
                                </h3>
                                <p className="text-gray-300 mb-4 leading-relaxed">{repo.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">{repo.language}</span>
                                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-2 duration-300">
                                        <span>View Code</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Creator */}
            <div id="creator" className={`py-20 px-6 transition-all duration-1000 delay-900 ${isVisible.creator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                        <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto mb-8 flex items-center justify-center">
                            <Heart className="w-12 h-12 text-white animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                            Built by Passion, for Production
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            HireBizz represents more than just a project—it's an evolving ecosystem designed with production-grade workflows in mind, yet flexible enough for continuous innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="https://github.com/akp2609" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-2xl">
                                <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                <span>Visit My GitHub</span>
                                <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                            </a>
                            <a href="https://hirebizz.xyz" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center space-x-3 px-8 py-4 bg-white/10 border-2 border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-110">
                                <Globe className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                <span>Live Platform</span>
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
    );
};

export default About;
