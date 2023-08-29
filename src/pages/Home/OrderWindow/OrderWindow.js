import React, {useEffect, useState} from "react"
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete  from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload'

import moment from "moment"
import {managers} from "./Home"
import PersonAdd from '@mui/icons-material/PersonAdd';

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

                                onClose,
                                onSave
                            }) => {

    const [order, setOrder] = useState({...newOrder, id: new Date().valueOf()})

    const changeOrderHandler = (data) => {
        setOrder(prevState => ({
            ...prevState,
            ...data
        }))
    }

    const addWorkHandler = () => changeOrderHandler({works: [...order.works, {...newWork, id: new Date().valueOf()}]})

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
        if (!visible) {
            setOrder({...newOrder, id: new Date().valueOf()})
        }
    }, [visible])

    return (
        <Modal
            open={visible}
            onClose={onClose}
        >
            <div className="order-modal-window">
                <div className="modal-header">
                    <h1>Новий акт</h1>

                    <button className={'download-btn icon'} onClick={() => alert('Пососи')}>
                        <SimCardDownloadIcon/>
                    </button>

                    <button className={'close-btn icon'} onClick={onClose}>
                        <CloseIcon/>
                    </button>
                </div>

                <div className="work-section">
                    <div className="row">
                        <FormControl className={'client-field'}>
                            <Autocomplete
                                value={order.client.id || undefined}
                                id="combo-box-demo"
                                options={clients}
                                getOptionLabel={option => `${option.clientName} (${option.clientPhone})`}
                                renderInput={(params) => <TextField {...params} label="Клієнт"/>}

                                onChange={(event, client) => changeOrderHandler({client})}
                            />

                            <button className="btn icon add-new-user">
                                <PersonAdd/>
                            </button>
                        </FormControl>

                        <FormControl>
                            <Autocomplete
                                disabled={!order.client.clientPhone}
                                value={order.motorcycle.id || undefined}
                                disablePortal
                                id="combo-box-demo"
                                options={order.client.motorcycles || []}
                                getOptionLabel={option => `${option.motoModel} (${option.motoNumber})`}
                                renderInput={(params) => <TextField {...params} label="Мотоцикл"/>}

                                onChange={(event, motorcycle) => changeOrderHandler({motorcycle})}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                label="Пробіг"
                                value={order.mileage}

                                onChange={(e) => changeWorksHandler({mileage: e.target.value})}
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Менеджер</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label={'Менеджер'}
                                value={order.manager}
                                onChange={(e) => changeOrderHandler({manager: e.target.value})}
                            >
                                {managers.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>

                    <section className={'works'}>
                        <h2 className={'section-header'}>Роботи</h2>

                        <div className="works-list">
                            {order.works.map((work, index) => (<div className="row" key={work.id}>
                                <div className="th index">{index + 1}</div>
                                <div className="th name">
                                    <TextField
                                        value={work.name}

                                        onChange={(e) => changeWorksHandler({...work, name: e.target.value})}
                                    />
                                </div>

                                <div className="th price">
                                    <TextField
                                        value={work.price}

                                        onChange={(e) => changeWorksHandler({...work, price: e.target.value})}
                                    />
                                </div>

                                <div className="th mechanic">
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={work.mechanic}
                                        onChange={(e) => changeWorksHandler({...work, mechanic: e.target.value})}
                                    >
                                        {managers.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
                                    </Select>
                                </div>
                            </div>))}

                            <div className="row total-row">
                                <div className="th name" onClick={addWorkHandler}>
                                    <AddIcon/>
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
                                    <TextField
                                        value={material.name}

                                        onChange={(e) => changeMaterialsHandler({...material, name: e.target.value})}
                                    />
                                </div>

                                <div className="th price">
                                    <TextField
                                        value={material.price}

                                        onChange={(e) => changeMaterialsHandler({...material, price: e.target.value})}
                                    />
                                </div>

                                <div className="th mechanic">
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={material.mechanic}
                                        onChange={(e) => changeWorksHandler({...material, mechanic: e.target.value})}
                                    >
                                        {managers.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
                                    </Select>
                                </div>
                            </div>))}
                            <div className="row total-row">
                                <div className="th name" onClick={addMaterialHandler}>
                                    <AddIcon/>
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
                    <Button variant="outlined" onClick={() => onSave(order)}>Зберегти</Button>
                </div>
            </div>
        </Modal>
    )
}



