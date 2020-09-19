import express from 'express';
import User from '../models/userModel'
import Instalment from '../models/instalmentModel';
import { instalmentValidation } from '../validation'

const router = express.Router();
router.post('/saveinstalment', async (req, res) => {


    const { error } = instalmentValidation(req.body)
    if (error) {
        res.status(401).send(error.details[0].message);
    }


    const userExist = await User.findOne({ _id: req.body.userId });
    if (!userExist) return res.status(400).send("user does not exist..");

    const instalment = new Instalment({

        userId: req.body.userId,
        paymentDate: Date().now(),
        instalmentDate: Date.now(),
        instalmentAmount: req.body.instalmentAmount,
        paymentMethod: req.body.paymentMethod

    });
    const savedInstalment = await instalment.save();

    if (savedInstalment) {
        res.send({
            message: "instalment paid",
        });
    } else {
        res.status(401).send({ message: 'Invalid instalment Data.' });
    }
});

router.post('/totalInstalments', async (req, res) => {

    const userExist = await User.findOne({ _id: req.body.userId });
    if (!userExist) return res.status(400).json({ message: "user does not exist.." });

    const totalinstalment = await Instalment.find({ userId: req.body.userId });
    if (!totalinstalment) return res.status(400).send("No instalments paid..");

    let sum = 0;
    totalinstalment.forEach(instalmentAmount => {
        sum += Number(instalmentAmount['instalmentAmount']);
    });

    if (sum) return res.status(200).json({ total: sum });

    if (totalinstalment) {
        res.send({
            id: "saved available......",
        });
    } else {
        res.status(401).send({ message: 'Invalid instalment Data.' });
    }
});
export default router;

