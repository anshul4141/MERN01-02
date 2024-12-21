const User = require('../model/User');

const addUser = (userData) => {
    return findByLoginId({ loginId: userData.loginId })
        .then((existUser) => {
            if (existUser) {
                return { message: 'Login ID already exists pleas enter diffrent loginId..' };
            } else {
                const newUser = new User(userData);
                return newUser.save()
                    .then((savedUser) => ({
                        user: savedUser,
                        message: 'User added successfully',
                    }));
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};


const updateUser = (userId, updateData) => {

    return User.findByIdAndUpdate(userId, updateData)
        .then(updatedUser => {
            if (!updatedUser) {

                throw new Error('User Not Found');

            } else {

                return { message: 'User updated successfully..' };

            }
        })
        .catch(error => {
            throw new Error({ error: error.message });
        })

}

const deleteUser = (userId) => {

    return User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {

                throw new Error('user not found');

            } else {

                return { message: 'User deleted successfully..' }

            }
        })
        .catch(error => {
            throw new Error({ error: error.message });
        })

}

const getUserById = (userId) => {
    return User.findById(userId)
        .then(users => {
            if (!users) {

                throw new Error('user not found')

            } else {

                return users

            }
        })
        .catch(error => {
            throw new Error({ error: error.message });
        })

}

const searchUsers = (query) => {
    console.log("query ===> ", query);
    return User.find(query)
        .then(users => {

            if (!users) {
                throw new Error('Record Not Found');
            } else {
                return users;
            }
        })
        .catch(error => {
            throw new Error({ error: error.message });
        })

}

const findByLoginId = (loginId) => {
    console.log("loginId = ", loginId)
    return User.findOne(loginId)
        .then(user => {
            if (!user) {

                return null;

            } else {
                return user
            }
        })
}

const authenticate = (loginId, password) => {
    return User.findOne({ loginId, password })
        .then(user => {
            if (!user) {

                return { message: 'Invalid loginId and Password' }

            } else {
                return {
                    message: 'user login successfully',
                    user: user
                }
            }
        })
        .catch(error => {
            console.log(error.message)
        })
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUsers,
    findByLoginId,
    authenticate,

}