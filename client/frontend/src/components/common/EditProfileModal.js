import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { User, MapPin, FileText, Camera, Save, X, Loader2 } from 'lucide-react';
import { updateUserProfile, uploadUserProfilePic } from '../../services/userService';
import { toast } from 'react-toastify';

const EditProfileModal = ({ isOpen, closeModal, user, onProfileUpdated }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        location: user?.location || ''
    });

    const [profilePicFile, setProfilePicFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || null);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePicChange = (e) => {
        const file = e.target.files[0];
        setProfilePicFile(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (profilePicFile) {
                const picData = new FormData();
                picData.append('image', profilePicFile);
                await uploadUserProfilePic(picData);
            }

            await updateUserProfile(formData);
            toast.success('Profile updated successfully');
            onProfileUpdated();
            closeModal();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300">
                            {/* Header */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 px-8 py-6">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <Dialog.Title className="text-2xl font-bold text-gray-900 mb-1">
                                            Edit Profile
                                        </Dialog.Title>
                                        <p className="text-gray-600">Update your personal information</p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Profile Picture Section */}
                            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50">
                                <div className="flex flex-col items-center">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg">
                                            <div className="w-full h-full rounded-full overflow-hidden bg-white">
                                                {previewUrl ? (
                                                    <img
                                                        src={previewUrl}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                        <User className="w-8 h-8 text-gray-500" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg group-hover:scale-110">
                                            <Camera className="w-4 h-4 text-white" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePicChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Click the camera icon to change</p>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                            <User className="w-3 h-3 text-white" />
                                        </div>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Bio */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded flex items-center justify-center">
                                            <FileText className="w-3 h-3 text-white" />
                                        </div>
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        rows="3"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 outline-none resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded flex items-center justify-center">
                                            <MapPin className="w-3 h-3 text-white" />
                                        </div>
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 outline-none"
                                        placeholder="Enter your location"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    Save Changes
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditProfileModal;
