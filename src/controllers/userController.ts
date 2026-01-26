import { Request, Response } from "express";
import { Op } from "sequelize";
import { validationResult } from "express-validator";

import { User } from "../models/User";
import { UserHelper } from "../util/userHelper";

export const getUsers = async (req: Request, res: Response) => {
    const query = (req.query.q as string) || "";

    try {
        const users = await User.findAll({
            where: query
                ? {
                    [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
                }
                : {},
            order: [["id", "ASC"]],
        });

        res.json({ success: true, users, query });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch users." });
    }
};
export const getUserById = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ success: false, error: "Invalid user id." });

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found." });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch user." });
    }
};
export const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { name, email } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }
    const userByEmail = await User.findOne({ where: { email } });
    if (userByEmail) return res.status(200).json({ success: true, error: "This email already exists" });

    const avatar = UserHelper.getInitial(name, email);
    const avatarColor = UserHelper.colorizeAvatar(avatar);

    try {
        const user = await User.create({ name, email, avatar, avatarColor });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to create user." });
    }
};
export const updateUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ success: false, error: "Invalid user id." });

    try {
        const errors = validationResult(req);
        const { name, email } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array()[0].msg });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found." });

        user.name = name;
        user.email = email;
        user.avatar = UserHelper.getInitial(name, email);
        user.avatarColor = UserHelper.colorizeAvatar(user.avatar);

        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update user." });
    }
};
export const deleteUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ success: false, error: "Invalid user id." });

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found." });

        await user.destroy();
        res.json({ success: true, id: userId });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete user." });
    }
};
