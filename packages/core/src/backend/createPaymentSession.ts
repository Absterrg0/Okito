import axios from 'axios';
import { PaymentInputSchema, PaymentInputSchemaType, PaymentSessionResponse, PaymentSessionResponseSchema } from '../types';
import { createIdempotencyKey } from '../helpers';



export async function createPaymentSession({amount,token,metadata,network,apiKey}:PaymentInputSchemaType){

    const result = PaymentInputSchema.safeParse({amount,token,metadata,network,apiKey})

    if(!result.success){
        throw new Error("Invalid input")
    }
    const idempotencyKey = createIdempotencyKey();

    const payload = {
        amount,
        token,
        metadata,
        network,
    }

    try{
        const session = await axios.post('http://localhost:3000/api/v1/payments',payload,{
            headers: {
                'Content-Type': 'application/json',
                'X-OKITO-KEY': apiKey,
                'Idempotency-Key': idempotencyKey,
            },
        })

        if(session.status === 200){
            // Validate the response structure
            const responseValidation = PaymentSessionResponseSchema.safeParse(session.data);
            
            if(!responseValidation.success){
                throw new Error("Invalid response format from payment API");
            }

            const sessionData: PaymentSessionResponse = responseValidation.data;
            return sessionData;
        } else {
            // Handle non-200 status codes
            const errorMessage = session.data?.msg || "Failed to create payment session";
            throw new Error(errorMessage);
        }

    } catch(error: any) {
        // Handle axios errors and API errors
        if (error.response) {
            // API returned an error response
            const errorMessage = error.response.data?.msg || "Failed to create payment session";
            throw new Error(errorMessage);
        } else {
            // Network or other errors
            throw new Error("Failed to create payment session");
        }
    }
}