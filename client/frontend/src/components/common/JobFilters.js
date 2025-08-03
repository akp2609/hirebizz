import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

const options = ["Latest", "Most Relevant", "Highest Pay"];

export default function SortDropdown({ selected, onChange }) {
    return (
        <div className="w-full max-w-xs">
            <Listbox value={selected} onChange={onChange}>
                <div className="relative">
                    {/* Button */}
                    <Listbox.Button className="relative w-full cursor-pointer rounded-2xl border border-gray-300 bg-white py-3 pl-4 pr-12 text-left shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium text-gray-700 hover:shadow-lg">
                        <span className="block truncate">{selected || "Sort by"}</span>
                        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                        </span>
                    </Listbox.Button>


                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-white py-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
                            {options.map((option, idx) => (
                                <Listbox.Option
                                    key={idx}
                                    value={option}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-3 pl-10 pr-4 mx-1 rounded-xl ${active
                                            ? "bg-blue-100 text-blue-900"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                                                {option}
                                            </span>
                                            {selected && (
                                                <span className="absolute left-2 top-2.5 text-blue-600">
                                                    <CheckIcon className="h-5 w-5" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
