import React, { useState } from 'react'
import { HelpCircle, User, Building2, FileText, CreditCard, MessageSquare, ChevronRight, Menu, X, Search, Briefcase, Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

const nav = [
    { to: "account-issues-guide", label: "Account Issues", icon: User, description: "Login, password, and profile help" },
    { to: "candidate-support", label: "Candidate Support", icon: User, description: "Job search and application assistance" },
    { to: "employer-support", label: "Employer Support", icon: Building2, description: "Hiring and recruitment support" },
    { to: "how-to-report", label: "How to Report", icon: FileText, description: "Report issues or violations" },
    { to: "payment-support", label: "Payment Support", icon: CreditCard, description: "Billing and payment questions" },
    { to: "support", label: "General Support", icon: MessageSquare, description: "Other questions and assistance" },
];

const Help = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('account-issues-guide');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleNavClick = (section) => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                <Briefcase size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 sm:text-xl">HireBizz</h1>
                                <p className="text-xs text-gray-500 hidden sm:block">Help Center</p>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Jobs</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Companies</a>
                            <a href="#" className="text-blue-600 font-medium">Help</a>
                        </nav>

                        {/* Mobile menu toggle */}
                        <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-3 space-y-3">
                            {['Home', 'Jobs', 'Companies', 'Help'].map((item) => (
                                <a key={item} href="#" className={`block ${item === 'Help' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}>
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Hero */}
            <div className="text-center py-8 px-4">
                <div className="inline-flex w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl items-center justify-center mb-4">
                    <HelpCircle size={28} className="text-white" />
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">How can we help you?</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    Find answers to common questions, get support, and learn how to make the most of HireBizz.
                </p>
                <div className="max-w-lg mx-auto relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for help articles..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="lg:w-72 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 overflow-x-auto flex lg:block space-x-3 lg:space-x-0 lg:space-y-2">
                        {nav.map((item) => {
                            const Icon = item.icon;
                            const active = activeSection === item.to;
                            return (
                                <button
                                    key={item.to}
                                    onClick={() => handleNavClick(item.to)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${active ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon size={18} className={active ? 'text-blue-600' : 'text-gray-500'} />
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Panel */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                            {nav.find(item => item.to === activeSection)?.label || 'Welcome'}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {nav.find(item => item.to === activeSection)?.description || 'Select a topic to get started.'}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            {/* Quick Actions */}
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="font-semibold mb-3">Quick Actions</h3>
                                {['Reset your password', 'Update profile', 'Manage notifications', 'Delete account'].map(a => (
                                    <p key={a} className="text-sm text-gray-700 flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full" /> {a}</p>
                                ))}
                            </div>
                            <div className="bg-emerald-50 rounded-lg p-4">
                                <h3 className="font-semibold mb-3">Popular Articles</h3>
                                {['Getting started guide', 'How to apply', 'Creating the perfect resume', 'Interview tips'].map(a => (
                                    <p key={a} className="text-sm text-gray-700 flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> {a}</p>
                                ))}
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">FAQ</h3>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded">
                                    <h4 className="font-medium">How do I create an account?</h4>
                                    <p className="text-sm text-gray-600">Click “Sign Up” on the homepage and follow instructions.</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <h4 className="font-medium">How do I search for jobs?</h4>
                                    <p className="text-sm text-gray-600">Use filters by location, job title, or keywords.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-12">
                <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <h3 className="text-xl font-bold mb-3">HireBizz</h3>
                        <p className="text-gray-400 mb-4">Connecting professionals with opportunities.</p>
                        <div className="flex space-x-3">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700"><Icon size={16} /></a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#">Browse Jobs</a></li>
                            <li><a href="#">Companies</a></li>
                            <li><a href="#">Post a Job</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Support</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
                    © 2024 HireBizz • support@hirebizz.com • +1 (555) 123-4567
                </div>
            </footer>
        </div>
    );
};

export default Help;
