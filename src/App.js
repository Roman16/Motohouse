import React from "react"
import {router} from './routes'
import {Button, ConfigProvider, Input, Space, theme} from 'antd'
import {initializeApp} from "firebase/app"

import {
    RouterProvider,
} from "react-router-dom"

function App() {
// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDhAdaEtZf-zACkBTg3XR4ylSJqMCNWpp0",
        authDomain: "motohouse-b3498.firebaseapp.com",
        projectId: "motohouse-b3498",
        storageBucket: "motohouse-b3498.appspot.com",
        messagingSenderId: "341869378168",
        appId: "1:341869378168:web:12e383ffecfd20387b4b8d"
    }

// Initialize Firebase
    const app = initializeApp(firebaseConfig)

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
