const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers()
        if (users.length === 0) {
            return res.status(404).json({message: `No users found`})
        }
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const createUser = async (req, res) => {
    try {
        const {name, password ,email} = await User.create(req.body);
        const new_user = await User.create({name, email, password});
        res.status(201).json(new_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const {name} = req.params;
        if (getUserByName(name).length === 0) {
            return res.status(404).json({message: `No users found`})
        }
        const delete_user = await User.delete(name)
        res.status(200).json(delete_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await User.getUserByName(name)
        if (user.length === 0) {
            return res.status(404).json({message: `No users found`})
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const checkLogin = async (req, res) => {
    try {
        const {name, password} = req.body
        const user = await User.getUserByName(name)
        console.log(user.data.id)
        console.log(user.data.username)
        if (user.length === 0) {
            return res.status(404).json({message: `No users found`})
        }
        if (user.data.password !== password) {
            return res.status(401).json({message: '无效的凭证'});
        }
        console.log('JWT Secret:', process.env.JWT_SECRET);
        const token = jwt.sign(
            {userId: user.data.id,
                    name:user.data.username},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.json({token});
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: '服务器错误' });
    }
}

const updateUser = async (req, res) => {
    try {
        const {name} = req.params
        const {new_name, email, password} = req.body;
        if (getUserByName(name).length === 0) {
            return res.status(404).json({message: `No users found`})
        }
        let user = await User.getUserByName(name);
        const update_user = user.updateUserByName(new_name, email, password);
        res.status(200).json(update_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updatePassword = async (req, res) => {
    try {
        const {name} = req.params
        const {new_password} = req.body;
        if (getUserByName(name).length === 0) {
            return res.status(404).json({message: `No users found`})
        }
        let user = await User.getUserByName(name);
        const update_user = user.updatePassword(new_password);
        res.status(200).json(update_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateName = async (req, res) => {
    try {
        const {name} = req.params
        const {new_name} = req.body;
        if (getUserByName(name).length === 0) {
            return res.status(404).json({message: `No users found`})
        }
        let user = await User.getUserByName(name);
        const update_user = user.updateName(name, new_name)
        res.status(200).json(update_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateEmail = async (req, res) => {
    try {
        const {name} = req.params
        const {email} = req.body;
        if (getUserByName(name).length === 0) {
            return res.status(404).json({message: `No users found`})
        }
        let user = await User.getUserByName(name);
        const update_user = user.updateEmail(name, email)
        res.status(200).json(update_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByName,
    updateEmail,
    updateUser,
    updateName,
    updatePassword,
    deleteUser,
    checkLogin,
}

