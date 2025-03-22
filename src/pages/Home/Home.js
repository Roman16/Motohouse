import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import "./Home.css";
import moment from "moment";
import { Table } from "antd";
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { OrderWindow } from "./OrderWindow/OrderWindow";

import { Status } from "../../components/Status/Status";
import FileAddOutlined from "@ant-design/icons/lib/icons/FileAddOutlined";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import FolderOpenOutlined from "@ant-design/icons/lib/icons/FolderOpenOutlined";
import { SalaryWindow } from "./SalaryWindow/SalaryWindow";
import { db } from "../../firebase-config";

export const managers = [
  {
    id: "1",
    name: "Вовка",
    salaryPercent: 0.5,
  },
  {
    id: "2",
    name: "Мішаня",
    salaryPercent: 0.5,
  },
];

export const Home = () => {
  const [orders, setOrders] = useState([]),
    [clients, setClients] = useState([]),
    [visibleOrderWindow, setVisibleOrderWindow] = useState(false),
    [visibleSalaryWindow, setVisibleSalaryWindow] = useState(false),
    [selectedOrder, setSelectedOrder] = useState(undefined);

  const columns = [
    {
      title: "№",
      dataIndex: "orderIndex",
      width: "100px",
    },
    {
      title: "Клієнт",
      dataIndex: "name",
      render: (value, item) => (
        <span>
          {item?.client.name} <br /> {item?.client.phone}
        </span>
      ),
    },
    {
      title: "Мотоцикл",
      dataIndex: "motModel",
    },
    {
      title: "Номерний знак",
      dataIndex: "motNumber",
    },
    {
      title: "VIN",
      dataIndex: "motVin",
    },
    {
      title: "Пробіг",
      dataIndex: "mileage",
      render: (value) => value && `${value} км`,
    },
    {
      title: "Дата заїзду",
      dataIndex: "createDate",
      render: (value) => moment(value.toDate()).format("DD-MM-YYYY"),
    },
    {
      title: "Дата виїзду",
      dataIndex: "exitDate",
      render: (value) => value && moment(value.toDate()).format("DD-MM-YYYY"),
    },
    {
      title: "Менеджер",
      dataIndex: "manager",
      render: (value) => managers.find((i) => i.id === value)?.name || "",
    },
    {
      title: "Статус",
      dataIndex: "status",
      width: 130,
      render: (value) => <Status value={value} />,
    },
    {
      title: "Сума",
      dataIndex: "totalPrice",
      render: (value, item) =>
        item.materials.reduce(
          (sum, currentValue) => sum + +(currentValue.price || 0),
          0
        ) +
        item.works.reduce(
          (sum, currentValue) => sum + +(currentValue.price || 0),
          0
        ),
    },
    {
      title: "",
      dataIndex: "actions",
      align: "right",
      width: 160,
      render: (i, item, index) => (
        <div className="actions">
          <button
            className="btn icon"
            onClick={() => {
              setSelectedOrder({ ...item, index });
              setVisibleOrderWindow(true);
            }}
          >
            <EyeOutlined />
          </button>

          <button
            type="button"
            className="btn icon"
            onClick={(e) => {
              e.stopPropagation();
              archiveHandler(item);
            }}
          >
            <FolderOpenOutlined />
          </button>
        </div>
      ),
    },
  ];

  const archiveHandler = (order) =>
    saveOrderHandler({
      ...order,
      status: "archived",
    });

  const payHandler = () => {
    saveOrderHandler({
      ...selectedOrder,
      status: "done",
      exitDate: moment().toDate(),
    });
  };

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "orders"), orderBy("orderIndex", "desc"));
      const res = await getDocs(q);
      const newData = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setOrders(newData);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchClients = async () => {
    try {
      const q = query(collection(db, "clients"));
      const res = await getDocs(q);
      const newData = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setClients(newData);
    } catch (e) {
      console.log(e);
    }
  };

  const saveOrderHandler = async (order) => {
    if (order.id) {
      try {
        const orderRef = doc(db, "orders", order.id);

        await updateDoc(orderRef, order);
        setOrders((prevState) => [
          ...prevState.map((i) => (i.id === order.id ? { ...order } : i)),
        ]);
      } catch (error) {
        console.error("Error updating order: ", error);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "orders"), {
          ...order,
          orderIndex: orders.length + 1,
        });
        const savedDoc = await getDoc(doc(db, "orders", docRef.id));
        if (savedDoc.exists()) {
          setOrders((prevState) => [
            { ...savedDoc.data(), id: savedDoc.id },
            ...prevState,
          ]);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    setVisibleOrderWindow(false);
  };

  const saveClientHandler = async (client) => {
    try {
      const docRef = await addDoc(collection(db, "clients"), client);

      const savedDoc = await getDoc(doc(db, "clients", docRef.id));

      if (savedDoc.exists()) {
        setClients((prevState) => [
          { ...savedDoc.data(), id: savedDoc.id },
          ...prevState,
        ]);
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchClients();
  }, []);

  return (
    <div className="home-page">
      <Header onCalculateSalary={() => setVisibleSalaryWindow(true)} />

      <div className="table">
        <Table
          columns={columns}
          dataSource={orders}
          pagination={false}
          scroll={{ y: true }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setSelectedOrder({ ...record, rowIndex });
                setVisibleOrderWindow(true);
              },
            };
          }}
          title={() => (
            <div className="table-header">
              <h1>Акти</h1>

              <button
                className="btn icon"
                onClick={() => setVisibleOrderWindow(true)}
              >
                <FileAddOutlined />
              </button>
            </div>
          )}
        />
      </div>

      <OrderWindow
        visible={visibleOrderWindow}
        selectedOrder={selectedOrder}
        clients={clients}
        onSave={saveOrderHandler}
        onPay={payHandler}
        onAddClient={saveClientHandler}
        onClose={() => {
          setVisibleOrderWindow(false);
          setSelectedOrder(undefined);
        }}
      />

      <SalaryWindow
        visible={visibleSalaryWindow}
        orders={orders}
        onClose={() => setVisibleSalaryWindow(false)}
      />
    </div>
  );
};
