import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, refreshResumeURL } from "../services/userService";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getUserProfile();


                let updatedUser = data.user;


                if (data.user?.objectName) {
                    try {
                        const resumeData = await refreshResumeURL();
                        updatedUser = {
                            ...data.user,
                            resumeURL: resumeData.url,
                        };
                    } catch (err) {
                        console.warn("Resume URL refresh failed:", err.message);
                    }
                }

                setUser(data.user);
            }
            catch (err) {
                console.error("Failed to load user: ", err);
            } finally {
                setLoadingUser(false);
            }
        }

        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loadingUser }}>
            {children}
        </UserContext.Provider>
    )
};


export const useUser = () => useContext(UserContext);