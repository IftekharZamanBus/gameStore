import React, { useEffect, useState, useContext, useRef } from 'react';
import { Table, Input, Form, Popconfirm, Typography, Button } from 'antd';
import { get, put } from '../../api/services';
import './UserList.css';

const { Search } = Input;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (!editing) {
      if (record && dataIndex && form) {
        form.setFieldsValue({ [dataIndex]: record[dataIndex] || '' });
      }
    }
  }, [editing, dataIndex, form, record]);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          onKeyDown={handleKeyDown}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get('/api/users');
        const data = response.map((user) => ({ ...user, isEditing: false }));
        setUsers(data);
        setOriginalUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    const filteredUsers = originalUsers.filter((user) => {
      return Object.values(user).some((fieldValue) =>
        fieldValue.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    setUsers(filteredUsers);
  };

  const handleClear = () => {
    setUsers(originalUsers);
  };

  const saveChanges = async (id) => {
    try {
      const updatedUser = users.find((user) => user.id === id);
      await put(`/api/users/${id}`, updatedUser);
      toggleEditMode(id);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      let user = users.find((user) => user.id === id);
      user.is_active = 'N';
      await put(`/api/users/${id}`, user);
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const toggleEditMode = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isEditing: !user.isEditing } : user
    );
    setUsers(updatedUsers);
  };

  const handleEditChange = (id, field, value) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, [field]: value } : user
    );
    setUsers(updatedUsers);
  };

  const renderEditableCell = (record, dataIndex) => {
    const editing = record.isEditing;
    return editing ? (
      <Input
        value={record[dataIndex]}
        onChange={(e) => handleEditChange(record.id, dataIndex, e.target.value)}
      />
    ) : (
      record[dataIndex]
    );
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
      render: (text, record) => renderEditableCell(record, 'full_name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text, record) => renderEditableCell(record, 'username'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
      render: (text, record) => renderEditableCell(record, 'phone_number'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      render: (text, record) => renderEditableCell(record, 'address'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
      render: (text, record) => renderEditableCell(record, 'role'),
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      sorter: (a, b) => a.is_active.localeCompare(b.is_active),
      render: (text, record) => renderEditableCell(record, 'is_active'),
    },
    {
      title: 'Operations',
      dataIndex: 'operations',
      render: (_, record) => (
        <div>
          {record.isEditing ? (
            <Button type="primary" onClick={() => saveChanges(record.id)}>
              Save
            </Button>
          ) : (
            <Button onClick={() => toggleEditMode(record.id)}>Edit</Button>
          )}
          <Popconfirm
            title="Sure to deactivate?"
            onConfirm={() => handleDeactivate(record.id)}
          >
            <Button danger>Deactivate</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search users..."
        onChange={(e) => handleSearch(e.target.value)}
        onClear={handleClear}
        style={{ width: '100%' }}
        allowClear
      />

      <Table
        dataSource={users}
        columns={columns}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default UserList;
