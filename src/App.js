import React from "react"
import {router} from './routes'
import {Button, ConfigProvider, Input, Space, theme} from 'antd'

import {
    RouterProvider,
} from "react-router-dom"

function App() {

    return (
        <ConfigProvider
            theme={{
                // 1. Use dark algorithm
                algorithm: theme.darkAlgorithm,

                // 2. Combine dark algorithm and compact algorithm
                // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}
        >
            <RouterProvider router={router}/>
        </ConfigProvider>
    )
}

export default App
