import React, { useEffect, useState } from "react";
import "./OrderWindow.css";
import moment from "moment";
import { managers } from "../Home";
import { Modal, Button } from "antd";
import { Select, Input } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { moneyMask, PdfTemplate } from "../PdfTemplate/PdfTemplate";
import saveAs from "file-saver";
import { pdf } from "@react-pdf/renderer";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import { ClientField } from "../ClientField/ClientField";
import { DeleteOutlined } from "@ant-design/icons";

const Option = Select.Option;

const newWork = {
  name: "",
  price: "",
  mechanic: "1",
};
const newMaterial = {
  name: "",
  price: "",
  mechanic: "2",
};

export const newOrder = {
  client: {
    name: undefined,
    phone: undefined,
  },
  createDate: moment().format("DD-MM-YYYY"),
  mileage: "",
  motModel: "",
  motNumber: "",
  motVin: "",
  manager: "1",
  status: "progress",
  works: [{ ...newWork }],
  materials: [{ ...newMaterial }],
};

export const OrderWindow = ({
  visible,
  clients,
  selectedOrder,

  onClose,
  onSave,
  onPay,
  onAddClient,
}) => {
  const [order, setOrder] = useState(
    selectedOrder ? { ...selectedOrder } : { ...newOrder }
  );

  const changeOrderHandler = (data) => {
    setOrder((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const addWorkHandler = () =>
    changeOrderHandler({
      works: [...order.works, { ...newWork }],
    });

  const addMaterialHandler = () =>
    changeOrderHandler({
      materials: [...order.materials, { ...newMaterial }],
    });

  const changeWorksHandler = (work, index) => {
    changeOrderHandler({
      works: order.works.map((item, i) => (i === index ? work : item)),
    });
  };

  const changeMaterialsHandler = (material, index) => {
    changeOrderHandler({
      materials: order.materials.map((item, i) =>
        i === index ? material : item
      ),
    });
  };

  const downloadPdfHandler = async () => {
    const blob = await pdf(
      <PdfTemplate order={order} index={selectedOrder?.index || 1} />
    ).toBlob();
    saveAs(
      blob,
      `Наряд-замовлення_${order?.motModel || ""}_${order?.motNumber || ""}`
    );
  };

  const removeWorkHandler = (index) => {
    changeOrderHandler({
      works: order.works.filter((item, i) => i !== index),
    });
  };

  const removeMaterialHandler = (index) => {
    changeOrderHandler({
      materials: order.materials.filter((item, i) => i !== index),
    });
  };

  useEffect(() => {
    if (visible) {
      if (selectedOrder) {
        setOrder({ ...selectedOrder });
      } else {
        setOrder({ ...newOrder });
      }
    }
  }, [visible]);

  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={false}
        wrapClassName={"order-modal-window"}
      >
        <div className="modal-header">
          <h1>Новий акт</h1>
        </div>

        <div className="work-section">
          <div className="row">
            <ClientField
              order={order}
              clients={clients}
              onChange={(data) => changeOrderHandler(data)}
              onAddClient={onAddClient}
            />

            <div className="form-control">
              <Select
                placeholder="Менеджер"
                value={order.manager}
                onChange={(manager) => changeOrderHandler({ manager })}
              >
                {managers.map((client) => (
                  <Option key={client.id}>{client.name}</Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="row">
            <div className="form-control">
              <Input
                placeholder="Мотоцикл"
                value={order.motModel}
                onChange={(e) =>
                  changeOrderHandler({ motModel: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <Input
                placeholder="Пробіг"
                value={order.mileage}
                onChange={(e) =>
                  changeOrderHandler({ mileage: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <Input
                placeholder="Номерний знак"
                value={order.motNumber}
                onChange={(e) =>
                  changeOrderHandler({ motNumber: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <Input
                placeholder="VIN"
                value={order.motVin}
                onChange={(e) => changeOrderHandler({ motVin: e.target.value })}
              />
            </div>
          </div>

          <section className={"works"}>
            <h2 className={"section-header"}>Роботи</h2>

            <div className="works-list">
              {order.works.map((work, index) => (
                <div className="row" key={work.id}>
                  <div className="th index">{index + 1}</div>
                  <div className="th name form-control">
                    <Input
                      value={work.name}
                      onChange={(e) =>
                        changeWorksHandler(
                          { ...work, name: e.target.value },
                          index
                        )
                      }
                    />
                  </div>

                  <div className="th price form-control">
                    <Input
                      value={work.price}
                      onChange={(e) =>
                        changeWorksHandler(
                          { ...work, price: e.target.value },
                          index
                        )
                      }
                    />
                  </div>

                  <div className="th mechanic form-control">
                    <Select
                      value={work.mechanic}
                      onChange={(mechanic) =>
                        changeWorksHandler({ ...work, mechanic }, index)
                      }
                    >
                      {managers.map((i) => (
                        <Option key={i.id} value={i.id}>
                          {i.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div className="th actions">
                    <Button
                      onClick={() => removeWorkHandler(index)}
                      icon={<DeleteOutlined />}
                    />
                  </div>
                </div>
              ))}

              <div className="row total-row">
                <div className="th name" onClick={addWorkHandler}>
                  <PlusOutlined />
                  Додати роботи
                </div>

                <div className="th price">
                  {moneyMask(
                    order.works.reduce(
                      (sum, currentValue) => sum + +(currentValue.price || 0),
                      0
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className={"materials"}>
            <h2 className={"section-header"}>Матеріали</h2>

            <div className="works-list">
              {order.materials.map((material, index) => (
                <div className="row">
                  <div className="th index">{index + 1}</div>
                  <div className="th name form-control">
                    <Input
                      value={material.name}
                      onChange={(e) =>
                        changeMaterialsHandler(
                          {
                            ...material,
                            name: e.target.value,
                          },
                          index
                        )
                      }
                    />
                  </div>

                  <div className="th price form-control">
                    <Input
                      value={material.price}
                      onChange={(e) =>
                        changeMaterialsHandler(
                          {
                            ...material,
                            price: e.target.value,
                          },
                          index
                        )
                      }
                    />
                  </div>

                  <div className="th mechanic form-control">
                    <Select
                      value={material.mechanic}
                      onChange={(mechanic) =>
                        changeMaterialsHandler({ ...material, mechanic }, index)
                      }
                    >
                      {managers.map((i) => (
                        <Option key={i.id} value={i.id}>
                          {i.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div className="th actions">
                    <Button
                      onClick={() => removeMaterialHandler(index)}
                      icon={<DeleteOutlined />}
                    />
                  </div>
                </div>
              ))}
              <div className="row total-row">
                <div className="th name" onClick={addMaterialHandler}>
                  <PlusOutlined />
                  Додати матеріали
                </div>

                <div className="th price">
                  {moneyMask(
                    order.materials.reduce(
                      (sum, currentValue) => sum + +(currentValue.price || 0),
                      0
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <div className="total-price">
            Загальна сума:{" "}
            {moneyMask(
              order.materials.reduce(
                (sum, currentValue) => sum + +(currentValue.price || 0),
                0
              ) +
                order.works.reduce(
                  (sum, currentValue) => sum + +(currentValue.price || 0),
                  0
                )
            )}
          </div>

          <Button onClick={downloadPdfHandler}>
            <DownloadOutlined />
          </Button>
          {order.status === "progress" && (
            <Button onClick={() => onPay(order.id)}>Оплачено</Button>
          )}
          {order.status !== "archived" && (
            <Button onClick={() => onSave(order)}>Зберегти</Button>
          )}
        </div>
      </Modal>
    </>
  );
};
