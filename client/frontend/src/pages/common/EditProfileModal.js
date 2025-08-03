import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
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

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePicChange = (e) => {
        setProfilePicFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
           
            if (profilePicFile) {
                const picData = new FormData();
                picData.append('profilePic', profilePicFile);
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
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                            <Dialog.Title className="text-lg font-semibold text-gray-900">
                                Edit Profile
                            </Dialog.Title>

                            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        rows="3"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePicChange}
                                        className="mt-1 block w-full"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 rounded-md border text-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 rounded-md bg-blue-600 text-white"
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
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
