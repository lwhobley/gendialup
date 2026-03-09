import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Gen Dial Up API is running',
    timestamp: new Date().toISOString(),
  })
}
