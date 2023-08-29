import React, {useEffect, useState} from "react"
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete from '@mui/material/Autocomplete'
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
import PersonAdd from '@mui/icons-material/PersonAdd'

const newClient = {
    clientName: undefined,
    clientPhone: undefined,
    motorcycles: []
}

export const ClientWindow = ({
                                 visible,

                                 onClose,
                                 onSave
                             }) => {
    const [client, setClient] = useState({...newClient, id: new Date().valueOf()})


    useEffect(() => {
        if (!visible) {
            setClient({...newClient})
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

                </div>

                <div className="modal-footer">
                    <Button variant="outlined" onClick={() => onSave(order)}>Зберегти</Button>
                </div>
            </div>
        </Modal>
    )
}



