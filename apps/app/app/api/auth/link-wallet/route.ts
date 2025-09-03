import { NextRequest, NextResponse } from 'next/server'
import { verifySignature, generateNonce } from '@/lib/solanaUtils'
import prisma from '@/db'
import {auth} from '@/lib/auth'





export async function POST(req: NextRequest) {
  try {


    const userID = await auth.api.getSession({
        headers: req.headers,
      })
  
      if(!userID){
          return NextResponse.json({
              msg:"Unauthorized"
          },{
              status:403
          })
      }
  
  

    
    
      const { publicKey, signature, timestamp } = await req.json()
    if (!publicKey || typeof publicKey !== 'string') {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 })
    }

    if (!signature) {
      const currentTimestamp = Date.now()
      const message = generateNonce(publicKey, currentTimestamp)

      return NextResponse.json({
        message,
        publicKey,
        timestamp: currentTimestamp,
      })
    } else {
      if (!timestamp) {
        return NextResponse.json({ error: 'Timestamp is required for verification' }, { status: 400 })
      }

      const expectedMessage = generateNonce(publicKey, timestamp)

      let signatureArray: number[]
      if (Array.isArray(signature)) {
        signatureArray = signature
      } else if (typeof signature === 'object' && signature?.type === 'Buffer' && Array.isArray(signature?.data)) {
        signatureArray = signature.data
      } else if (typeof Uint8Array !== 'undefined' && signature instanceof Uint8Array) {
        signatureArray = Array.from(signature)
      } else {
        return NextResponse.json({ error: 'Invalid signature format' }, { status: 400 })
      }

      const isValid = verifySignature(publicKey, signatureArray, expectedMessage)

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
      }


      const user = await prisma.user.update({
        where:{
            id:userID.user.id
        },
        data:{
            walletAddress:publicKey,
            verifiedAt:new Date()
        },
      })



      return NextResponse.json({
        message: 'Wallet verified successfully successfully',
      })
    }
  } catch (error) {
    console.error('Wallet linking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
