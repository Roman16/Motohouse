import React, {useState} from "react"
import {Modal} from "antd"
import './SalaryWindow.css'
import {moneyMask} from "../PdfTemplate/PdfTemplate"
import {managers} from "../Home"
import DownSquareOutlined from "@ant-design/icons/lib/icons/DownSquareOutlined"

const mechanicPercent = 0.5

export const SalaryWindow = ({
                                 visible,
                                 orders,

                                 onClose
                             }) => {
    const [openDescription, setOpenDescription] = useState()

    const paidOrders = orders.filter(i => i.status === 'done')

    const getManagerSalary = (id) => {
        const salaryPercent = managers.find(i => i.id === id).salaryPercent

        const materialsSum = paidOrders.reduce((sum, order) => sum + order.materials.filter(i => i.mechanic === id).reduce((sum2, work) => sum2 + +(work.price || 0), 0), 0),
            worksSum = paidOrders.reduce((sum, order) => sum + order.works.filter(i => i.mechanic === id).reduce((sum2, work) => sum2 + +(work.price || 0), 0), 0),
            otherWorksSum = paidOrders.reduce((sum, order) => sum + order.works.filter(i => i.mechanic !== id).reduce((sum2, work) => sum2 + +(work.price || 0), 0), 0)

        return moneyMask(materialsSum + (worksSum * mechanicPercent) + ((worksSum - (worksSum * mechanicPercent)) * salaryPercent) + (otherWorksSum * mechanicPercent  * salaryPercent), 2)
    }

    return (<Modal
        open={visible}
        onCancel={onClose}
        footer={false}
        wrapClassName={'salary-modal-window'}
    >
        <div className="modal-header">
            <h1>Зарплата</h1>
        </div>

        <div className="work-section">
            <section>
                <h2 className={'section-header'}>Оплачені акти</h2>

                <div className="orders-list">
                    {paidOrders.map((order, index) => <div className="order">
                        <div className="index">
                            {index + 1}
                        </div>
                        <div className="mot">
                            {order.motorcycle.motoModel} <br/>
                            {order.motorcycle.motoNumber}
                        </div>

                        <div className="client">
                            {order.client.clientName} <br/>
                            {order.client.clientPhone}
                        </div>

                        <div className="price">
                            {moneyMask(order.materials.reduce((sum, currentValue) => sum + +(currentValue.price || 0), 0) + order.works.reduce((sum, currentValue) => sum + +(currentValue.price || 0), 0))}
                        </div>
                    </div>)}

                    <div className="order">
                        <div className="total">
                            Загальна сума
                        </div>

                        <div className="price">
                            {moneyMask(paidOrders.reduce((sum, order) => {
                                return sum + order.materials.reduce((sum, currentValue) => sum + +(currentValue.price || 0), 0) + order.works.reduce((sum, currentValue) => sum + +(currentValue.price || 0), 0)
                            }, 0))}
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className={'section-header'}>Доля</h2>

                <div className="managers">
                    {managers.map(manager => {
                        return (<div className={`manager ${openDescription === manager.id ? 'open' : ''}`}>
                            <div className="row"
                                 onClick={() => setOpenDescription(prevState => prevState === manager.id ? undefined : manager.id)}>
                                <div className="name">{manager.name}</div>

                                <div className="manager-salary">
                                    {getManagerSalary(manager.id)}
                                </div>

                                <button className="btn icon">
                                    <DownSquareOutlined/>
                                </button>
                            </div>

                            <div className="description">
                                <h4>Роботи <span>{paidOrders.reduce((sum, order) => {
                                    return sum + order.works
                                        .filter(i => i.mechanic === manager.id)
                                        .reduce((sum2, work) => sum2 + +(work.price || 0), 0)
                                }, 0)}</span></h4>
                                {paidOrders.map(order => <div className={'description-list'}>
                                    {order.works.filter(i => i.mechanic === manager.id)
                                        .map(work => <div className="list-item">
                                            <div className="mot" title={order.motorcycle.motoModel}>{order.motorcycle.motoModel}</div>
                                            <div className="name" title={work.name}>{work.name}</div>
                                            <div className="price">{work.price}</div>
                                        </div>)}
                                </div>)}

                                <br/>

                                <h4>Матеріали <span>{paidOrders.reduce((sum, order) => {
                                    return sum + order.materials
                                        .filter(i => i.mechanic === manager.id)
                                        .reduce((sum2, work) => sum2 + +(work.price || 0), 0)
                                }, 0)}</span></h4>
                                {paidOrders.map(order => <div className={'description-list'}>
                                    {order.materials.filter(i => i.mechanic === manager.id)
                                        .map(work => <div className="list-item">
                                            <div className="mot" title={order.motorcycle.motoModel}>{order.motorcycle.motoModel}</div>
                                            <div className="name" title={work.name}>{work.name}</div>
                                            <div className="price">{work.price}</div>
                                        </div>)}
                                </div>)}

                            </div>
                        </div>)
                    })}
                </div>
            </section>
        </div>
    </Modal>)
}