'use client'
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cream to-warm-gray/15 flex flex-col justify-between px-5 py-12">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Gen Dial Up</h1>
        <p className="text-xl text-light-text mb-12 max-w-md">Find your people. Locally.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-2xl w-full">
          {[{ icon: '✓', label: 'Quality Matches' }, { icon: '🔒', label: 'Verified Users' }].map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="text-sm font-medium text-light-text">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
