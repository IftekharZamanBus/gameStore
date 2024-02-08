const bcrypt = require('bcryptjs');

const users = [
    {
        id: "7d257ba0-3e95-450e-9894-033d2ef451b9",
        full_name: "Adam Armstrong",
        email: "adam.armstrong@example.com",
        password: bcrypt.hashSync('123456', 10),
        role: 'admin',
        username: "adam.armstrong",
        phone_number: "011-962-7516",
        address: "1234 Fake Street, Fake City, Fake State, 12345",
        is_active: 'Y'
    },
    {
        id: "67b9d1e9-0b6a-41ec-84e6-9fff9285aee4",
        full_name: "Owen James",
        email: "owen.james@example.com",
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
        username: "owen.james",
        phone_number: "011-962-7516",
        address: "1234 Fake Street, Fake City, Fake State, 12345",
        is_active: 'Y'
    },
    {
        id: "6093cf14-9956-46cc-8788-f093a918163b",
        full_name: "Bob Parker",
        email: "bob.parker@example.com",
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
        username: "bob.parker",
        phone_number: "011-962-7516",
        address: "1234 Fake Street, Fake City, Fake State, 12345",
        is_active: 'Y'
    },
]

module.exports = users;