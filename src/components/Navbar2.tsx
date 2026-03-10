import { UsersIcon } from 'lucide-react';

export function Navbar2() {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* main row */}
                <div className="flex justify-between items-center h-16">
                    {/* LEFT: logo + title */}
                    <div className="flex items-center">
                        <div className="bg-teal-600 p-2 rounded-lg">
                            <UsersIcon className="h-6 w-6 text-white" />
                        </div>
                        <span className="ml-3 text-xl font-bold text-gray-900">
              TalentScout
            </span>
                    </div>

                    {/* RIGHT: avatar */}
                    <div className="flex items-center">
                        <div className="relative">
                            <img
                                className="h-8 w-8 rounded-full bg-gray-100"
                                src="https://i.pravatar.cc/150?img=68"
                                alt="User avatar"
                            />
                            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}