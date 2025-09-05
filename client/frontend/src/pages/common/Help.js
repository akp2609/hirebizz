import React, { useEffect, useState } from 'react'
import { HelpCircle, User, Building2, FileText, CreditCard, MessageSquare, ChevronRight, Menu, X } from 'lucide-react';

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

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleNavClick = (section) => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleMobileMenu}
                    className="p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 hover:bg-white/90 transition-all duration-200"
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={toggleMobileMenu} />
            )}

            <div className="flex min-h-screen relative">
                
                <aside className={`
                    fixed md:static inset-y-0 left-0 z-40 w-80 md:w-1/3 lg:w-1/4 xl:w-1/5
                    transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                    transition-transform duration-300 ease-out
                `}>
                    <div className="h-full bg-white/60 backdrop-blur-xl border-r border-white/20 shadow-2xl">
                        <div className="sticky top-0 h-screen overflow-y-auto">
                            {/* Header */}
                            <div className="p-6 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                        <HelpCircle size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                            Help Center
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-0.5">Find answers and get support</p>
                                    </div>
                                </div>
                            </div>

                            
                            <nav aria-label="Help topics" className="p-4">
                                <ul className="space-y-2">
                                    {nav.map((item, index) => {
                                        const Icon = item.icon;
                                        const isActive = activeSection === item.to;
                                        return (
                                            <li key={item.to}>
                                                <button
                                                    onClick={() => handleNavClick(item.to)}
                                                    className={`w-full group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 transform hover:scale-[1.02] ${
                                                        isActive
                                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25"
                                                            : "bg-white/40 hover:bg-white/60 border border-white/20 hover:border-white/30 hover:shadow-lg text-gray-700"
                                                    }`}
                                                    style={{
                                                        animationDelay: `${index * 100}ms`,
                                                    }}
                                                >
                                                   
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                                    
                                                    <div className="relative flex items-start gap-3 text-left">
                                                        <div className={`p-2 rounded-xl transition-colors duration-300 ${
                                                            isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200"
                                                        }`}>
                                                            <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                                                        </div>
                                                        
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="font-semibold text-sm leading-tight mb-1">
                                                                    {item.label}
                                                                </h3>
                                                                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                                                            </div>
                                                            <p className="text-xs opacity-75 leading-relaxed">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            
                            <div className="p-4 mt-auto border-t border-white/10">
                                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-4 border border-emerald-200/50">
                                    <h4 className="font-semibold text-sm text-gray-800 mb-2">Need more help?</h4>
                                    <p className="text-xs text-gray-600 mb-3">Can't find what you're looking for? Contact our support team.</p>
                                    <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs font-medium py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                
                <main className="flex-1 md:ml-0 relative">
                    
                    <div className="relative">
                        
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
                        </div>

                        
                        <div className="relative z-10 min-h-screen p-6 md:p-8 lg:p-12">
                            <div className="max-w-4xl mx-auto">
                                
                                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                                    <div className="p-8 md:p-12">
                                        <div className="text-center mb-8">
                                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                                                {nav.find(item => item.to === activeSection)?.label || 'Welcome to Help Center'}
                                            </h1>
                                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                                {nav.find(item => item.to === activeSection)?.description || 'Select a topic from the sidebar to get started.'}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 mt-12">
                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                                <h3 className="font-semibold text-lg text-gray-800 mb-3">Quick Actions</h3>
                                                <ul className="space-y-2 text-gray-600">
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        Reset your password
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        Update profile information
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        Manage notifications
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                                                <h3 className="font-semibold text-lg text-gray-800 mb-3">Popular Articles</h3>
                                                <ul className="space-y-2 text-gray-600">
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                        Getting started guide
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                        Troubleshooting tips
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                        Best practices
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Help