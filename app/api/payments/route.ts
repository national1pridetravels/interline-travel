// app/api/payments/create/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR', bookingId } = await request.json()
    
    // Mock Stripe/Razorpay session
    const paymentSession = {
      id: `pay_${Date.now()}`,
      amount,
      currency,
      bookingId,
      status: 'requires_payment_method',
      url: 'https://checkout.stripe.com/pay/mock-session-id'
    }
    
    return NextResponse.json({ 
      success: true, 
      session: paymentSession 
    })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
