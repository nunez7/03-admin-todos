import Link from 'next/link';
import React from 'react';

interface Props{
    title: string;
    icon:  React.ReactNode;
    path: string;
}

{/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
export const SidebarItem = ({title, path, icon}: Props) => {
    return (
        <li>
            <Link href={path} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                { icon }
                <span className="group-hover:text-gray-700">{title}</span>
            </Link>
        </li>
    )
}
