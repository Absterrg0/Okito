import {z} from 'zod'



export const metadataSchema = z.record(
    z.string().min(1).max(100),
    z.any()
).refine(
    (obj)=>JSON.stringify(obj).length <=10000,
    {
        error:"Metadata too large(max 10kB)"
    }
)

export const inputSchema = z.object({
    products: z.array(z.object({
        id: z.string().min(1).max(255),
        name: z.string().min(1).max(500),
        price: z.number().gt(0).lt(1_000_000),
        metadata: metadataSchema.optional(),
    })).min(1,{error:"Product must be atleast 1 item"})
    .max(100,{error:"There can not be more than 100 products"}),
    metadata: metadataSchema.optional(),
})