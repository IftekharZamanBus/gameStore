import React, {useEffect, useState} from 'react'
import { Table, Space, Input, message } from 'antd'
import { get } from '../api/services';

const { Search } = Input;

const columns = [
    {
        title: 'Full Name',
        dataIndex: 'full_name',
        key: 'full_name',
        sorter: (a, b) => a.full_name.localeCompare(b.full_name),
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
    },
    {
        title: 'Phone',
        dataIndex: 'phone_number',
        key: 'phone_number',
        sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
        title: 'Active',
        dataIndex: 'is_active',
        key: 'is_active',
        sorter: (a, b) => a.is_active.localeCompare(b.is_active),
    },
]

const UserList = () => {
    const [users, setUsers] = useState([])
  
    const handleSearch = (value, _e, info) => {
        console.log('_e', _e)
        console.log('value', value)
        console.log('info', info)
    }

    useEffect(() => {
        let isMounted = true
        const fetchUsers = async () => {
            try {
                const response = await get('/api/users')
                let data = response.map(user => {
                    return {
                        key: user.id,
                        full_name: user.full_name,
                        email: user.email,
                        username: user.username,
                        phone_number: user.phone_number,
                        address: user.address,
                        role: user.role,
                        is_active: user.is_active === 'Y' ? 'Active' : 'Inactive'
                    }
                })
                setUsers(data)
            } catch (error) {
                if(isMounted) {
                    console.error('Error fetching users:', error)
                }
                
            }
        }

        fetchUsers();

        return () => {
            isMounted = false;
          };
    }, [])
    
  return (
    <div>
        <Search
            placeholder="Search users..."
            onSearch={handleSearch}
            style={{ width: "100%" }}
            enterButton
            allowClear
        />
        <Table columns={columns} dataSource={users} />
    </div>
  )
}

export default UserList