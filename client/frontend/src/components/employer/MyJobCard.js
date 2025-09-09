import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    MapPin,
    Calendar,
    Building2,
    Trash2,
    Lock,
    Zap,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';

const StatusBadge = ({ status, isActive }) => {
    if (!isActive) {
        return (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm font-semibold border border-gray-300">
                <Lock className="w-3 h-3 mr-1.5" />
                Closed
                <div className="w-2 h-2 rounded-full bg-gray-400 ml-2" />
            </div>
        );
    }

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'open':
                return {
                    icon: CheckCircle,
                    bgGradient: 'from-green-50 to-emerald-50',
                    textColor: 'text-green-700',
                    label: 'Active',
                    pulseColor: 'bg-green-400'
                };
            case 'closed':
                return {
                    icon: XCircle,
                    bgGradient: 'from-red-50 to-pink-50',
                    textColor: 'text-red-700',
                    label: 'Closed',
                    pulseColor: 'bg-red-400'
                };
            default:
                return {
                    icon: Clock,
                    bgGradient: 'from-blue-50 to-cyan-50',
                    textColor: 'text-blue-700',
                    label: 'Active',
                    pulseColor: 'bg-blue-400'
                };
        }
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r ${config.bgGradient} ${config.textColor} text-sm font-semibold border border-white/50 shadow-sm`}>
            <Icon className="w-3 h-3 mr-1.5" />
            {config.label}
            <div className={`w-2 h-2 rounded-full ${config.pulseColor} ml-2 animate-pulse`} />
        </div>
    );
};

const FloatingElements = () => {
    const elements = Array.from({ length: 6 }, (_, i) => (
        <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-30"
            style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`
            }}
        />
    ));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <style jsx>{`
                @keyframes floatElement {
                    0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
                    50% { transform: translateY(-8px) scale(1.2) rotate(180deg); }
                }
                .absolute.w-1.h-1 {
                    animation: floatElement infinite ease-in-out;
                }
            `}</style>
            {elements}
        </div>
    );
};

const MyJobCard = ({ job, onDelete, onClose }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!job) return null;

    const { title, location, description, company, createdAt, status, isActive } = job;
    const companyName = company?.name || 'Unknown Company';

    return (
        <div
            className={`group relative overflow-hidden transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${isHovered ? 'scale-[1.02] -rotate-1' : 'scale-100 rotate-0'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <FloatingElements />

            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className={`absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'}`} />

            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 group-hover:border-purple-200">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-start space-x-4 flex-1">
                        {/* Icon */}
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                                <Zap className="w-3 h-3 text-white" />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                                    {title}
                                </h3>
                                <StatusBadge status={status} isActive={isActive} />
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center space-x-1">
                                    <Building2 className="w-4 h-4 text-purple-500" />
                                    <span className="font-medium">{companyName}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    <span>{location}</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-3">
                                {description}
                            </p>

                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <span>Posted {new Date(createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {isActive ? (
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => onClose(job._id)}
                            disabled={status === 'closed'}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${status === 'closed'
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg'
                                }`}
                        >
                            <Lock className="w-4 h-4" />
                            <span className="text-sm">{status === 'closed' ? 'Closed' : 'Close Job'}</span>
                        </button>

                        <button
                            onClick={() => onDelete(job._id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Delete</span>
                        </button>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-xl border border-gray-300 text-center">
                        <p className="font-bold text-gray-700">Job Closed</p>
                        <button
                            onClick={() => onDelete(job._id)}
                            className="mt-2 flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Delete Job</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyJobCard;
