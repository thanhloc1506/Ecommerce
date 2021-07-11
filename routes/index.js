const { Router } = require('express');

const userRouter = require('./apis/users');
const itemRouter = require('./apis/items');

const router = Router({ mergeParams: true });

router.use('/users', userRouter);
router.use('/items', itemRouter);

module.exports = router;
