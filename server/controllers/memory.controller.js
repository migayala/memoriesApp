const Memory = require('../models/memory.model');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const createMemory = (req, res) => {
    const NewMemory = new Memory(req.body);
    const { _id } = jwt_decode(req.cookies.userToken);
    NewMemory.creatorUser = _id;
    // console.log(jwt_decode(req.cookies.userToken));
    NewMemory
        .save()
        .then((Memory) => {
            // await Memory.populate('creatorUser', 'email');
            res.json({ Memory })
        })
        .catch(err => res.status(400).json({ message: 'Something went wrong (create)', error: err }));
}

const getAllMemories = (req, res) => {
    // const { cookies: { userToken } } = req;
    const { _id } = jwt_decode(req.cookies.userToken)
    // if ( !_id ) {
    //     res.status(401).json('ID is not defined')
    // }
    // console.log(jwt_decode(req.cookies.userToken))
    // console.log(_id)
    Memory
        .find({creatorUser: _id})
        .then((allMemories) => {(res.json(allMemories))})
        .catch((err) => res.status(400).json(err));
}

const getOneMemory = (req, res) => {
    Memory
        .findOne({_id: req.params.id})
        .then((oneMemory) => {res.json(oneMemory)})
        .catch((err) => res.status(400).json(err));
}

const updateMemory = (req, res) => {
    Memory
        .findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then((updatedMemory) => {res.json(updatedMemory)})
        .catch((err) => res.status(400).json(err));
}

const deleteMemory = (req, res) => {
    Memory
        .deleteOne({_id: req.params.id})
        .then((mongooseResponse) => res.json(mongooseResponse))
        .catch((err) => res.status(400).json(err));
}

module.exports = {
    createMemory,
    getAllMemories,
    getOneMemory,
    updateMemory,
    deleteMemory
}