import { Request, Response } from 'express'
import { prisma } from '../server'
import { AuthRequest } from '../middlewares/auth.middleware'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body

    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json({
          error: 'Todos los campos son obligatorios (incluyendo teléfono)',
        })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'El correo ingresado ya está en uso' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, phone, password: hashedPassword },
    })

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' },
    )

    res
      .status(201)
      .json({
        message: 'Usuario registrado exitosamente',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
  } catch (error) {
    console.error('❌ Error en Register:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' },
    )

    res
      .status(200)
      .json({
        message: 'Inicio de sesión exitoso',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
  } catch (error) {
    console.error('❌ Error en Login:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const validateUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(400).json({ error: 'ID de usuario no proporcionado' })
        }
        const user = await prisma.user.findUnique({ where: { id: userId }, select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        } })
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }
        return res.status(200).json({ user })
    } catch (error) {
        console.error('❌ Error en Validate User:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
