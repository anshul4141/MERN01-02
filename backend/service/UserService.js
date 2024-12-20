const User = require('../model/User');

const addUser = (userData) => {

    const newUser = new User(userData);
    return newUser.save()
        .then(savedUser => ({
            user: savedUser, message: 'Data added successfully'
        })).catch(error => {
            throw new Error(error.message);
        });
}

const updateUser = (userId, updateData) => {
    return User.findByIdAndUpdate(userId, updateData)
        .then(updatedUser => {
            if (!updatedUser) {

                throw new Error('User not found')

            } else {

                return { message: 'User Updated successfully..' };

            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

const deleteUser = (userId) => {
    return User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {

                throw new Error('User not found')

            } else {

                return { message: 'User deleted successfully' }

            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

const getUserById = (userId) => {
    return User.findById(userId)
        .then(user => {
            if (!user) {

                throw new Error('User not found')

            } else {

                return user;

            }

        })
        .catch(error => { throw new Error(error.message); });
};

const searchUsers = (query) => {

    return User.find(query)

        .then(users => users)

        .catch(error => { throw new Error(error.message); });
};

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUsers,
}