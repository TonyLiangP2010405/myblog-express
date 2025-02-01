const User = require('../models/user');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers()
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
        res.status(200).json(new_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const {name} = req.body;
        const delete_user = await User.delete(name)
        res.status(200).json(delete_user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getUserByName = async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.getUserByName(name)
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}


