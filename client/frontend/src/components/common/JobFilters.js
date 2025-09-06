import React, { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const SKILLS = ['React', 'Node', 'MongoDB', 'TypeScript', 'AWS', 'Docker', 'Android', 'ML', 'Data', 'Kotlin', 'Management'];

const JobFilters = ({ filters, onChange }) => {

    const debouncedSearch = useMemo(
        () => debounce((value) => {
            onChange({ ...filters, search: value });
        }, 400),
        [filters, onChange]
    );

    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, [debouncedSearch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'search') {
            debouncedSearch(value);
        } else {
            onChange({ ...filters, [name]: value });
        }
    };

    const toggleSkill = (skill) => {
        const exists = filters.skills.includes(skill);
        const updatedSkills = exists
            ? filters.skills.filter(s => s !== skill)
            : [...filters.skills, skill];
        onChange({ ...filters, skills: updatedSkills });
    };

    const handleReset = () => {
        onChange({
            location: '',
            skills: [],
            isActive: 'true',
            minComp: '',
            sortBy: '',
            search: '',
            page: 1
        });
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-indigo-400/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            <div className="relative p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Find Your Perfect Job
                    </h2>
                    <p className="text-gray-600 text-sm">Filter through thousands of opportunities</p>
                </div>

                {/* Main Search Bar */}
                <div className="mb-8">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 group-hover:text-blue-600 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            name="search"
                            placeholder="Search for dream jobs, companies, or roles..."
                            value={filters.search}
                            onChange={handleChange}
                            className="w-full pl-12 pr-6 py-4 bg-white/70 backdrop-blur-sm border-2 border-blue-200/50 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/30 focus:border-blue-400 transition-all duration-300 placeholder:text-gray-500 text-gray-800 font-medium text-lg hover:shadow-xl hover:border-blue-300"
                        />
                    </div>
                </div>

                {/* Filter Grid */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
                    {/* Location */}
                    <div className="relative group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            📍 Location
                        </label>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            <input
                                name="location"
                                placeholder="City, State, or Remote"
                                value={filters.location}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-3 focus:ring-blue-400/40 focus:border-blue-400 transition-all duration-300 placeholder:text-gray-400 text-gray-800 font-medium hover:shadow-lg hover:border-gray-300"
                            />
                        </div>
                    </div>

                    {/* Min Compensation */}
                    <div className="relative group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-green-600 transition-colors duration-200">
                            💰 Min Compensation
                        </label>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            <input
                                type="number"
                                name="minComp"
                                placeholder="e.g., 75000"
                                value={filters.minComp}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-3 focus:ring-green-400/40 focus:border-green-400 transition-all duration-300 placeholder:text-gray-400 text-gray-800 font-medium hover:shadow-lg hover:border-gray-300"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="relative group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                            📊 Job Status
                        </label>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            <select
                                name="isActive"
                                value={filters.isActive}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-3 focus:ring-indigo-400/40 focus:border-indigo-400 transition-all duration-300 text-gray-800 font-medium hover:shadow-lg hover:border-gray-300 cursor-pointer"
                            >
                                <option value="">All Jobs</option>
                                <option value="true">🟢 Active Jobs</option>
                                <option value="false">🔴 Closed Jobs</option>
                            </select>
                        </div>
                    </div>

                    {/* Sort By */}
                    <div className="relative group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                            🔄 Sort By
                        </label>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            <select
                                name="sortBy"
                                value={filters.sortBy}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-3 focus:ring-purple-400/40 focus:border-purple-400 transition-all duration-300 text-gray-800 font-medium hover:shadow-lg hover:border-gray-300 cursor-pointer"
                            >
                                <option value="">Default Order</option>
                                <option value="latest">⏰ Latest First</option>
                                <option value="compensation">💎 Highest Pay</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">🚀 Skills & Technologies</h3>
                            <p className="text-sm text-gray-600">Select skills that match your expertise</p>
                        </div>
                        {filters.skills.length > 0 && (
                            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full">
                                <span className="text-sm font-semibold text-blue-700">
                                    {filters.skills.length} selected
                                </span>
                            </div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {SKILLS.map((skill) => (
                            <button
                                key={skill}
                                type="button"
                                onClick={() => toggleSkill(skill)}
                                className={`group relative overflow-hidden px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                                    filters.skills.includes(skill)
                                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-300/50'
                                        : 'bg-white/90 text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/80'
                                }`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 ${
                                    filters.skills.includes(skill) 
                                        ? 'from-blue-400 to-indigo-500 opacity-100' 
                                        : 'from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-10'
                                }`}></div>
                                <span className="relative z-10">{skill}</span>
                                {filters.skills.includes(skill) && (
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center pt-6 border-t border-gray-200/50">
                    <button
                        className="group relative px-8 py-3 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                        onClick={handleReset}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Reset All Filters</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobFilters;