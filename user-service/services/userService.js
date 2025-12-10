let users = [];

const getAllUsers = async () => users;

const getUserById = async (id) => {
    return users.find(u => u.id === id);
};

const createUser = async (name, email, role) => {
    const newUser = {
        id: users.length + 1,
        name,
        email,
        role,
        created_at: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser
};
