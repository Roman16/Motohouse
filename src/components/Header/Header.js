import React, {useState} from "react"
import './Header.css'
import logo from '../../images/logo.svg'
import {useNavigate} from "react-router"
import {Dropdown} from 'antd'
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined"
import UserAddOutlined from "@ant-design/icons/lib/icons/UserAddOutlined"
import DollarOutlined from "@ant-design/icons/lib/icons/DollarOutlined"
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined"


export const Header = ({
                           onAddUser
                       }) => {

    const navigate = useNavigate()

    const logoutHandler = () => {
        navigate('/login')
    }

    const items = [
        {
            label: <div onClick={onAddUser}><UserAddOutlined /> Додати клієнта</div>,
            key: '0',
        },
        {
            label: <div><DollarOutlined /> Розрахунок</div>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={logoutHandler}><LogoutOutlined /> Вийти</div>,
            key: '3',
        },
    ]

    return (<header className={'header'}>
        <div className="logo">
            <img src={logo} alt=""/>
        </div>

        <div className="menu">
            <Dropdown
                menu={{items}}
                trigger={['click']}
            >
                <button className="btn icon">
                    <MenuOutlined/>
                </button>
            </Dropdown>
        </div>
    </header>)
}