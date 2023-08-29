import React, {useEffect, useState} from "react"
import {Header} from "../../components/Header/Header"
import './Home.css'
import moment from 'moment'
import {Table} from 'antd'

import {OrderWindow} from "./OrderWindow/OrderWindow"
// import {ClientWindow} from "./ClientWindow/ClientWindow"

import {Status} from "../../components/Status/Status"
import FileAddOutlined from "@ant-design/icons/lib/icons/FileAddOutlined"
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined"
import FolderOpenOutlined from "@ant-design/icons/lib/icons/FolderOpenOutlined"

export const managers = [
    {
        id: '1',
        name: 'Вовка'
    },
    {
        id: '2',
        name: 'Сашка'
    },
    {
        id: '3',
        name: 'Ромка'
    },
]

export const Home = () => {
    const [orders, setOrders] = useState(localStorage.getItem('localOrders') ? JSON.parse(localStorage.getItem('localOrders')) : []),
        [clients, setClients] = useState(localStorage.getItem('localClients') ? JSON.parse(localStorage.getItem('localClients')) : []),
        [visibleOrderWindow, setVisibleOrderWindow] = useState(false),
        [visibleClientWindow, setVisibleClientWindow] = useState(false),
        [selectedOrder, setSelectedOrder] = useState(undefined)

    const columns = [
        {
            title: 'Клієнт',
            dataIndex: 'name',
            render: (value, item) => <span>{item.client.clientName} <br/> {item.client.clientPhone}</span>
        },
        {
            title: 'Мотоцикл',
            dataIndex: 'motoModel',
            render: (value, item) => item.motorcycle.motoModel
        },
        {
            title: 'Номерний знак',
            dataIndex: 'motoNumber',
            render: (value, item) => item.motorcycle.motoNumber
        },
        {
            title: 'VIN',
            dataIndex: 'motoVin',
            render: (value, item) => item.motorcycle.motoVin
        },
        {
            title: 'Пробіг',
            dataIndex: 'mileage',
            render: (value) => `${value} км`
        },
        {
            title: 'Дата заїзду',
            dataIndex: 'date',
            render: value => moment(value).format('DD-MM-YYYY')
        },
        {
            title: 'Менеджер',
            dataIndex: 'manager',
            render: (value) => managers.find(i => i.id === value).name
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            minWidth: 120,
            render: (value) => <Status value={value}/>
        },
        {
            title: 'Сума',
            dataIndex: 'totalPrice',
            render: (value, item) => item.materials.reduce((sum, currentValue) => sum + +(currentValue.price || 0), 0) + item.works.reduce((sum, currentValue) => sum + +(currentValue.price || 0), 0)
        },
        {
            title: '',
            dataIndex: 'actions',
            align: 'right',
            width: 160,
            render: (i, item) =>
                <div className="actions">
                    <button className="btn icon" onClick={() => {
                        setSelectedOrder(item)
                        setVisibleOrderWindow(true)
                    }}>
                        <EyeOutlined />
                    </button>

                    <button className="btn icon" onClick={() => archiveHandler(item.id)}>
                        <FolderOpenOutlined />
                    </button>
                </div>

        },
    ]

    const archiveHandler = (id) => setOrders(prevState => ([...prevState.map(i => i.id === id ? ({
        ...i,
        status: 'archived'
    }) : i)]))


    const saveOrderHandler = (order) => {
        setOrders(prevState => ([order, ...prevState]))
        setVisibleOrderWindow(false)
    }

    const saveClientHandler = (client) => {
        setClients(prevState => [client, ...prevState])
        setVisibleClientWindow(false)
    }

    useEffect(() => {
        localStorage.setItem('localOrders', JSON.stringify(orders))
    }, [orders])

    useEffect(() => {
        localStorage.setItem('localClients', JSON.stringify(clients))
    }, [clients])

    return (<div className="home-page">
        <Header
            onAddUser={() => setVisibleClientWindow(true)}
        />

        <div className="table">
            <Table
                columns={columns}
                dataSource={orders}
                pagination={false}
                title={() => <div className="table-header">
                    <h1>Акти</h1>

                    <button className="btn icon" onClick={() => setVisibleOrderWindow(true)}>
                        <FileAddOutlined/>
                    </button>
                </div>}
            />
        </div>

        <OrderWindow
            visible={visibleOrderWindow}

            selectedOrder={selectedOrder}
            clients={clients}

            onSave={saveOrderHandler}
            onAddUser={() => setVisibleClientWindow(true)}
            onClose={() => {
                setVisibleOrderWindow(false)
                setSelectedOrder(undefined)
            }}
        />

        {/*<ClientWindow*/}
        {/*    visible={visibleClientWindow}*/}

        {/*    onSave={saveClientHandler}*/}
        {/*    onClose={() => setVisibleClientWindow(false)}*/}
        {/*/>*/}
    </div>)
}

export const idGenerator = () => String(new Date().valueOf())