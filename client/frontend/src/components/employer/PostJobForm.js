import React, { useState } from 'react';
import { postJob } from '../../services/jobService';

const initialForm = {
    title: '',
    description: '',
    location: '',
    skills: '',
    compensation: '',
    isActive: true,
    companyName: '',
    companyLogo: '',
    companyWebsite: '',
};

const PostJobForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const payload = {
                ...formData,
                skills: formData.skills
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                compensation: Number(formData.compensation),
            };

            const res = await postJob(payload);
            if (res?.success) {
                setSuccess('✅ Job posted successfully!');
                setFormData(initialForm);
                onSuccess?.();
            } else {
                throw new Error(res.message || 'Failed to post job');
            }
        } catch (err) {
            console.error('Post job error:', err);
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium mb-1">Job Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Company Logo URL</label>
                    <input
                        type="text"
                        name="companyLogo"
                        value={formData.companyLogo}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Company Website</label>
                    <input
                        type="text"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Compensation (₹)</label>
                    <input
                        type="number"
                        name="compensation"
                        value={formData.compensation}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
            </div>

            <div>
                <label className="block font-medium mb-1">Skills (comma-separated)</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    placeholder="e.g., React, Node.js, MongoDB"
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label className="text-sm">Mark as active job</label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? 'Posting...' : 'Post Job'}
            </button>
        </form>
    );
};

export default PostJobForm;
