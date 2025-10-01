import { metadata } from '@/app/layout';
import {z} from 'zod';
import { paymentSchema } from './payment';




export const productSchema = z.object({
    id:z.string(),
    name:z.string(),
    price:z.bigint(),
    createdAt:z.date(),
    updatedAt:z.date(),
    metadata:z.any(),
    paymentId:z.string(),
    payment:paymentSchema
})