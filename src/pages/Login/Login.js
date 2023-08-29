import * as React from 'react'
import './Login.css'
import {useNavigate} from 'react-router-dom';
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined"

export const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        // if (data.get('email') === 'admin' && data.get('password') === 'admin') {
        //    console.log('ttt')
        // }
        navigate('/home');
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder={'Email'}
                    name="email"
                />

                <input
                    placeholder={'Password'}
                    type={'password'}
                    name="password"
                />

                <button>
                    <CaretRightOutlined />
                </button>
            </form>
        </div>
    )
}