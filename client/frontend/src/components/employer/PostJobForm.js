import React, { useState } from 'react';
import {
    Briefcase, Building2, Globe, MapPin, DollarSign, Code,
    FileText, CheckCircle, AlertCircle, X, Star, Zap
} from 'lucide-react';
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
    const [focusedField, setFocusedField] = useState('');
    const [step, setStep] = useState(1);
    const [skillTags, setSkillTags] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        if (error) setError('');
    };

    const handleSkillsChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, skills: value });
        const tags = value.split(',').map(s => s.trim()).filter(Boolean);
        setSkillTags(tags);
    };

    const removeSkillTag = (tagToRemove) => {
        const updatedTags = skillTags.filter(tag => tag !== tagToRemove);
        setSkillTags(updatedTags);
        setFormData({ ...formData, skills: updatedTags.join(', ') });
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

            const res = await postJob(payload); // ✅ real API call
            if (res?.success) {
                setSuccess('✅ Job posted successfully!');
                setFormData(initialForm);
                setSkillTags([]);
                onSuccess?.(); // ✅ same as your working code

                // Reset form after success
                setTimeout(() => {
                    setSuccess('');
                    setStep(1);
                }, 3000);
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

    const nextStep = () => setStep(Math.min(step + 1, 3));
    const prevStep = () => setStep(Math.max(step - 1, 1));

    const isStepComplete = (stepNum) => {
        switch (stepNum) {
            case 1:
                return formData.title && formData.description;
            case 2:
                return formData.companyName && formData.location && formData.compensation;
            case 3:
                return formData.skills;
            default:
                return false;
        }
    };

    const getCompletedSteps = () => {
        let completed = 0;
        if (isStepComplete(1)) completed++;
        if (isStepComplete(2)) completed++;
        if (isStepComplete(3)) completed++;
        return completed;
    };

    // --- Success Screen ---
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
                    <div className="relative mb-8">
                        <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2">
                            <Star className="w-8 h-8 text-yellow-400" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Job Posted Successfully! 🎉</h3>
                    <p className="text-gray-600 mb-8">Your job listing is now live and visible to candidates</p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                setSuccess('');
                                setStep(1);
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                        >
                            Post Another Job
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4">
            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center justify-center space-x-4 mt-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold ${i <= step
                                    ? 'bg-blue-600 text-white'
                                    : isStepComplete(i)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                }`}>
                                {isStepComplete(i) && i < step ? <CheckCircle className="w-6 h-6" /> : i}
                            </div>
                            {i < 3 && <div className={`w-16 h-1 mx-2 rounded-full ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>
                <div className="text-center mt-4">
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>{getCompletedSteps()}/3 steps completed</span>
                    </div>
                </div>
            </div>

            {/* Main Form */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Step 1: Job Details */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block font-semibold mb-2">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 rounded-lg px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Job Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    required
                                    className="w-full border-2 rounded-lg px-4 py-2"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Company Info */}
                    {step === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-semibold mb-2">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 rounded-lg px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Company Website</label>
                                <input
                                    type="text"
                                    name="companyWebsite"
                                    value={formData.companyWebsite}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 rounded-lg px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Company Logo URL</label>
                                <input
                                    type="text"
                                    name="companyLogo"
                                    value={formData.companyLogo}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 rounded-lg px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 rounded-lg px-4 py-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-semibold mb-2">Compensation (₹)</label>
                                <input
                                    type="number"
                                    name="compensation"
                                    value={formData.compensation}
                                    onChange={handleChange}
                                    required
                                    className="w-full border-2 rounded-lg px-4 py-2"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Skills */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block font-semibold mb-2">Skills (comma-separated)</label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleSkillsChange}
                                    required
                                    className="w-full border-2 rounded-lg px-4 py-2"
                                />
                            </div>
                            {skillTags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {skillTags.map((skill, i) => (
                                        <div key={i} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                            <span>{skill}</span>
                                            <button type="button" onClick={() => removeSkillTag(skill)} className="ml-2 text-red-500">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                />
                                <label>Mark as active job</label>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="flex items-center space-x-2 bg-red-100 text-red-700 p-3 rounded-lg">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between">
                        {step > 1 && (
                            <button type="button" onClick={prevStep} className="px-4 py-2 border rounded-lg">
                                Back
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isStepComplete(step)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJobForm;
