import dayjs from 'dayjs'

import React from 'react'
import { navIcons, navLinks } from '#constants/index.js'
import useWindowStore from '#store/window.js'


const Navbar = () => {
    const { openWindow } = useWindowStore()
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className='font-bold'>Ashutosh's Portfolio</p>
                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={() => openWindow(type)}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>

            </div>

            <div>

                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img src={img} alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>


                <time >{dayjs().format('MMMM D, h:mm A')}</time>

            </div>
        </nav>
    )
}

export default Navbar