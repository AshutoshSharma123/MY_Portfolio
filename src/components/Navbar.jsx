import dayjs from 'dayjs'

import React from 'react'
import { navIcons, navLinks } from '#constants/index.js'

const Navbar = () => {

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className='font-bold'>Ashutosh's Portfolio</p>
                <ul>
                    {navLinks.map(item => (
                        <li key={item.name}>
                            <a href={item.id}>{item.name}</a>
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