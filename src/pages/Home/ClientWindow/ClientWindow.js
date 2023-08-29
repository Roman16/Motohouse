import React, {useEffect, useState} from "react"
import './ClientWindow.css'
import {Modal, Button} from 'antd'
import {Input} from 'antd'
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined"
import {idGenerator} from "../Home"


export const ClientWindow = ({
                                 visible,

                                 onClose,
                                 onSave
                             }) => {
    const newMot = {
        id: idGenerator(),
        motoModel: undefined,
        motoNumber: undefined,
        motoVin: undefined,
    }

    const newClient = {
        id: idGenerator(),
        clientName: undefined,
        clientPhone: undefined,
        motorcycles: [{...newMot, id: idGenerator()}]
    }

    const [client, setClient] = useState({...newClient})

    const changeClientHandler = (data) => {
        setClient(prevState => ({...prevState, ...data}))
    }

    const changeMotorcyclesHandler = (index, mot) => {
        changeClientHandler({motorcycles: client.motorcycles.map((item, i) => i === index ? mot : item)})

    }

    const addMotHandler = () => changeClientHandler({
        motorcycles: [...client.motorcycles, {
            ...newMot,
            id: idGenerator()
        },]
    })

    useEffect(() => {
        if (!visible) {
            setClient({...newClient, id: idGenerator()})
        }
    }, [visible])

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={false}
            wrapClassName={'client-modal-window'}
        >
            <div className="modal-header">
                <h1>Клієнт</h1>
            </div>

            <div className="work-section">
                <div className="row">
                    <Input
                        value={client.clientName}
                        placeholder={"Ім'я"}
                        onChange={(e) => changeClientHandler({clientName: e.target.value})}
                    />

                    <Input
                        value={client.clientPhone}
                        placeholder={"Телефон"}
                        onChange={(e) => changeClientHandler({clientPhone: e.target.value})}
                    />
                </div>

                <section className="motorcycles">
                    <h2 className={'section-header'}>
                        Мотоцикли

                        <button className="btn icon" onClick={addMotHandler}>
                            <PlusOutlined/>
                        </button>
                    </h2>

                    <div className="motorcycles-list">
                        {client.motorcycles.map((motorcycle, index) => <div className="row">
                            <div className="th index">
                                {index + 1}
                            </div>

                            <div className="th">
                                <Input
                                    value={motorcycle.motoModel}
                                    placeholder={"Модель"}
                                    onChange={(e) => changeMotorcyclesHandler(index, {
                                        ...motorcycle,
                                        motoModel: e.target.value
                                    })}
                                />
                            </div>

                            <div className="th">
                                <Input
                                    value={motorcycle.motoNumber}
                                    placeholder={"Номер"}
                                    onChange={(e) => changeMotorcyclesHandler(index, {
                                        ...motorcycle,
                                        motoNumber: e.target.value
                                    })}
                                />
                            </div>

                            <div className="th">
                                <Input
                                    value={motorcycle.motoVin}
                                    placeholder={"VIN"}
                                    onChange={(e) => changeMotorcyclesHandler(index, {
                                        ...motorcycle,
                                        motoVin: e.target.value
                                    })}
                                />
                            </div>
                        </div>)}
                    </div>
                </section>
            </div>

            <div className="modal-footer">
                <Button variant="outlined" onClick={() => onSave(client)}>Зберегти</Button>
            </div>
        </Modal>
    )
}


