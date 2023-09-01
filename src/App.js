import React from "react"
import {router} from './routes'
import {ConfigProvider, theme} from 'antd'

import {
    RouterProvider,
} from "react-router-dom"

function App() {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <RouterProvider router={router}/>
        </ConfigProvider>
    )
}

export default App
