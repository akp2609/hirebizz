import React, { useState, useEffect } from 'react'
import { Briefcase, Users, TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUp, Star } from 'lucide-react'

function Footer() {
    const [scrollY, setScrollY] = useState(0)
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
            setShowScrollTop(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const stats = [
        { icon: Users, value: '—', label: 'Job Seekers (Demo)' },
        { icon: Briefcase, value: '—', label: 'Active Jobs (Demo)' },
        { icon: TrendingUp, value: '—', label: 'Success Rate (Demo)' },
        { icon: Star, value: '—', label: 'Rating (Demo)' }
    ]


    const quickLinks = [
        'Find Jobs', 'Post Jobs', 'Company Profiles', 'Career Advice', 'Salary Guide', 'Resume Builder'
    ]

    const jobCategories = [
        'Technology', 'Healthcare', 'Finance', 'Marketing', 'Design', 'Sales'
    ]

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                />
                <div
                    className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-pulse delay-1000"
                    style={{ transform: `translateY(${scrollY * -0.05}px)` }}
                />
                <div
                    className="absolute bottom-20 left-1/3 w-20 h-20 bg-indigo-500 rounded-full blur-2xl animate-pulse delay-2000"
                    style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-3 mb-6 group">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            HireBizz
                        </h2>
                    </div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Connecting talent with opportunity. Your dream job is just one click away.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mr-3" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-2 transform inline-block group"
                                    >
                                        <span className="relative">
                                            {link}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 group-hover:w-full transition-all duration-300" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Job Categories */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full mr-3" />
                            Categories
                        </h3>
                        <ul className="space-y-3">
                            {jobCategories.map((category, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-2 transform inline-block group"
                                    >
                                        <span className="relative">
                                            {category}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <div className="w-2 h-6 bg-gradient-to-b from-green-400 to-blue-600 rounded-full mr-3" />
                            Contact Us
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                                <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                <span>hello@hirebizz.com</span>
                            </div>
                            <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                                <Phone className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                <span>+91 7042783965</span>
                            </div>
                            <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                                <MapPin className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                <span>New Delhi ,India</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <div className="w-2 h-6 bg-gradient-to-b from-yellow-400 to-red-600 rounded-full mr-3" />
                            Stay Updated
                        </h3>
                        <div className="space-y-4">
                            <p className="text-gray-400 text-sm">
                                Get the latest job opportunities delivered to your inbox.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                                />
                                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex space-x-6">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                                >
                                    <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </a>
                            ))}
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} HireBizz. All rights reserved.
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Built with ❤️ for connecting careers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
                >
                    <ArrowUp className="w-6 h-6 mx-auto group-hover:-translate-y-1 transition-transform" />
                </button>

            )}
        </footer>
    )
}

export default Footer