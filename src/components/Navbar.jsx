import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className='font-bold'>Ashutosh's Portfolio</p>
                <ul>

                    {
                        [
                            { id: 1, title: 'Portfolio', link: '#Portfolio' },
                            { id: 2, title: 'Contact', link: '#Contact' },
                            { id: 3, title: 'Projects', link: '#Projects' },


                        ].map((item) => (<a href={item.link}><li key={item.id}>{item.title}</li></a>))
                    }

                </ul>
            </div>
        </nav>
    )
}

export default Navbar