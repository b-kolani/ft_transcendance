const bcrypt = require('bcrypt');
const prisma = require('./src/config/db.js');
require('dotenv').config();

async function seed() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        const adminExists = await prisma.user.findUnique({
            where: { email: adminEmail }
        });

        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            await prisma.user.create({
                data: {
                    username: process.env.ADMIN_USERNAME,
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'admin'
                }
            });

            // console.log('Admin account created successfully from .env settings!');
        } else {
            // console.log('Admin account already exists');
        }
    } catch (error) {
        console.error('Seed error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();