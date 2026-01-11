import { Search } from 'lucide-react'
import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWraper.jsx';
import React from 'react'

const Finder = () => {
    return (
        <>
            <div id='window-header' className="">
                <WindowControls target='finder' />
                <Search className='icon' />

            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    <div className="">
                        <h3>Favorites</h3>
                        <ul>...</ul>
                    </div>
                </div>
            </div>

        </>


    )
}

const FinderWindow = WindowWrapper(Finder, "Finder")
export default FinderWindow