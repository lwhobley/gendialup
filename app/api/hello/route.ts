import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Gen Dial Up API is running',
    timestamp: new Date().toISOString(),
  })
}
