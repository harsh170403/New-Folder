import React, { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { IoCloseSharp } from "react-icons/io5";

const SidebarSection = ({ title, children }) => (
    <div className='mt-4 '>
        <p className='font-bold text-lg mb-3 px-10'>{title}</p>
        <ul className="space-y-2">
            {children}
        </ul>
        <hr className="my-6 border-t border-gray-400" />
    </div>
);

const SidebarListItem = ({ href, children }) => (
    <li>
        <a href={href} className='block hover:bg-gray-200 w-full p-2 px-10'>{children}</a>
    </li>
);

function User_sidebar() {
    const [status, setStatus] = useState(false);

    const isLoggedIn = true; 
    const userName = "Admin"; 

    return (
        <div>
          <div className="flex  gap-1 bg-gray-700 text-white h-10">
          <div
    className="flex items-center ml-5 group hover:border hover:border-white hover:rounded p-2 cursor-pointer"
    onClick={() => setStatus(true)}
>
    <AiOutlineBars
        className="group-hover:text-white"
        size="25px"
    />
    <a
        href="/all"
        className="ml-2 group-hover:text-white"
        onClick={(e) => e.preventDefault()} // Prevent navigation
    >
        All
    </a>
</div>

    <div className="w-full">
        <ul className="flex gap-1  items-center w-full h-full ">
            {[
                { href: "/fresh", label: "Fresh" },
                { href: "/keep-shopping-for", label: "Keep Shopping For" },
                { href: "/flights", label: "Flights" },
                { href: "/lists", label: "Lists" },
                { href: "/new-releases", label: "New Releases" },
                { href: "/mx-player", label: "MX Player" },
                { href: "/sell", label: "Sell" },
                { href: "/gift-cards", label: "Gift Cards" },
                { href: "/buy-again", label: "Buy Again" },
                { href: "/browsing-history", label: "Browsing History" },
                { href: "/amazon-pay", label: "Amazon Pay" },
            ].map((item, index) => (
                <li key={index}>
                    <a
                        href={item.href}
                        className="hover:border hover:border-white hover:rounded p-2"
                    >
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    </div>
</div>

    



            {status ? (
                <div className='bg-black/70 absolute w-full h-screen flex top-0'>
                    <IoCloseSharp 
                        className='absolute top-4 left-96 -ml-5 text-white cursor-pointer z-20' 
                        size={'40px'} 
                        onClick={() => setStatus(false)} 
                    />

                    <div className='z-10 bg-white w-[360px] h-screen overflow-y-auto'>
                        <div className='bg-gray-700 h-14'>
                            {isLoggedIn ? (
                                <div>
                                    <p className="font-bold text-lg text-white justify-center top-10 ml-14 pt-2">Welcome, {userName}</p>
                                    <hr className="my-4" />
                                </div>
                            ) : (
                                <a href="/login" className="font-bold text-lg">Login</a>
                            )}
                        </div>

                        <SidebarSection title="Trending">
                            <SidebarListItem href='/best-sellers'>Best Sellers</SidebarListItem>
                            <SidebarListItem href='/new-releases'>New Releases</SidebarListItem>
                            <SidebarListItem href='/movers-shakers'>Movers and Shakers</SidebarListItem>
                        </SidebarSection>

                        <SidebarSection title="Digital Content and Devices">
                            <SidebarListItem href='/echo-alexa'>Echo & Alexa</SidebarListItem>
                            <SidebarListItem href='/fire-tv'>Fire TV</SidebarListItem>
                            <SidebarListItem href='/kindle'>Kindle E-Readers & eBooks</SidebarListItem>
                            <SidebarListItem href='/audible'>Audible Audiobooks</SidebarListItem>
                            <SidebarListItem href='/prime-video'>Amazon Prime Video</SidebarListItem>
                            <SidebarListItem href='/prime-music'>Amazon Prime Music</SidebarListItem>
                        </SidebarSection>

                        <SidebarSection title="Shop by Category">
                            <SidebarListItem href='/mobiles-computers'>Mobiles, Computers</SidebarListItem>
                            <SidebarListItem href='/tv-appliances'>TV, Appliances, Electronics</SidebarListItem>
                            <SidebarListItem href='/mens-fashion'>Men's Fashion</SidebarListItem>
                            <SidebarListItem href='/womens-fashion'>Women's Fashion</SidebarListItem>
                            <SidebarListItem href='/categories'>See all</SidebarListItem>
                        </SidebarSection>

                        <SidebarSection title="Programs & Features">
                            <SidebarListItem href='/amazon-pay'>Amazon Pay</SidebarListItem>
                            <SidebarListItem href='/gift-cards'>Gift Cards & Mobile Recharges</SidebarListItem>
                            <SidebarListItem href='/amazon-launchpad'>Amazon Launchpad</SidebarListItem>
                            <SidebarListItem href='/amazon-business'>Amazon Business</SidebarListItem>
                            <SidebarListItem href='/programs'>See all</SidebarListItem>
                        </SidebarSection>

                        <SidebarSection title="Help & Settings">
                            <SidebarListItem href='/your-account'>Your Account</SidebarListItem>
                            <SidebarListItem href='/customer-service'>Customer Service</SidebarListItem>
                            <SidebarListItem href='/sign-out'>Sign Out</SidebarListItem>
                        </SidebarSection>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default User_sidebar;
