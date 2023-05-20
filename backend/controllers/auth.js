import { comparePassword, hashPassword } from '../helpers/auth.js'
import userModel from '../models/user.js'
import orderModel from '../models/order.js'
import JWT from 'jsonwebtoken'
import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'zanitroy567.ss@gmail.com',
        pass: 'hvmtlafhotgajbjo'
    }
});
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, question } = req.body
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }
        if (!question) {
            return res.send({ message: 'Question is required' })
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered Please Login'
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, question }).save()
        res.status(200).send({
            success: true,
            message: 'User Registered Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            error
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password',
            })
        }
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error,
        })
    }
}

export const testController = (req, res) => {
    try {
        res.send('Protected Route')
    } catch (error) {
        console.log(error)
        res.send({ error })
    }
}
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }
        if (!question) {
            res.status(400).send({ message: 'Question is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'New Password is required' })
        }
        const user = await userModel.findOne({ email, question })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong email or question'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const user = await userModel.findById(req.params._id)
        if (!password && password.length < 6) {
            return res.json({ error: 'Password is required and 6 character long' })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Updated user successfully',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error while update profile',
            error
        })
    }
}

export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting orders',
            error
        })
    }
}

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting orders',
            error
        })
    }
}

export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while updating orders',
            error
        })
    }
}

export const contactusEmail = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body
        console.log(req.body)
        if (name && email) {
            const body = `name: ${name} /n email:${email} /n phone:${phone} /n subject:${subject} /n message:${message}`
            const htmlBody = `<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong> ${message}</p>`;

            var mailOptions = {
                from: 'zanitroy567.ss@gmail.com',
                to: "zanitroy567.ss@gmail.com",
                subject: "Contact Us Query",
                html: htmlBody
                // text: body
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.status(500).send({ success: false, message: "Unexpected error occur" })
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).send({ success: true, message: "Query has been recieved" })
                }
            });

            // return res.status(500).send({ success: true, message: "Query has been recieved" })
        } else {
            res.status(500).send({ success: false, message: "Unexpected error occur" })
        }

    }
    catch (error) {
        res.status(500).send({ success: false, message: "Unexpected error occur" })
    }
}