import {z} from 'zod';

const productosc = z.object({
    nombre: z.string().min(1, 'El nombre es requerido').max(255),
    precio: z.number().positive('El precio debe ser positivo'),
    imagen: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
    descripcion: z.string().optional(),
    stock: z.boolean().optional(),
    cantidad_stock: z.number().int().nonnegative().optional(),
    categorias: z.array(z.number().int().positive()).optional()
});

const productosu = z.object({
  id: z.number().int().positive(),
    nombre: z.string().min(1, 'Pone el Nombre').max(255).optional(),
    precio: z.number().positive('El precio va positivo ').optional(),
    imagen: z.string().url('Usar url Valida').optional().or(z.literal('')),
    descripcion: z.string().optional(),
    stock: z.boolean().optional(),
    cantidad_stock: z.number().int().nonnegative().optional(),
    categorias: z.array(z.number().int().positive()).optional()
});

export { productosc, productosu };