import React, { useEffect, useState } from "react";
import "./ClientField.css";
import { Modal, Button } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { Select, Input } from "antd";
import UserAddOutlined from "@ant-design/icons/lib/icons/UserAddOutlined";
import { Popover } from "antd";

const Option = Select.Option;

export const ClientField = ({ clients = [], order, onChange, onAddClient }) => {
  const newClient = {
    name: undefined,
    phone: undefined,
  };

  const [client, setClient] = useState({ ...newClient });
  const [searchStr, setSearchStr] = useState("");
  const [open, setOpen] = useState(false);

  const changeClientHandler = (data) => {
    setClient((prevState) => ({ ...prevState, ...data }));
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const hide = () => {
    setOpen(false);
  };

  const onSave = () => {
    onAddClient(client);
    hide();
    setClient({ ...newClient });
  };

  return (
    <div className="form-control client-field">
      <Select
        showSearch
        placeholder="Клієнт"
        value={order.client?.id || null}
        onSearch={(value) => setSearchStr(value)}
        filterOption={false}
        onChange={(id) =>
          onChange({
            client: clients.find((client) => client.id === id),
          })
        }
      >
        {clients
          .filter((client) =>
            client.name.toLowerCase().includes(searchStr.toLowerCase()) || client.phone.includes(searchStr)
          )
          .map((client) => (
            <Option key={client.id}>
              {client.name} ({client.phone})
            </Option>
          ))}
      </Select>

      <Popover
        content={
          <div className="new-user-popover">
            <Input
              value={client.name}
              placeholder={"Ім'я"}
              onChange={(e) => changeClientHandler({ name: e.target.value })}
            />

            <Input
              value={client.phone}
              placeholder={"Телефон"}
              onChange={(e) => changeClientHandler({ phone: e.target.value })}
            />

            <Button onClick={() => onSave(client)}>Зберегти</Button>
          </div>
        }
        trigger="click"
        placement="bottomRight"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <UserAddOutlined />
      </Popover>
    </div>
  );
};
