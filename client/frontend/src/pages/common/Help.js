import React, { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const nav = [
    { to: "account-issues-guide", label: "Account Issues" },
    { to: "candidate-support", label: "Candidate Support" },
    { to: "employer-support", label: "Employer Support" },
    { to: "how-to-report", label: "How to Report" },
    { to: "payment-support", label: "Payment Support" },
    { to: "support", label: "General Support" },
];

function ScrollToTopOnRouteChange() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const el = document.getElementById(hash.replace("#", ""));
            if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
        }
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname, hash]);
    return null;
}

const Help = () => {
    return (
        <div className="flex min-h-screen">
            
            <aside className="hidden md:block w-1/5 border-r bg-gray-50">
                <div className="sticky top-0 h-screen overflow-y-auto p-4">
                    <h2 className="text-xl font-semibold mb-4">Help Center</h2>
                    <nav aria-label="Help topics">
                        <ul className="space-y-1">
                            {nav.map(item => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `block rounded-lg px-3 py-2 text-sm ${isActive
                                                ? "bg-white shadow-sm border font-medium"
                                                : "hover:bg-white"
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            
            <main className="w-4/5">
                <ScrollToTopOnRouteChange />
                <div className="mx-auto max-w-5xl p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Help
