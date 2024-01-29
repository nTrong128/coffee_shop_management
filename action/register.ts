"use server";
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error: "Thông tin đăng nhâp không hợp lệ."}
    }

    const { email, password, name } = validatedFields.data;
    const hasedPassword = await bcrypt.hash(password, 10); 
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return {error: "Email đã được sử dụng."}
    }

    await prisma.user.create({
        data: {
            name,
            email, // TODO: Change this to a real email
            password: hasedPassword,    
        }
    });

    // TODO: Send email to user
    return {success: "Đăng ký thành công."}
}