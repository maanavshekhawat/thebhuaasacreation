// Logo Style Options for "THE BHUASA CREATION"
// Choose one of these styles and I'll implement it

export const LogoOption1 = () => (
  // Option 1: Minimalist with Icon (Like Zara style)
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-[#1a1a2e] rounded-sm"></div>
    <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a2e' }}>
      BHUASA
    </span>
  </div>
)

export const LogoOption2 = () => (
  // Option 2: Two-line Stacked (Elegant)
  <div className="flex flex-col">
    <span className="text-2xl font-bold leading-tight" style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a2e', letterSpacing: '2px' }}>
      BHUASA
    </span>
    <span className="text-xs font-light tracking-widest uppercase" style={{ color: '#6b7280', letterSpacing: '4px' }}>
      CREATION
    </span>
  </div>
)

export const LogoOption3 = () => (
  // Option 3: Gradient Text (Modern)
  <span 
    className="text-3xl font-bold tracking-tight"
    style={{ 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #4a5568 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}
  >
    BHUASA
  </span>
)

export const LogoOption4 = () => (
  // Option 4: With Decorative Line (Sophisticated)
  <div className="flex items-center space-x-3">
    <div className="w-12 h-0.5 bg-[#1a1a2e]"></div>
    <span className="text-2xl font-bold tracking-wider" style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a2e', letterSpacing: '3px' }}>
      BHUASA
    </span>
    <div className="w-12 h-0.5 bg-[#1a1a2e]"></div>
  </div>
)

export const LogoOption5 = () => (
  // Option 5: Compact with Accent (Like H&M style)
  <div className="flex items-baseline space-x-1">
    <span className="text-3xl font-bold" style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a2e' }}>
      B
    </span>
    <span className="text-2xl font-light" style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a2e' }}>
      HUAASA
    </span>
    <span className="text-xs font-light text-gray-500 ml-1">CREATION</span>
  </div>
)

export const LogoOption6 = () => (
  // Option 6: Full Name - Stylized (Current AJIO style but refined)
  <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.5px', color: '#1a1a2e' }}>
    THE BHUASA CREATION
  </span>
)

export const LogoOption7 = () => (
  // Option 7: Minimal with Dot Accent
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-[#1a1a2e] rounded-full"></div>
    <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Arial, sans-serif', color: '#1a1a2e' }}>
      BHUASA CREATION
    </span>
  </div>
)

export const LogoOption8 = () => (
  // Option 8: Bold & Modern (Like Nike style but text)
  <span 
    className="text-3xl font-black tracking-tighter"
    style={{ 
      fontFamily: 'Arial, sans-serif',
      color: '#000000',
      letterSpacing: '-1px'
    }}
  >
    BHUASA
  </span>
)

