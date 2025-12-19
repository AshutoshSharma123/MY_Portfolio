import { WindwoControls } from '#components'
import WindowWrapper from '#hoc/WindowWraper.jsx';
import React from 'react'

const Safari = () => {
    return (
        <div id='window-header' >
            <WindwoControls target='safari' />
        </div>
    )
}
const SafariWindow = WindowWrapper(Safari, "safari")
export default SafariWindow