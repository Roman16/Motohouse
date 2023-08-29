import React, {useEffect, useState} from "react"
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import './ClientWindow.css'
import TextField from "@mui/material/TextField/TextField"
import AddIcon from '@mui/icons-material/Add'

const newMot = {
    id: new Date().valueOf(),
    motoModel: undefined,
    motoNumber: undefined,
    motoVin: undefined,
}

const newClient = {
    id: new Date().valueOf(),
    clientName: undefined,
    clientPhone: undefined,
    motorcycles: [{...newMot}]
}


export const ClientWindow = ({
                                 visible,

                                 onClose,
                                 onSave
                             }) => {
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
            id: new Date().valueOf()
        },]
    })

    useEffect(() => {
        if (!visible) {
            setClient({...newClient, id: new Date().valueOf()})
        }
    }, [visible])

    return (
        <Modal
            open={visible}
            onClose={onClose}
        >
            <div className="client-modal-window">
                <div className="modal-header">
                    <h1>Клієнт</h1>

                    <button className={'close-btn icon'} onClick={onClose}>
                        <CloseIcon/>
                    </button>
                </div>

                <div className="work-section">
                    <div className="row">
                        <TextField
                            value={client.clientName}
                            label={"Ім'я"}
                            onChange={(e) => changeClientHandler({clientName: e.target.value})}
                        />

                        <TextField
                            value={client.clientPhone}
                            label={"Телефон"}
                            onChange={(e) => changeClientHandler({clientPhone: e.target.value})}
                        />
                    </div>

                    <section className="motorcycles">
                        <h2 className={'section-header'}>
                            Мотоцикли

                            <button className="btn icon" onClick={addMotHandler}>
                                <AddIcon/>
                            </button>
                        </h2>

                        <div className="motorcycles-list">
                            {client.motorcycles.map((motorcycle, index) => <div className="row">
                                <div className="th index">
                                    {index + 1}
                                </div>

                                <div className="th">
                                    <input
                                        value={motorcycle.motoModel}
                                        placeholder={"Модель"}
                                        onChange={(e) => changeMotorcyclesHandler(index, {
                                            ...motorcycle,
                                            motoModel: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="th">
                                    <input
                                        value={motorcycle.motoNumber}
                                        placeholder={"Номер"}
                                        onChange={(e) => changeMotorcyclesHandler(index, {
                                            ...motorcycle,
                                            motoNumber: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="th">
                                    <input
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
            </div>
        </Modal>
    )
}



