import Image from 'next/image';
import React from 'react';
import { getServerSession } from "next-auth";
import { CiBookmarkCheck, CiLogout } from 'react-icons/ci';
import { SidebarItem } from './SidebarItem';
import { IoBasketballOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline } from 'react-icons/io5';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const sidebarItems = [
    {
        icon: <IoCalendarOutline />,
        title: 'Dashboard',
        path: '/dashboard'
      },
      {
        icon: <IoCheckboxOutline />,
        title: 'Rest TODOS',
        path: '/dashboard/rest-todos'
      },
      {
        icon: <IoListOutline />,
        title: 'Server Actions',
        path: '/dashboard/server-todos'
      },
      {
        icon: <IoCodeWorkingOutline />,
        title: 'Cookies',
        path: '/dashboard/cookies'
      },
      {
        icon: <IoBasketballOutline />,
        title: 'Productos',
        path: '/dashboard/products'
      },
];

export const Sidebar = async() => {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect('/api/auth/signin');
  }

  const userName = session.user?.name;
  const userImage = (session.user?.image ) 
  ? session.user?.image
  : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';
  const userRole = (session.user?.name ) ? session.user?.name : 'Admin';

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="#" title="home">
              <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" 
              className="w-32" alt="tailus logo" width={150} height={150}/>
            </a>
          </div>

          <div className="mt-8 text-center">
            <Image src={userImage}
             alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
             width={150} height={150}/>
              <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
              <span className="hidden text-gray-400 lg:block">{userRole}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {/* TODO: src/components <SidebarItem /> */}
            {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
            {
                sidebarItems.map(item =>(
                <SidebarItem key={item.path} {...item} />
                ))
            }

          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
  )
}
