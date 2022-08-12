const MemoryController = require('../controllers/memory.controller');
const {authenticate, verify} = require('../middleware/jwt.config')

module.exports = app => {
    app.post('/api/memory', authenticate, MemoryController.createMemory);
    app.get('/api/memory', authenticate, MemoryController.getAllMemories);
    app.get('/api/memory/:id', authenticate, MemoryController.getOneMemory);
    app.put('/api/memory/:id', authenticate, MemoryController.updateMemory);
    app.delete('/api/memory/:id', authenticate, MemoryController.deleteMemory);
}