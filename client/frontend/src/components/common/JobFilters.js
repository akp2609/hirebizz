import React, { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const SKILLS = ['React', 'Node', 'MongoDB', 'TypeScript', 'AWS', 'Docker','Android','ML','Data','Kotlin','Management'];

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
        <div className="bg-white p-4 rounded shadow grid md:grid-cols-3 gap-4 mb-4">
            <input
                name="location"
                placeholder="Location"
                value={filters.location}
                onChange={handleChange}
                className="input input-bordered"
            />
            <input
                name="search"
                placeholder="Search jobs..."
                value={filters.search}
                onChange={handleChange}
                className="input input-bordered"
            />
            <input
                type="number"
                name="minComp"
                placeholder="Min Compensation"
                value={filters.minComp}
                onChange={handleChange}
                className="input input-bordered"
            />
            <select
                name="isActive"
                value={filters.isActive}
                onChange={handleChange}
                className="input input-bordered"
            >
                <option value="">Status</option>
                <option value="true">Active</option>
                <option value="false">Closed</option>
            </select>
            <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className="input input-bordered"
            >
                <option value="">Sort By</option>
                <option value="latest">Latest</option>
                <option value="compensation">Highest Pay</option>
            </select>

            <div className="col-span-full">
                <p className="text-sm font-medium mb-1">Skills</p>
                <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1 rounded-full text-sm border ${filters.skills.includes(skill)
                                    ? 'bg-blue-100 text-blue-700 border-blue-500'
                                    : 'bg-gray-100 text-gray-600 border-gray-300'
                                }`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            <div className="col-span-full flex justify-end mt-2 gap-3">
                <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default JobFilters;
