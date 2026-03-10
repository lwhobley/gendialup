'use client'

import SignupForm from '@/app/components/SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 90s Collage Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/90s-collage.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* White Overlay */}
      <div className="absolute inset-0 z-0 bg-white/70" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <SignupForm />
      </div>
    </div>
  )
}
