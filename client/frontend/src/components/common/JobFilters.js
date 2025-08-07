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
        <div className="bg-white p-6 rounded-xl shadow-lg grid md:grid-cols-3 gap-6 mb-6 border border-blue-100">
            <input
                name="location"
                placeholder="📍 Location"
                value={filters.location}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 placeholder:text-blue-400 text-blue-800 font-medium"
            />
            <input
                name="search"
                placeholder="🔍 Search jobs..."
                value={filters.search}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 placeholder:text-blue-400 text-blue-800 font-medium"
            />
            <input
                type="number"
                name="minComp"
                placeholder="💰 Min Compensation"
                value={filters.minComp}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 placeholder:text-blue-400 text-blue-800 font-medium"
            />
            <select
                name="isActive"
                value={filters.isActive}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-blue-800 font-medium"
            >
                <option value="">Status</option>
                <option value="true">Active</option>
                <option value="false">Closed</option>
            </select>
            <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className="px-4 py-2 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-blue-800 font-medium"
            >
                <option value="">Sort By</option>
                <option value="latest">Latest</option>
                <option value="compensation">Highest Pay</option>
            </select>

            <div className="col-span-full">
                <p className="text-base font-semibold text-blue-700 mb-2">Skills</p>
                <div className="flex flex-wrap gap-3">
                    {SKILLS.map((skill) => (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border shadow-sm ${filters.skills.includes(skill)
                                    ? 'bg-blue-100 text-blue-700 border-blue-500'
                                    : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                                }`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>

                <div className="col-span-full flex justify-end mt-4 gap-4">
                    <button
                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all duration-200"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>

    );
};

export default JobFilters;