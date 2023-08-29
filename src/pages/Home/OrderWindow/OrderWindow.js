import React, {useEffect, useState} from "react"
import './OrderWindow.css'
import moment from "moment"
import {idGenerator, managers} from "../Home"
import {Modal, Button} from 'antd'
import {Select, Input} from 'antd'
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined"
import UserAddOutlined from "@ant-design/icons/lib/icons/UserAddOutlined"

const Option = Select.Option

const newOrder = {
    client: {
        clientName: undefined,
        clientPhone: undefined,
        motorcycles: []
    },
    motorcycle: {
        motoModel: undefined,
        motoNumber: undefined,
        motoVin: undefined,
    },
    createDate: moment(),
    mileage: undefined,
    manager: '1',
    status: 'progress',
    works: [],
    materials: []
}

const newWork = {
    name: undefined,
    price: undefined,
    mechanic: '1'
}
const newMaterial = {
    name: undefined,
    price: undefined,
    mechanic: '3'
}

export const OrderWindow = ({
                                visible,
                                clients,
                                selectedOrder,

                                onClose,
                                onSave,
                                onAddUser,
                            }) => {

    const [order, setOrder] = useState(selectedOrder ? {...selectedOrder} : {...newOrder, id: idGenerator()})

    const changeOrderHandler = (data) => {
        console.log(data)

        setOrder(prevState => ({
            ...prevState,
            ...data
        }))
    }

    const addWorkHandler = () => changeOrderHandler({works: [...order.works, {...newWork, id: idGenerator()}]})

    const addMaterialHandler = () => changeOrderHandler({
        materials: [...order.materials, {
            ...newMaterial,
            id: new Date().valueOf()
        }]
    })


    const changeWorksHandler = (work) => {
        changeOrderHandler({works: order.works.map(i => i.id === work.id ? work : i)})
    }

    const changeMaterialsHandler = (material) => {
        changeOrderHandler({materials: order.materials.map(i => i.id === material.id ? material : i)})
    }

    useEffect(() => {
        if (visible) {
            if (selectedOrder) {
                setOrder({...selectedOrder})
            } else {
                setOrder({...newOrder, id: idGenerator()})
            }
        }
    }, [visible])

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={false}
            wrapClassName={'order-modal-window'}
        >
            <div className="modal-header">
                <h1>Новий акт</h1>
            </div>

            <div className="work-section">
                <div className="row">
                    <div className="form-control client-field">
                        <Select
                            placeholder="Клієнт"
                            value={order.client.id || undefined}
                            onChange={(id) => changeOrderHandler({client: clients.find((i) => i.id === id)})}
                        >
                            {clients.map(client => <Option key={client.id}>
                                {client.clientName} ({client.clientPhone})
                            </Option>)}
                        </Select>

                        <button className="btn icon" onClick={onAddUser}>
                            <UserAddOutlined />
                        </button>
                    </div>

                    <div className="form-control">
                        <Select
                            placeholder="Мотоцикл"
                            disabled={!order.client.id}
                            value={order.motorcycle?.id || undefined}
                            onChange={(motorcycle) => changeOrderHandler({motorcycle})}
                        >
                            {order.client.motorcycles.map(mot => <Option key={mot.id}>
                                {mot.motoModel} ({mot.motoNumber})
                            </Option>)}
                        </Select>
                    </div>

                    <div className="form-control">
                        <Input
                            placeholder="Пробіг"
                            value={order.mileage}

                            onChange={(e) => changeOrderHandler({mileage: e.target.value})}
                        />
                    </div>

                    <div className="form-control">
                        <Select
                            placeholder="Менеджер"
                            value={order.manager}
                            onChange={(manager) => changeOrderHandler({manager})}
                        >
                            {managers.map(client => <Option key={client.id}>
                                {client.name}
                            </Option>)}
                        </Select>
                    </div>
                </div>

                <section className={'works'}>
                    <h2 className={'section-header'}>Роботи</h2>

                    <div className="works-list">
                        {order.works.map((work, index) => (<div className="row" key={work.id}>
                            <div className="th index">{index + 1}</div>
                            <div className="th name">
                                <Input
                                    value={work.name}
                                    onChange={(e) => changeWorksHandler({...work, name: e.target.value})}
                                />
                            </div>

                            <div className="th price">
                                <Input
                                    value={work.price}
                                    onChange={(e) => changeWorksHandler({...work, price: e.target.value})}
                                />
                            </div>

                            <div className="th mechanic">
                                <Select
                                    value={work.mechanic}
                                    onChange={(mechanic) => changeWorksHandler({...work, mechanic})}
                                >
                                    {managers.map(i => <Option key={i.id} value={i.id}>{i.name}</Option>)}
                                </Select>
                            </div>
                        </div>))}

                        <div className="row total-row">
                            <div className="th name" onClick={addWorkHandler}>
                                <PlusOutlined />
                                Додати роботи
                            </div>

                            <div className="th price">
                                {order.works.reduce((sum, currentValue) => sum + +(currentValue.price || 0), 0)}
                            </div>
                        </div>
                    </div>
                </section>

                <section className={'materials'}>
                    <h2 className={'section-header'}>Матеріали</h2>

                    <div className="works-list">
                        {order.materials.map((material, index) => (<div className="row">
                            <div className="th index">{index + 1}</div>
                            <div className="th name">
                                <Input
                                    value={material.name}
                                    onChange={(e) => changeMaterialsHandler({...material, name: e.target.value})}
                                />
                            </div>

                            <div className="th price">
                                <Input
                                    value={material.price}
                                    onChange={(e) => changeMaterialsHandler({...material, price: e.target.value})}
                                />
                            </div>

                            <div className="th mechanic">
                                <Select
                                    value={material.mechanic}
                                    onChange={(mechanic) => changeWorksHandler({...material, mechanic})}
                                >
                                    {managers.map(i => <Option key={i.id} value={i.id}>{i.name}</Option>)}
                                </Select>
                            </div>
                        </div>))}
                        <div className="row total-row">
                            <div className="th name" onClick={addMaterialHandler}>
                                <PlusOutlined />
                                Додати матеріали
                            </div>

                            <div className="th price">
                                {order.materials.reduce((sum, currentValue) => sum + +(currentValue.price || 0), 0)}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="modal-footer">
                <Button onClick={() => onSave(order)}>Друкувати</Button>
                <Button onClick={() => onSave(order)}>Оплачено</Button>
                <Button onClick={() => onSave(order)}>Зберегти</Button>
            </div>
        </Modal>
    )
}



