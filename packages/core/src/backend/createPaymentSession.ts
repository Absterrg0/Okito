import axios from 'axios';
import { PaymentInputSchema, PaymentInputSchemaType, PaymentSessionResponse, PaymentSessionResponseSchema } from '../types';
import { createIdempotencyKey } from '../helpers';


const BASE_OKITO_URL = process.env.ENVIRONMENT === 'production' ? 'https://okito.dev' : 'http://localhost:3000'



export async function createPaymentSession({products,apiKey,metadata}:PaymentInputSchemaType){

    const result = PaymentInputSchema.safeParse({products,apiKey,metadata})

    if(!result.success){
        throw new Error("Invalid input")
    }
    const idempotencyKey = createIdempotencyKey();
    

    const payload = {
        products,
        metadata
    }

    try{
        const session = await axios.post(`${BASE_OKITO_URL}/api/v1/payments`,payload,{
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

            // Check if the API returned an error in the response body
            if(sessionData.error !== null){
                throw new Error(sessionData.error);
            }

            return sessionData;
        } else {
            // Handle non-200 status codes
            const errorMessage = "Failed to create payment session";
            throw new Error(errorMessage);
        }

    } catch(error: any) {
        // Handle axios errors and API errors
        if (error.response) {
            // API returned an error response
            const errorMessage = error.response.data?.error || "Failed to create payment session";
            throw new Error(errorMessage);
        } else {
            // Network or other errors
            throw new Error("Failed to create payment session");
        }
    }
}