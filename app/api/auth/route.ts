// app/api/auth/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Mock auth - replace with NextAuth/JWT
    if (email === 'admin@nationalpride.com' && password === 'admin123') {
      return NextResponse.json({ 
        success: true, 
        token: 'mock-jwt-token',
        user: { email, role: 'admin' }
      })
    }
    
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Auth failed' }, { status: 500 })
  }
}
