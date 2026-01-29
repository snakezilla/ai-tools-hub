import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Practical Library - AI Tools for Everyone'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a3a5c 0%, #0f2a42 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Book icon placeholder */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '40px',
          }}
        >
          <div style={{ width: '40px', height: '120px', background: '#5b9bd5', borderRadius: '4px', transform: 'rotate(-12deg)' }} />
          <div style={{ width: '50px', height: '140px', background: '#7ab8e8', borderRadius: '4px', transform: 'rotate(-2deg)' }} />
          <div style={{ width: '40px', height: '120px', background: '#5b9bd5', borderRadius: '4px', transform: 'rotate(8deg)' }} />
        </div>
        
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: 'white',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Practical Library
        </div>
        
        <div
          style={{
            fontSize: 32,
            color: '#a8d4ff',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          If you can send an email, you can use AI.
        </div>
        
        <div
          style={{
            fontSize: 24,
            color: '#6b9bc3',
            marginTop: '30px',
          }}
        >
          practicallibrary.com
        </div>
      </div>
    ),
    { ...size }
  )
}
