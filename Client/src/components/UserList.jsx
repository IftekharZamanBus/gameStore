import { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Form, Popconfirm, Typography } from 'antd';
import { get } from '../api/services';
const { Search } = Input;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please input ${title}` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserList = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      full_name: '',
      username: '',
      phone_number: '',
      address: '',
      role: '',
      is_active: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newUsers = [...users];
      const index = newUser.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setUsers(newUsers);
        setEditingKey('');
      } else {
        newUsers.push(row);
        setUsers(newUsers);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      editable: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
      editable: true,
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      sorter: (a, b) => a.is_active.localeCompare(b.is_active),
      editable: true,
    },
    {
      title: 'Operations',
      dataIndex: 'operations',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: (col.dataIndex = 'text'),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleSearch = (value, _e, info) => {
    console.log('_e', _e);
    console.log('value', value);
    console.log('info', info);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const response = await get('/api/users');
        let data = response.map((user) => {
          return {
            key: user.id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            phone_number: user.phone_number,
            address: user.address,
            role: user.role,
            is_active: user.is_active === 'Y' ? 'Active' : 'Inactive',
          };
        });
        setUsers(data);
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Search
        placeholder="Search users..."
        onSearch={handleSearch}
        style={{ width: '100%' }}
        enterButton
        allowClear
      />
      <Form form={form} component={false}>
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          dataSource={users}
          columns={mergedColumns}
          pagination={{ onChange: cancel }}
        />
      </Form>
    </div>
  );
};

export default UserList;
