import Effects from "./Effects";

export default function Home() {
  return (
    <>
      <Effects />

      {/* Floating Pill Navigation */}
      <nav className="fixed [animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll md:left-0 md:right-0 md:mx-auto z-50 bg-white/72 max-w-4xl rounded-full mr-auto ml-auto top-6 right-4 left-4 shadow-[0_8px_30px_-12px_rgba(20,19,43,0.12)] backdrop-blur-xl animate" style={{ ['--border-gradient' as any]: 'linear-gradient(180deg, #ECEBF3, #ECEBF3, #ECEBF3)', ['--border-radius-before' as any]: '9999px' }}>
          <div className="flex h-14 pr-4 pl-4 items-center justify-between">
              <div className="flex items-center gap-2.5">
                  <img src="/assets/paypoint-icon.png" alt="Paypoint" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-semibold tracking-tight text-[#14132B] font-sans">Paypoint</span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                  <a href="#how-it-works" className="text-xs font-medium text-[#33323F] hover:text-[#14132B] transition-colors font-sans">How it
                      works</a>
                  <a href="#features" className="text-xs font-medium text-[#33323F] hover:text-[#14132B] transition-colors font-sans">Features</a>
              </div>

              <div className="flex items-center gap-4">
                  <a href="#" className="hidden md:inline-block text-xs font-medium text-[#33323F] px-3.5 py-2 rounded-full transition-all duration-200 hover:text-[#5F58F4] hover:bg-[#EEEDFE] hover:-translate-y-0.5 font-sans">Log in</a>
                  <button className="group inline-flex overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(95,88,244,0.35)] rounded-full pt-[1px] pr-[1px] pb-[1px] pl-[1px] relative items-center justify-center">
                      {/* Spinning Border Beam (Visible on Hover) */}
                      <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#ffffff_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>

                      {/* Default Static Border */}
                      <span className="absolute inset-0 rounded-full bg-[#5F58F4] transition-opacity duration-300 group-hover:opacity-0"></span>

                      {/* 3D Button Surface & Content */}
                      <span className="flex items-center justify-center gap-2 uppercase transition-colors duration-300 group-hover:text-white text-xs font-medium text-white tracking-widest bg-gradient-to-b from-[#6F68FF] to-[#5F58F4] w-full h-full rounded-full pt-2.5 pr-6 pb-2.5 pl-6 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                          <span className="z-10 relative">Get Started</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                              <path d="M5 12h14" className="" />
                              <path d="m12 5 7 7-7 7" className="" />
                          </svg>
                      </span>
                  </button>
              </div>
          </div>
      </nav>

      {/* Hero Section */}
      <main className="lg:pt-48 pt-36 relative">

          {/* Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
              <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-[#5F58F4]/15 rounded-full blur-[120px] opacity-40">
              </div>
              <div className="absolute top-40 left-10 w-[400px] h-[400px] bg-[#5F58F4]/10 rounded-full blur-[100px] opacity-30">
              </div>
          </div>

          <div className="grid lg:grid-cols-2 z-10 max-w-6xl mr-auto mb-24 ml-auto pr-6 pl-6 relative gap-x-20 gap-y-20 items-center">

              {/* Left Column: Copy */}
              <div className="max-w-2xl">

                  <h1 className="leading-[1.05] lg:text-8xl text-6xl font-medium text-[#14132B] tracking-tighter mb-8">
                      <span className="inline-block [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate font-sans font-semibold">Get</span>
                      <span className="inline-block [animation:fadeSlideIn_0.8s_ease-out_0.3s_both] animate-on-scroll animate font-sans font-semibold">paid
                          with</span>

                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#5F58F4] via-sky-300 to-indigo-400 [animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate font-sans font-semibold">one</span>
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#5F58F4] via-sky-300 to-indigo-400 [animation:fadeSlideIn_0.8s_ease-out_0.5s_both] animate-on-scroll animate font-sans font-semibold">link.</span>
                  </h1>

                  <p className="lg:text-2xl leading-relaxed [animation:fadeSlideIn_0.8s_ease-out_0.6s_both] animate-on-scroll animate text-xl font-semibold text-[#33323F] max-w-lg mb-12">
                      Turn any product or service into a beautiful payment page. Share it on WhatsApp, Instagram, TikTok,
                      or anywhere your customers are. Get paid directly into your bank account. No website. No code. No
                      complicated setup.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 [animation:fadeSlideIn_0.8s_ease-out_0.7s_both] animate-on-scroll animate mb-16 gap-x-6 gap-y-6 items-center">

                      {/* Animated Gradient Start Free Button */}
                      <button className="group inline-flex overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(95,88,244,0.5)] focus:outline-none sm:w-auto text-sm font-medium text-white w-full h-[54px] rounded-full pt-4 pr-8 pb-4 pl-8 relative items-center justify-center" style={{ position: 'relative', ['--border-gradient' as any]: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2))', ['--border-radius-before' as any]: '9999px' }}>

                          {/* Full Border Beam (White-on-indigo Line) */}
                          <div className="absolute inset-0 -z-20 rounded-full overflow-hidden p-[1px]">
                              <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#ffffff_360deg)]" style={{ animation: 'beam-spin 3s linear infinite' }}></div>
                              <div className="absolute inset-[1px] rounded-full bg-[#5F58F4]"></div>
                          </div>

                          {/* Inner Background & Effects */}
                          <div className="overflow-hidden bg-[#5F58F4] rounded-full absolute top-[2px] right-[2px] bottom-[2px] left-[2px]">
                              {/* Gradient Background */}
                              <div className="bg-gradient-to-b from-[#6F68FF] to-[#5F58F4] absolute top-0 right-0 bottom-0 left-0">
                              </div>

                              {/* Vertical Lines Animation (Smaller & Monotone) */}
                              <div className="opacity-[0.07] mix-blend-plus-lighter absolute top-0 right-0 bottom-0 left-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 8px)', backgroundSize: '24px 100%', animation: 'lines-slide 1.5s linear infinite', position: 'relative', ['--border-gradient' as any]: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))' }}>
                              </div>

                              {/* Blue Glow on Hover */}
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-blue-500/20 blur-2xl rounded-full pointer-events-none transition-colors duration-500 group-hover:bg-blue-500/40">
                              </div>
                          </div>

                          {/* Content */}
                          <span className="transition-colors group-hover:text-white uppercase font-semibold text-white/90 tracking-tight z-10 relative">Start
                              free</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right relative z-10 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                              <path d="M5 12h14" className="" />
                              <path d="m12 5 7 7-7 7" className="" />
                          </svg>
                      </button>

                      {/* Play CTA Button with Gradient Hover */}
                      <div className="inline-block group relative w-full sm:w-auto text-center sm:text-left">
                          <button className="group inline-flex min-w-[140px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-[#5F58F4] text-sm font-medium text-[#14132B] tracking-tight bg-white border border-[#ECEBF3] h-[54px] rounded-full pt-3 pr-6 pb-3 pl-6 relative backdrop-blur-xl gap-x-2 gap-y-2 items-center justify-center shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ color: 'rgb(95, 88, 244)', width: '20px', height: '20px' }} className="lucide lucide-play-circle w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" data-solar="play-circle-bold-duotone" data-icon-set="solar" data-icon-replaced="true" strokeWidth="2">
                                  <path fill="#5F58F4" fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clipRule="evenodd" opacity=".5" className="" />
                                  <path fill="#5F58F4" d="m15.414 13.059l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059l4.72 2.787c.781.462.781 1.656 0 2.118" />

                              </svg>
                              <span className="uppercase text-sm relative">See how it works</span>
                              <span aria-hidden="true" className="transition-all duration-300 group-hover:opacity-80 opacity-20 w-[70%] h-[1px] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2" style={{ background: 'linear-gradient(90deg,rgba(95,88,244,0) 0%,rgba(95,88,244,1) 50%,rgba(95,88,244,0) 100%)' }}></span>
                          </button>
                          <span className="pointer-events-none absolute -bottom-3 left-1/2 z-0 h-6 w-44 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" style={{ background: 'radial-gradient(60% 100% at 50% 50%, rgba(95,88,244,.55), rgba(95,88,244,.28) 35%, transparent 70%)', filter: 'blur(10px) saturate(120%)' }} aria-hidden="true"></span>
                      </div>
                  </div>

                  <div className="[animation:fadeSlideIn_0.8s_ease-out_0.8s_both] animate-on-scroll animate border-[#ECEBF3] border-t pt-8">
                      <p className="text-[10px] font-semibold tracking-widest text-[#9A99A8] mb-6 uppercase font-sans">
                          Trusted, secure payments</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-3 opacity-90 hover:opacity-100 transition-all duration-500 text-[#33323F]">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium font-sans">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock text-[#7A74F6]">
                                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                              Secure Checkout
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium font-sans">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt text-[#7A74F6]">
                                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />

                                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                  <path d="M12 17.5v-11" />
                              </svg>
                              Instant Receipts
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium font-sans">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-[#7A74F6]">
                                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />

                                  <path d="m9 12 2 2 4-4" />
                              </svg>
                              Bank-Grade Security
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium font-sans">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark text-[#7A74F6]">
                                  <line x1="3" x2="21" y1="22" y2="22" />
                                  <line x1="6" x2="6" y1="18" y2="11" />
                                  <line x1="10" x2="10" y1="18" y2="11" />
                                  <line x1="14" x2="14" y1="18" y2="11" />
                                  <line x1="18" x2="18" y1="18" y2="11" />
                                  <polygon points="12 2 20 7 4 7" />
                              </svg>
                              Funds Settle Directly To Your Bank
                          </span>
                          {/* removed third-party logos */}
                      </div>
                  </div>
              </div>

              {/* Right Column: The Mockup */}
              <div className="flex lg:justify-end relative justify-center [animation:fadeSlideIn_0.8s_ease-out_0.7s_both] animate-on-scroll animate">

                  {/* Phone Frame */}
                  <div className="border-[8px] overflow-hidden z-20 flex flex-col bg-[#0A0A0A] w-[340px] h-[680px] border-[#1A1A1A] ring-white/10 ring-1 rounded-[50px] relative shadow-2xl">

                      {/* Dynamic Island */}
                      <div className="absolute top-0 w-full h-8 z-50 flex justify-center pt-2.5 pointer-events-none">
                          <div className="w-28 h-7 bg-black rounded-full relative flex items-center justify-end px-3 gap-2 z-50">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
                          </div>
                      </div>

                      {/* Screen Content (Scrollable) */}
                      <div className="w-full flex-1 bg-[#FAFAFE] flex flex-col relative overflow-y-auto no-scrollbar font-sans pb-20">

                          {/* App Header */}
                          <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md pt-14 pb-4 px-5 border-b border-[#ECEBF3] flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                  <div className="bg-[#EEEDFE] w-10 h-10 rounded-full px-0.5 py-0.5">
                                      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/63742d70-5f5b-4f91-bcd7-d6e4040161a3_320w.webp" alt="User" className="bg-white w-full h-full object-cover rounded-full" />
                                  </div>
                                  <div className="">
                                      <p className="text-[10px] text-[#9A99A8] uppercase tracking-wider font-semibold">Welcome
                                          back</p>
                                      <p className="text-sm font-bold text-[#14132B]">Adaeze</p>
                                  </div>
                              </div>
                              <button className="w-10 h-10 rounded-full bg-[#FAFAFE] border border-[#ECEBF3] flex items-center justify-center text-[#33323F] hover:bg-[#EEEDFE] transition-colors relative">
                                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:bell-bing-bold-duotone">
                                      <path fill="currentColor" d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7" opacity=".5" />
                                      <path fill="currentColor" d="M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0" />

                                  </svg>
                                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                              </button>
                          </div>

                          {/* Scrollable Body Content */}
                          <div className="px-5 pt-6 space-y-6">

                              {/* Main Card (Total Collected) */}
                              <div className="overflow-hidden group bg-[#5F58F4] w-full bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/88535185-ff8d-4faa-b0f0-816876a8ba7a_800w.webp)] bg-cover bg-center rounded-[32px] pt-6 pr-6 pb-6 pl-6 relative shadow-[0_10px_40px_-10px_rgba(95,88,244,0.3)]" style={{ position: 'relative', ['--border-gradient' as any]: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))', ['--border-radius-before' as any]: '32px' }}>
                                  {/* Decorative Background Elements */}
                                  <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-3xl">
                                  </div>
                                  <div className="-left-10 bg-blue-500/20 w-32 h-32 rounded-full absolute bottom-0 blur-2xl">
                                  </div>

                                  <div className="relative z-20 flex justify-between items-start">
                                      <div className="">
                                          <div className="inline-flex bg-slate-50/10 rounded-full mb-2 px-2.5 py-1 backdrop-blur-sm gap-x-1.5 gap-y-1.5 items-center">
                                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:shield-check-bold-duotone" className="w-[16px] h-[16px] text-slate-50" strokeWidth="2" data-icon-replaced="true" style={{ width: '16px', height: '16px' }}>
                                                  <path fill="currentColor" d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082" opacity=".5" className="" />
                                                  <path fill="currentColor" d="M15.06 10.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z" />

                                              </svg>
                                              <span className="text-[10px] uppercase font-bold text-slate-50 tracking-wide">Total
                                                  collected</span>
                                          </div>
                                          <h2 className="text-4xl font-bold text-slate-50 tracking-tighter">₦1,240,000</h2>
                                      </div>
                                      <div className="flex text-black bg-slate-950/20 w-10 h-10 rounded-full backdrop-blur-md items-center justify-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:graph-up-bold-duotone" className="w-[16px] h-[16px] text-slate-50" strokeWidth="2" data-icon-replaced="true" style={{ width: '16px', height: '16px' }}>
                                              <path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5" className="" />
                                              <path fill="currentColor" d="M14.5 10.75a.75.75 0 0 1 0-1.5H17a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-2.013 2.013a1.75 1.75 0 0 1-2.474 0l-1.586-1.586a.25.25 0 0 0-.354 0L7.53 14.53a.75.75 0 0 1-1.06-1.06l2.293-2.293a1.75 1.75 0 0 1 2.474 0l1.586 1.586a.25.25 0 0 0 .354 0l2.012-2.013z" />

                                          </svg>
                                      </div>
                                  </div>

                                  <div className="relative z-20 mt-6">
                                      {/* Custom Sparkline SVG */}
                                      <svg className="w-[236px] h-[48px] text-slate-50" viewBox="0 0 100 30" preserveAspectRatio="none" strokeWidth="2" data-icon-replaced="true" style={{ width: '236px', height: '48px' }}>
                                          <path d="M0,25 C10,25 10,10 20,15 C30,20 30,5 40,10 C50,15 50,25 60,20 C70,15 70,5 80,10 C90,15 90,0 100,5" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" className="" />
                                      </svg>
                                      <div className="flex justify-between items-center mt-2">
                                          <p className="text-[11px] font-bold text-slate-50/70">42 payments this month</p>
                                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:alt-arrow-right-bold-duotone">
                                              <path fill="currentColor" d="m12.404 8.303l3.431 3.327c.22.213.22.527 0 .74l-6.63 6.43C8.79 19.201 8 18.958 8 18.43v-5.723z" />

                                              <path fill="currentColor" d="M8 11.293V5.57c0-.528.79-.771 1.205-.37l2.481 2.406z" opacity=".5" />

                                          </svg>
                                      </div>
                                  </div>
                              </div>

                              {/* Quick Actions */}
                              <div className="">
                                  <h3 className="text-xs font-semibold text-[#9A99A8] uppercase tracking-wider mb-3 px-1">
                                      Quick Actions</h3>
                                  <div className="grid grid-cols-4 gap-2">
                                      <button className="flex flex-col items-center gap-2 group">
                                          <div className="w-14 h-14 rounded-[20px] bg-white border border-[#ECEBF3] flex items-center justify-center text-[#5F58F4] group-hover:bg-[#5F58F4] group-hover:text-white transition-all duration-300 shadow-sm">
                                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:card-transfer-bold-duotone">
                                                  <path fill="currentColor" d="m22 12.818l-.409-.409a2.25 2.25 0 0 0-3.182 0l-.801.801a2.251 2.251 0 0 0-4.358.79v1.764a2.25 2.25 0 0 0-1.341 3.827l.409.409H10c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12c0-.442.002-1.608.004-2H22c.002.392 0 1.558 0 2z" opacity=".5" />
                                                  <path fill="currentColor" d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4m9.475 9.47a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-.72-.72V20a.75.75 0 0 1-1.5 0v-4.19l-.72.72a.75.75 0 1 1-1.06-1.06z" />

                                                  <path fill="currentColor" fillRule="evenodd" d="M15.5 13.25a.75.75 0 0 1 .75.75v4.19l.72-.72a.75.75 0 1 1 1.06 1.06l-2 2a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l.72.72V14a.75.75 0 0 1 .75-.75" clipRule="evenodd" />
                                              </svg>
                                          </div>
                                          <span className="text-[10px] font-medium text-[#33323F] group-hover:text-[#14132B] transition-colors">New
                                              Page</span>
                                      </button>
                                      <button className="flex flex-col items-center gap-2 group">
                                          <div className="w-14 h-14 rounded-[20px] bg-white border border-[#ECEBF3] flex items-center justify-center text-[#5F58F4] group-hover:bg-[#5F58F4] group-hover:text-white transition-all duration-300 shadow-sm">
                                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:wallet-money-bold-duotone">
                                                  <path fill="currentColor" d="M4.892 9.614c0-.402.323-.728.722-.728H9.47c.4 0 .723.326.723.728a.726.726 0 0 1-.723.729H5.614a.726.726 0 0 1-.722-.729" />

                                                  <path fill="currentColor" fillRule="evenodd" d="M21.188 10.004q-.094-.005-.2-.004h-2.773C15.944 10 14 11.736 14 14s1.944 4 4.215 4h2.773q.106.001.2-.004c.923-.056 1.739-.757 1.808-1.737c.004-.064.004-.133.004-.197v-4.124c0-.064 0-.133-.004-.197c-.069-.98-.885-1.68-1.808-1.737m-3.217 5.063c.584 0 1.058-.478 1.058-1.067c0-.59-.474-1.067-1.058-1.067s-1.06.478-1.06 1.067c0 .59.475 1.067 1.06 1.067" clipRule="evenodd" />
                                                  <path fill="currentColor" d="M21.14 10.002c0-1.181-.044-2.448-.798-3.355a4 4 0 0 0-.233-.256c-.749-.748-1.698-1.08-2.87-1.238C16.099 5 14.644 5 12.806 5h-2.112C8.856 5 7.4 5 6.26 5.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87C2 10.401 2 11.856 2 13.694v.112c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.749.748 1.698 1.08 2.87 1.238c1.14.153 2.595.153 4.433.153h2.112c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238q.305-.308.526-.66c.45-.72.504-1.602.504-2.45l-.15.001h-2.774C15.944 18 14 16.264 14 14s1.944-4 4.215-4h2.773q.079 0 .151.002" opacity=".5" />
                                                  <path fill="currentColor" d="M10.101 2.572L8 3.992l-1.733 1.16C7.405 5 8.859 5 10.694 5h2.112c1.838 0 3.294 0 4.433.153q.344.045.662.114L16 4l-2.113-1.428a3.42 3.42 0 0 0-3.786 0" />

                                              </svg>
                                          </div>
                                          <span className="text-[10px] font-medium text-[#33323F] group-hover:text-[#14132B] transition-colors">Share
                                              Link</span>
                                      </button>
                                      <button className="flex flex-col items-center gap-2 group">
                                          <div className="w-14 h-14 rounded-[20px] bg-white border border-[#ECEBF3] flex items-center justify-center text-[#5F58F4] group-hover:bg-[#5F58F4] group-hover:text-white transition-all duration-300 shadow-sm">
                                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:qr-code-bold-duotone" className="">
                                                  <path fill="currentColor" d="M10.553 13.447c-.424-.424-.95-.596-1.535-.675c-.553-.074-1.25-.074-2.086-.074H5.827c-.58 0-1.065 0-1.459.037c-.411.04-.795.124-1.146.34c-.345.21-.634.5-.845.844c-.216.352-.3.735-.34 1.147C2 15.459 2 15.944 2 16.525v.068c0 .884 0 1.597.055 2.17c.056.592.175 1.108.459 1.571c.288.47.682.864 1.152 1.152c.463.284.979.403 1.57.46C5.81 22 6.524 22 7.407 22h.07c.58 0 1.064 0 1.458-.037c.412-.04.795-.124 1.147-.34c.344-.21.633-.5.844-.844c.216-.352.3-.736.34-1.147c.037-.394.037-.879.037-1.46v-1.104c0-.836 0-1.533-.074-2.086c-.079-.584-.251-1.111-.675-1.535m-1.62-11.41c.412.04.795.124 1.147.34c.344.21.633.5.844.845c.216.351.3.735.34 1.146c.037.394.037.879.037 1.46v1.104c0 .836 0 1.533-.074 2.086c-.079.584-.251 1.111-.675 1.535s-.95.596-1.535.675c-.553.074-1.25.074-2.086.074H5.827c-.58 0-1.065 0-1.459-.037c-.411-.04-.795-.124-1.146-.34a2.56 2.56 0 0 1-.845-.844c-.216-.352-.3-.735-.34-1.147C2 8.54 2 8.056 2 7.475v-.068c0-.884 0-1.597.055-2.17c.056-.592.175-1.108.459-1.571c.288-.47.682-.864 1.152-1.152c.463-.284.979-.403 1.57-.46C5.81 2 6.524 2 7.407 2h.07c.58 0 1.064 0 1.458.037M16.593 2h-.068c-.58 0-1.065 0-1.46.037c-.41.04-.794.124-1.146.34c-.344.21-.633.5-.844.845c-.216.351-.3.735-.34 1.146c-.037.394-.037.879-.037 1.46v1.104c0 .836 0 1.533.074 2.086c.079.584.251 1.111.675 1.535s.95.596 1.535.675c.553.074 1.25.074 2.086.074h1.105c.58 0 1.065 0 1.459-.037c.411-.04.795-.124 1.146-.34c.345-.21.634-.5.845-.844c.216-.352.3-.735.34-1.147C22 8.54 22 8.056 22 7.475v-.068c0-.884 0-1.597-.055-2.17c-.056-.592-.175-1.108-.459-1.571a3.5 3.5 0 0 0-1.152-1.152c-.463-.284-.979-.403-1.57-.46C18.19 2 17.477 2 16.594 2" opacity=".5" />
                                                  <path fill="currentColor" d="M14.093 21.302a.698.698 0 1 1-1.396 0v-2.79h1.396z" opacity=".4" />

                                                  <path fill="currentColor" d="M21.302 12.698a.7.7 0 0 0-.697.697v3.256H22v-3.256a.7.7 0 0 0-.698-.697" opacity=".5" />
                                                  <path fill="currentColor" d="M16.076 16.617c-.076.184-.076.417-.076.883s0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883s0-.699-.076-.883a1 1 0 0 0-.541-.54C18.199 16 17.966 16 17.5 16s-.699 0-.883.076a1 1 0 0 0-.54.541" />

                                                  <path fill="currentColor" d="M22 18.535v-.023h-1.396c0 .443 0 .74-.016.97c-.015.224-.043.333-.073.405a1.16 1.16 0 0 1-.629.63c-.072.029-.18.056-.405.072c-.23.015-.527.016-.97.016h-1.86V22h1.883c.414 0 .759 0 1.042-.02a2.6 2.6 0 0 0 .844-.175a2.56 2.56 0 0 0 1.384-1.384c.112-.27.156-.549.176-.844c.02-.283.02-.628.02-1.042" opacity=".7" />
                                                  <path fill="currentColor" d="M12.697 16.616v.035h1.396c0-.668 0-1.116.035-1.458c.034-.33.093-.482.16-.583a1.2 1.2 0 0 1 .321-.32c.101-.068.254-.128.584-.161c.342-.035.79-.036 1.458-.036h1.86v-1.395h-1.896c-.623 0-1.142 0-1.563.043c-.44.044-.85.142-1.218.388c-.28.187-.519.426-.706.706c-.246.368-.343.777-.388 1.217c-.043.421-.043.94-.043 1.564" opacity=".6" />
                                                  <path fill="currentColor" d="M5.508 18.69c.219.155.528.155 1.146.155c.619 0 .928 0 1.146-.155a.8.8 0 0 0 .2-.199c.154-.218.154-.527.154-1.146s0-.927-.155-1.146A.8.8 0 0 0 7.8 16c-.218-.155-.527-.155-1.146-.155s-.927 0-1.146.155a.8.8 0 0 0-.199.2c-.155.218-.155.527-.155 1.145c0 .619 0 .928.155 1.146a.8.8 0 0 0 .2.2M6.654 8.155c-.618 0-.927 0-1.146-.155a.8.8 0 0 1-.199-.2c-.155-.217-.155-.527-.155-1.145c0-.619 0-.928.155-1.146a.8.8 0 0 1 .2-.2c.218-.154.527-.154 1.145-.154c.619 0 .928 0 1.146.155a.8.8 0 0 1 .2.199c.154.218.154.527.154 1.146s0 .928-.155 1.146A.8.8 0 0 1 7.8 8c-.218.155-.527.155-1.146.155M16.2 8c.218.155.527.155 1.146.155s.927 0 1.146-.155a.8.8 0 0 0 .199-.199c.155-.218.155-.528.155-1.146c0-.619 0-.928-.155-1.146a.8.8 0 0 0-.2-.2c-.218-.154-.527-.154-1.145-.154c-.619 0-.928 0-1.146.155a.8.8 0 0 0-.2.199c-.154.218-.154.527-.154 1.146s0 .928.155 1.146A.8.8 0 0 0 16.2 8" />

                                              </svg>
                                          </div>
                                          <span className="text-[10px] font-medium text-[#33323F] group-hover:text-[#14132B] transition-colors">View
                                              Payments</span>
                                      </button>
                                      <button className="flex flex-col items-center gap-2 group">
                                          <div className="w-14 h-14 rounded-[20px] bg-white border border-[#ECEBF3] flex items-center justify-center text-[#5F58F4] group-hover:bg-[#5F58F4] group-hover:text-white transition-all duration-300 shadow-sm">
                                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:menu-dots-bold-duotone" className="">
                                                  <path fill="currentColor" d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" className="" />
                                                  <path fill="currentColor" d="M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0" opacity=".5" />
                                              </svg>
                                          </div>
                                          <span className="text-[10px] font-medium text-[#33323F] group-hover:text-[#14132B] transition-colors">More</span>
                                      </button>
                                  </div>
                              </div>

                              {/* Weekly Spending */}
                              <div className="bg-white rounded-[24px] p-5 border border-[#ECEBF3] shadow-sm">
                                  <div className="flex items-center justify-between mb-4">
                                      <h3 className="text-xs font-semibold text-[#33323F]">This week</h3>
                                      <span className="text-[10px] text-[#5F58F4] font-bold bg-[#EEEDFE] px-2 py-1 rounded-md">₦320,000</span>
                                  </div>
                                  <div className="flex items-end justify-between h-24 gap-2">
                                      <div className="w-full bg-[#EEEDFE] rounded-t-sm h-[40%] relative group cursor-pointer hover:bg-[#DEDCFB] transition-all">
                                      </div>
                                      <div className="w-full bg-[#EEEDFE] rounded-t-sm h-[60%] relative group cursor-pointer hover:bg-[#DEDCFB] transition-all">
                                      </div>
                                      <div className="w-full bg-[#5F58F4] rounded-t-sm h-[85%] relative"></div>
                                      <div className="w-full bg-[#EEEDFE] rounded-t-sm h-[50%] relative group cursor-pointer hover:bg-[#DEDCFB] transition-all">
                                      </div>
                                      <div className="w-full bg-[#EEEDFE] rounded-t-sm h-[30%] relative group cursor-pointer hover:bg-[#DEDCFB] transition-all">
                                      </div>
                                      <div className="w-full bg-[#EEEDFE] rounded-t-sm h-[75%] relative group cursor-pointer hover:bg-[#DEDCFB] transition-all">
                                      </div>
                                      <div className="w-full bg-[#EEEDFE] rounded-t-sm h-[45%] relative group cursor-pointer hover:bg-[#DEDCFB] transition-all">
                                      </div>
                                  </div>
                                  <div className="flex justify-between mt-2 text-[10px] text-[#9A99A8] font-medium">
                                      <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                                  </div>
                              </div>

                              {/* Transactions List */}
                              <div className="">
                                  <div className="flex items-center justify-between mb-3 px-1">
                                      <h3 className="text-xs font-semibold text-[#9A99A8] uppercase tracking-wider">Recent
                                          Activity</h3>
                                      <button className="text-[10px] text-[#5F58F4] font-bold">View All</button>
                                  </div>
                                  <div className="flex flex-col gap-3">
                                      {/* Item 1 */}
                                      <div className="flex items-center justify-between p-3 bg-white border border-[#ECEBF3] rounded-[20px] hover:bg-[#FAFAFE] transition-colors cursor-pointer group shadow-sm">
                                          <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:bag-4-bold-duotone">
                                                      <path fill="currentColor" d="M4.035 11.573c.462-2.309.693-3.463 1.522-4.143s2.007-.68 4.362-.68h4.162c2.355 0 3.532 0 4.361.68c.83.68 1.06 1.834 1.523 4.143l.6 3c.664 3.32.996 4.98.096 6.079s-2.594 1.098-5.98 1.098H9.32c-3.386 0-5.08 0-5.98-1.098s-.568-2.758.096-6.079z" opacity=".5" />
                                                      <circle cx="15" cy="9.75" r="1" fill="currentColor" />
                                                      <circle cx="9" cy="9.75" r="1" fill="currentColor" />
                                                      <path fill="currentColor" d="M9.75 5.75a2.25 2.25 0 0 1 4.5 0v1h.431q.565 0 1.069.002V5.75a3.75 3.75 0 1 0-7.5 0v1.002q.504-.003 1.069-.002h.431z" />

                                                  </svg>
                                              </div>
                                              <div>
                                                  <p className="text-xs font-bold text-[#14132B]">Chidinma Okeke</p>
                                                  <p className="text-[10px] text-[#9A99A8]">Aso Oke Dress</p>
                                              </div>
                                          </div>
                                          <div className="flex flex-col items-end gap-1">
                                              <p className="text-xs font-bold text-[#14132B]">₦35,000</p>
                                              <span className="text-[9px] font-bold text-[#0B7A4B] bg-[#E7F8EF] px-1.5 py-0.5 rounded">Paid</span>
                                          </div>
                                      </div>

                                      {/* Item 2 */}
                                      <div className="flex items-center justify-between p-3 bg-white border border-[#ECEBF3] rounded-[20px] hover:bg-[#FAFAFE] transition-colors cursor-pointer group shadow-sm">
                                          <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:document-text-bold-duotone">
                                                      <path fill="currentColor" d="M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z" opacity=".5" />
                                                      <path fill="currentColor" d="M7.25 8a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75" />

                                                  </svg>
                                              </div>
                                              <div>
                                                  <p className="text-xs font-bold text-[#14132B]">Tunde A.</p>
                                                  <p className="text-[10px] text-[#9A99A8]">CV Writing</p>
                                              </div>
                                          </div>
                                          <div className="flex flex-col items-end gap-1">
                                              <p className="text-xs font-bold text-[#14132B]">₦25,000</p>
                                              <span className="text-[9px] font-bold text-[#0B7A4B] bg-[#E7F8EF] px-1.5 py-0.5 rounded">Paid</span>
                                          </div>
                                      </div>

                                      {/* Item 3 */}
                                      <div className="flex items-center justify-between p-3 bg-white border border-[#ECEBF3] rounded-[20px] hover:bg-[#FAFAFE] transition-colors cursor-pointer group shadow-sm">
                                          <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:bag-4-bold-duotone">
                                                      <path fill="currentColor" d="M4.035 11.573c.462-2.309.693-3.463 1.522-4.143s2.007-.68 4.362-.68h4.162c2.355 0 3.532 0 4.361.68c.83.68 1.06 1.834 1.523 4.143l.6 3c.664 3.32.996 4.98.096 6.079s-2.594 1.098-5.98 1.098H9.32c-3.386 0-5.08 0-5.98-1.098s-.568-2.758.096-6.079z" opacity=".5" />
                                                      <circle cx="15" cy="9.75" r="1" fill="currentColor" />
                                                      <circle cx="9" cy="9.75" r="1" fill="currentColor" />
                                                      <path fill="currentColor" d="M9.75 5.75a2.25 2.25 0 0 1 4.5 0v1h.431q.565 0 1.069.002V5.75a3.75 3.75 0 1 0-7.5 0v1.002q.504-.003 1.069-.002h.431z" />

                                                  </svg>
                                              </div>
                                              <div>
                                                  <p className="text-xs font-bold text-[#14132B]">Ngozi E.</p>
                                                  <p className="text-[10px] text-[#9A99A8]">Bridal Gele</p>
                                              </div>
                                          </div>
                                          <div className="flex flex-col items-end gap-1">
                                              <p className="text-xs font-bold text-[#14132B]">₦18,000</p>
                                              <span className="text-[9px] font-bold text-[#9A5A00] bg-[#FEF0DC] px-1.5 py-0.5 rounded">Pending</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              {/* Padding for bottom nav */}
                              <div className="h-12"></div>
                          </div>

                      </div>

                      {/* Bottom Navigation (Glass) */}
                      <div className="bg-white/90 backdrop-blur-xl border-t border-[#ECEBF3] z-50 flex w-full pt-4 pr-6 pb-8 pl-6 absolute bottom-0 left-0 items-center justify-between">
                          <button className="flex flex-col items-center gap-1 text-[#5F58F4]">
                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:home-smile-bold-duotone">
                                  <path fill="currentColor" d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z" opacity=".5" />
                                  <path fill="currentColor" d="M9.447 15.398a.75.75 0 0 0-.894 1.205A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.147a.75.75 0 0 0-.894-1.206A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.852" />

                              </svg>
                          </button>
                          <button className="flex flex-col items-center gap-1 text-[#9A99A8] hover:text-[#14132B] transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:chart-2-bold-duotone">
                                  <path fill="currentColor" d="M3.293 9.293C3 9.586 3 10.057 3 11v6c0 .943 0 1.414.293 1.707S4.057 19 5 19s1.414 0 1.707-.293S7 17.943 7 17v-6c0-.943 0-1.414-.293-1.707S5.943 9 5 9s-1.414 0-1.707.293" />

                                  <path fill="currentColor" d="M17.293 2.293C17 2.586 17 3.057 17 4v13c0 .943 0 1.414.293 1.707S18.057 19 19 19s1.414 0 1.707-.293S21 17.943 21 17V4c0-.943 0-1.414-.293-1.707S19.943 2 19 2s-1.414 0-1.707.293" opacity=".4" />
                                  <path fill="currentColor" d="M10 7c0-.943 0-1.414.293-1.707S11.057 5 12 5s1.414 0 1.707.293S14 6.057 14 7v10c0 .943 0 1.414-.293 1.707S12.943 19 12 19s-1.414 0-1.707-.293S10 17.943 10 17z" opacity=".7" />
                                  <path fill="currentColor" d="M3 21.25a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 0-1.5z" />
                              </svg>
                          </button>
                          <div className="-mt-8 flex cursor-pointer hover:scale-105 transition-transform bg-center text-black bg-[#5F58F4] w-12 h-12 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3f6038cb-af1c-4483-97bc-dd58d89c36ef_320w.jpg)] bg-cover rounded-full items-center justify-center" style={{ position: 'relative', ['--border-gradient' as any]: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3))', ['--border-radius-before' as any]: '9999px' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:add-circle-bold-duotone" className="text-slate-50 w-[16px] h-[16px]" strokeWidth="2" data-icon-replaced="true" style={{ width: '16px', height: '16px' }}>
                                  <path fill="currentColor" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity=".5" className="" />
                                  <path fill="currentColor" d="M12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z" className="" />
                              </svg>
                          </div>
                          <button className="flex flex-col items-center gap-1 text-[#9A99A8] hover:text-[#14132B] transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:card-bold-duotone" className="">
                                  <path fill="currentColor" d="M10 20h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12c0-.442-.002-1.608-.004-2H2c-.002.392 0 1.558 0 2c0 3.771 0 5.657 1.171 6.828S6.23 20 10 20" opacity=".5" className="" />
                                  <path fill="currentColor" d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4M12.5 15.25a.75.75 0 0 0 0 1.5H14a.75.75 0 0 0 0-1.5zm-6.5 0a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z" className="" />
                              </svg>
                          </button>
                          <button className="flex flex-col items-center gap-1 text-[#9A99A8] hover:text-[#14132B] transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" data-icon="solar:settings-bold-duotone">
                                  <path fill="currentColor" fillRule="evenodd" d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083" clipRule="evenodd" opacity=".5" />
                                  <path fill="currentColor" d="M15.523 12c0 1.657-1.354 3-3.023 3s-3.023-1.343-3.023-3S10.83 9 12.5 9s3.023 1.343 3.023 3" />

                              </svg>
                          </button>
                      </div>

                      {/* Home Indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-[#14132B]/20 rounded-full z-[60] pointer-events-none">
                      </div>
                  </div>
              </div>
          </div>
          <div id="how-it-works" className="overflow-hidden w-full pt-32 pb-32 relative scroll-mt-24">

              {/* Background Tech Text Layer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0 opacity-[0.035]">
                  <span className="text-[20vw] tracking-tighter text-[#14132B] leading-none whitespace-nowrap font-sans font-semibold">PAYPOINT</span>
              </div>

              <div className="z-10 max-w-7xl mr-auto ml-auto pr-6 pl-6 relative">
                  <div className="grid lg:grid-cols-12 gap-12 items-center">

                      {/* Left Content */}
                      <div className="lg:col-span-4 flex flex-col gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                          <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-mono text-blue-400/80 tracking-widest font-sans">01 / 03</span>
                          </div>

                          <h2 className="text-5xl lg:text-6xl text-[#14132B] tracking-tighter leading-[0.9] font-sans font-semibold">
                              Create a payment page in under a
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-sans font-semibold"> minute.</span>
                          </h2>

                          <p className="text-[#33323F] text-base leading-relaxed max-w-xs font-sans">Add a title, set your
                              price, upload a photo and your page is ready to share. Whether you're selling products,
                              services, event tickets or collecting deposits, Paypoint helps you get paid professionally
                              without building a website.</p>

                          <div className="h-px w-24 bg-gradient-to-r from-[#5F58F4]/40 to-transparent"></div>
                      </div>

                      {/* Center Phone Mockup */}
                      <div className="lg:col-span-4 flex justify-center [animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate relative z-20">

                          {/* Background Glows for Hero-like effect */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5F58F4]/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse">
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#5F58F4]/10 rounded-full blur-[80px] -z-10 pointer-events-none">
                          </div>

                          {/* Phone Container with Float Animation */}
                          <div className="animate-[float_6s_ease-in-out_infinite] border-[8px] overflow-hidden z-20 flex flex-col bg-[#050505] w-[320px] h-[640px] border-[#1A1A1A] ring-white/10 ring-1 rounded-[48px] relative shadow-2xl shadow-blue-900/20">

                              {/* Dynamic Island */}
                              <div className="absolute top-0 w-full h-7 z-50 flex justify-center pt-2 pointer-events-none">
                                  <div className="w-24 h-6 bg-black rounded-full relative flex items-center justify-end px-2 gap-1.5 shadow-sm border border-white/5">
                                      <div className="w-1 h-1 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
                                  </div>
                              </div>

                              {/* Screen Content */}
                              <div className="w-full flex-1 bg-[#FAFAFE] flex flex-col relative overflow-hidden font-sans">

                                  {/* Header */}
                                  <div className="pt-12 pb-4 px-5 flex justify-between items-center relative z-20">
                                      <button className="w-8 h-8 rounded-full bg-white border border-[#ECEBF3] flex items-center justify-center text-[#33323F] hover:text-[#14132B] transition-colors hover:bg-[#FAFAFE]">
                                          {/* Solar Arrow Left Bold Duotone */}
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                              <path fill="currentColor" d="M11.55 15.7L8.12 12.27a.77.77 0 0 1 0-1.06l3.43-3.44c.79-.79 2.2-.22 2.2.89v6.13c0 1.12-1.41 1.68-2.2.91" opacity=".5" />
                                              <path fill="currentColor" d="M8.5 12c0-.41.34-.75.75-.75h9.5a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75" />

                                          </svg>
                                      </button>

                                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#ECEBF3] shadow-sm">
                                          <span className="w-4 h-4 rounded-full bg-[#5F58F4] flex items-center justify-center text-[8px] font-bold text-white">A</span>
                                          <span className="text-xs font-medium text-[#14132B] font-sans">Adaeze Couture</span>
                                      </div>

                                      <div className="flex gap-2">
                                          <button className="w-8 h-8 rounded-full bg-white border border-[#ECEBF3] flex items-center justify-center text-[#33323F] hover:text-[#14132B] transition-colors hover:bg-[#FAFAFE]">
                                              {/* Solar Star Bold Duotone */}
                                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                                  <path fill="currentColor" d="M12.94 3.47a1.5 1.5 0 0 0-2.88 0l-1.3 4.01H4.64a1.5 1.5 0 0 0-1.18 2.56l3.36 2.44l-1.28 3.95a1.5 1.5 0 0 0 2.31 1.68l3.4-2.47l3.4 2.47a1.5 1.5 0 0 0 2.31-1.68l-1.28-3.95l3.36-2.44a1.5 1.5 0 0 0-1.18-2.56h-4.12l-1.3-4.01Z" opacity=".5" />
                                                  <path fill="currentColor" d="M11.5 7.48L12.94 3.47a1.5 1.5 0 0 1 2.88 0l1.3 4.01h4.12a1.5 1.5 0 0 1 .88 2.7l-3.36 2.44l1.28 3.95a1.5 1.5 0 0 1-2.31 1.68L12 14.66V7.48h-.5Z" />

                                              </svg>
                                          </button>
                                      </div>
                                  </div>

                                  {/* Product Section */}
                                  <div className="px-6 mt-4 text-center relative z-10">
                                      <p className="text-sm font-medium text-[#33323F] mb-1 font-sans">Aso Oke Dress</p>
                                      <div className="inline-block relative group cursor-default">
                                          <h3 className="text-4xl text-[#14132B] tracking-tighter mb-1 font-sans font-semibold transition-transform duration-300 group-hover:scale-105">
                                              ₦35,000</h3>
                                          <div className="absolute -right-4 -top-2 w-2 h-2 bg-[#5F58F4] rounded-full animate-ping opacity-75">
                                          </div>
                                      </div>
                                      <div className="flex justify-center items-center gap-3 text-[#33323F] mt-1">
                                          <span className="flex items-center gap-1 text-[11px] font-medium font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                  <circle cx="12" cy="10" r="3" />
                                              </svg>
                                              Nationwide · 3 days
                                          </span>
                                          <span className="flex items-center gap-1 text-[11px] font-medium text-[#5F58F4] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />

                                              </svg>
                                              24 paid
                                          </span>
                                      </div>
                                  </div>

                                  {/* Product Image */}
                                  <div className="h-48 w-full relative mt-6 mb-6 px-6 group">
                                      <div className="w-full h-full rounded-3xl overflow-hidden relative bg-[#EEEDFE] border border-[#ECEBF3] flex items-center justify-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 opacity-80">
                                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                              <circle cx="9" cy="9" r="2" />
                                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                          </svg>
                                      </div>

                                  </div>

                                  {/* Spacer */}
                                  <div className="px-6 mb-6">
                                      <div className="h-px w-full bg-[#ECEBF3]"></div>
                                  </div>

                                  {/* Pay Button */}
                                  <div className="px-5 mb-6">
                                      <button className="w-full flex items-center justify-center gap-2 bg-[#5F58F4] text-white rounded-2xl py-4 hover:bg-[#4A43D6] transition-all active:scale-95 shadow-lg shadow-[#5F58F4]/30 hover:shadow-[#5F58F4]/50 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                          </svg>
                                          <span className="text-sm font-bold font-sans">Pay ₦35,000</span>
                                      </button>
                                  </div>

                                  {/* Bottom Sheet / Trust */}
                                  <div className="flex-1 bg-white rounded-t-[24px] p-6 border-t border-[#ECEBF3] shadow-[0_-8px_24px_-12px_rgba(20,19,43,0.08)]">
                                      <div className="w-10 h-1 bg-[#ECEBF3] rounded-full mx-auto mb-5"></div>
                                      <div className="flex items-center justify-center gap-3 mb-4">
                                          <span className="flex items-center gap-1 text-[10px] font-medium text-[#33323F] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                              </svg>
                                              Secure
                                          </span>
                                          <span className="w-1 h-1 rounded-full bg-[#ECEBF3]"></span>
                                          <span className="flex items-center gap-1 text-[10px] font-medium text-[#33323F] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />

                                                  <path d="m9 12 2 2 4-4" />
                                              </svg>
                                              Encrypted
                                          </span>
                                          <span className="w-1 h-1 rounded-full bg-[#ECEBF3]"></span>
                                          <span className="flex items-center gap-1 text-[10px] font-medium text-[#33323F] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />

                                                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                              </svg>
                                              Instant receipt
                                          </span>
                                      </div>
                                      <p className="text-[11px] text-[#9A99A8] leading-relaxed text-center font-sans">
                                          Secure payment. Money settles straight to the seller's bank.
                                      </p>
                                  </div>

                              </div>
                          </div>
                      </div>

                      {/* Right Content (Added Details) */}
                      <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[200px] py-10 [animation:fadeSlideIn_0.8s_ease-out_0.6s_both] animate-on-scroll animate">

                          <div className="space-y-6">
                              <div className="">
                                  <h3 className="text-sm font-medium text-[#14132B] mb-2 flex items-center gap-2 font-sans">
                                      {/* Solar User Check Bold Duotone */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                          <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4" opacity=".5" />
                                          <path fill="currentColor" d="M12 15c-2.7 0-5.8 1.29-7 4.12c-.26.61.18 1.3.85 1.3h12.31c.66 0 1.11-.69.85-1.3C17.8 16.29 14.7 15 12 15M20.5 8.7l-2.1 2.1l-.6-.6a.996.996 0 1 0-1.41 1.41l1.3 1.3c.39.39 1.02.39 1.41 0l2.8-2.8a.996.996 0 1 0-1.41-1.41" className="text-blue-400" />
                                      </svg>
                                      Built for customers buying from you for the first time.
                                  </h3>
                                  <p className="text-[#33323F] text-sm leading-relaxed max-w-xs font-sans">
                                      Your payment page includes your business name, product image and payment history so
                                      customers feel confident paying you. Trust increases conversions.
                                  </p>
                              </div>

                              <div className="">
                                  <h3 className="text-sm font-medium text-[#14132B] mb-2 flex items-center gap-2 font-sans">
                                      {/* Solar Clock Circle Bold Duotone */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="w-[18px] h-[18px]" strokeWidth="2" data-icon-replaced="true" style={{ color: 'rgb(20, 19, 43)', width: '18px', height: '18px' }}>
                                          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2" opacity=".5" className="" />
                                          <path fill="currentColor" d="M15.5 12a1 1 0 0 1-.82.43l-2.6-.02l-1.5.02a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v3.6l2.22-.01a1 1 0 0 1 .7 1.71" className="text-blue-400" />
                                      </svg>
                                      Works perfectly on WhatsApp and Instagram.
                                  </h3>
                                  <p className="text-[#33323F] text-sm leading-relaxed max-w-xs font-sans">
                                      Share your payment link anywhere. Customers pay in seconds without leaving their
                                      favourite apps. No screenshots. No back-and-forth. Just simple payments.
                                  </p>
                              </div>

                              <div className="">
                                  <h3 className="text-sm font-medium text-[#14132B] mb-2 flex items-center gap-2 font-sans">
                                      {/* Solar Shield Check Bold Duotone */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="">
                                          <path fill="currentColor" d="M12 2C7.58 2 4 3.79 4 6c0 7.73 5.61 12.82 8 14c2.39-1.18 8-6.27 8-14c0-2.21-3.58-4-8-4" opacity=".5" />
                                          <path fill="currentColor" d="m15.3 9.3l-3.8 3.8a.75.75 0 0 1-1.06 0l-1.75-1.75a.75.75 0 0 1 1.06-1.06l1.22 1.22l3.27-3.27a.75.75 0 0 1 1.06 1.06" className="text-blue-400" />
                                      </svg>
                                      Your money goes straight to your bank.
                                  </h3>
                                  <p className="text-[#33323F] text-sm leading-relaxed max-w-xs font-sans">
                                      Every payment settles directly into your account. Paypoint never holds your money.
                                      Built on trusted payment infrastructure.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[128px] pointer-events-none">
              </div>
              <div className="absolute bottom-0 left-20 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[96px] pointer-events-none">
              </div>

          </div>
          <section className="overflow-hidden selection:bg-[#EEEDFE] selection:text-[#14132B] lg:py-32 bg-center text-[#33323F] w-full pt-24 pb-24 relative bg-[#FAFAFE]">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fb158590-9b46-4a1d-b6a6-869fe22092db_3840w.webp" alt="Container background" className="mix-blend-luminosity w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0 brightness-200 opacity-[0.04]" data-container-bg="true" style={{ maskImage: 'linear-gradient(180deg, transparent, black 0%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 80%, transparent)' }} />

              {/* Background Atmosphere */}
              <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-[#5F58F4]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              </div>
              <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#5F58F4]/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none">
              </div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none">
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                      {/* Content Column */}
                      <div className="flex flex-col items-start gap-8 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">

                          {/* Rating Badge */}
                          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#ECEBF3] backdrop-blur-md shadow-sm">
                              <div className="flex text-blue-400">
                                  {/* Solar Star Bold Duotone */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12.94 3.47a1.5 1.5 0 0 0-2.88 0l-1.3 4.01H4.64a1.5 1.5 0 01.28 3.95a1.5 1.5 0 0 0 2.31 1.68l3.4-2.47l3.4 2.47a1.5 1.5 0 0 0 2.31-1.68l-1.28-3.95l3.36-2.44a1.5 1.5 0 0 0-1.18-2.56h-4.12l-1.3-4.01Z" opacity=".5" />
                                      <path fill="currentColor" d="M11.5 7.48L12.94 3.47a1.5 1.5 0 0 1 2.88 0l1.3 4.01h4.12a1.5 1.5 0 0 1 .88 2.7l-3.36 2.44l1.28 3.95a1.5 1.5 0 0 1-2.31 1.68L12 14.66V7.48h-.5Z" />

                                  </svg>
                              </div>
                              <span className="text-sm font-semibold text-[#14132B] tracking-tight font-sans">Trusted
                                  checkout</span>
                              <span className="text-xs text-[#33323F] font-medium pl-1 border-l border-[#ECEBF3] ml-1 font-sans">built
                                  for African businesses</span>
                          </div>

                          {/* Main Heading */}
                          <h2 className="text-5xl lg:text-7xl text-[#14132B] tracking-tighter leading-[1.05] font-sans font-semibold">
                              Trusted checkout built for
                              <span className="relative whitespace-nowrap text-blue-400 font-sans font-semibold"> African
                                  businesses.
                                  <svg className="absolute -bottom-2 left-0 w-full text-blue-400/30 -z-10" height="10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />

                                  </svg>
                              </span>
                          </h2>

                          {/* Description */}
                          <p className="text-lg text-[#33323F] leading-relaxed max-w-lg font-medium font-sans">
                              A clean, secure checkout experience that helps customers feel comfortable paying you.
                              Designed for businesses that sell through social media, messaging apps and word of mouth.
                          </p>

                          {/* Buttons */}
                          <div className="flex flex-col sm:flex-row gap-6 [animation:fadeSlideIn_0.8s_ease-out_0.7s_both] animate-on-scroll animate mb-16 gap-x-6 gap-y-6 items-center">

                              {/* Animated Gradient Start Free Button */}

                              {/* Play CTA Button with Gradient Hover */}
                              <div className="inline-block group relative w-full sm:w-auto text-center sm:text-left">
                                  <button className="group inline-flex min-w-[140px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-[#5F58F4] text-sm font-medium text-[#14132B] tracking-tight bg-white h-[54px] border-[#ECEBF3] border rounded-full pt-3 pr-6 pb-3 pl-6 relative backdrop-blur-xl gap-x-2 gap-y-2 items-center justify-center shadow-sm">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle h-5 w-5" style={{ strokeWidth: '1.5' }}>
                                          <circle cx="12" cy="12" r="10" />
                                          <polygon points="10 8 16 12 10 16 10 8" />
                                      </svg>
                                      <span className="relative text-base font-sans">See how it works</span>
                                      <span aria-hidden="true" className="transition-all duration-300 group-hover:opacity-80 opacity-20 w-[70%] h-[1px] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2" style={{ background: 'linear-gradient(90deg,rgba(95,88,244,0) 0%,rgba(95,88,244,1) 50%,rgba(95,88,244,0) 100%)' }}></span>
                                  </button>
                                  <span className="pointer-events-none absolute -bottom-3 left-1/2 z-0 h-6 w-44 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" style={{ background: 'radial-gradient(60% 100% at 50% 50%, rgba(95,88,244,.55), rgba(95,88,244,.28) 35%, transparent 70%)', filter: 'blur(10px) saturate(120%)' }} aria-hidden="true"></span>
                              </div>
                          </div>

                          {/* Logo Strip */}

                      </div>

                      {/* Visual Column */}
                      <div className="lg:h-[640px] flex [animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate h-[500px] relative items-center justify-center perspective-[1200px]">

                          {/* Abstract Background Elements */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#5F58F4]/20 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none opacity-40 border-dashed">
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-[#5F58F4]/15 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none opacity-40">
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5F58F4]/10 rounded-full blur-[100px] pointer-events-none">
                          </div>

                          {/* Central 3D Composition */}
                          <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] transform-style-preserve-3d flex items-center justify-center">

                              {/* Card 1: Main Revenue (Center) */}
                              <div className="absolute z-20 w-72 md:w-80 animate-[float_6s_ease-in-out_infinite] hover:scale-105 transition-transform duration-500 cursor-default">
                                  <div className="rounded-[32px] bg-white border border-[#ECEBF3] p-[1px] shadow-[0_20px_50px_-20px_rgba(20,19,43,0.18)]">
                                      <div className="rounded-[31px] bg-white/90 backdrop-blur-xl p-6 h-full w-full relative overflow-hidden">
                                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F58F4]/10 blur-[50px] rounded-full pointer-events-none">
                                          </div>

                                          <div className="flex items-start justify-between mb-6">
                                              <div className="">
                                                  <p className="text-[11px] text-[#9A99A8] font-medium mb-1 uppercase tracking-wider font-sans">
                                                      Ready to process</p>
                                                  <div className="flex items-baseline gap-2">
                                                      <h3 className="text-2xl font-semibold text-[#14132B] tracking-tight font-sans">
                                                          ₦30B+</h3>
                                                      <span className="text-[10px] font-semibold text-[#5F58F4] bg-[#EEEDFE] px-1.5 py-0.5 rounded font-sans">processed
                                                          </span>
                                                  </div>
                                              </div>
                                              <div className="w-8 h-8 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity">
                                                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                                  </svg>
                                              </div>
                                          </div>

                                          <div className="h-24 w-full relative">
                                              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                                  <defs>

                                                  </defs>
                                                  <path d="M0 35 Q 25 35 35 20 T 70 25 T 100 10 V 40 H 0 Z" fill="url(#chartFill)" />
                                                  <path d="M0 35 Q 25 35 35 20 T 70 25 T 100 10" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                                                  <circle cx="100" cy="10" r="3" fill="#5F58F4" className="animate-pulse shadow-[0_0_10px_#5F58F4]" />
                                              </svg>
                                          </div>

                                          <div className="flex justify-between text-[9px] text-[#9A99A8] mt-4 font-medium uppercase tracking-widest font-sans">
                                              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              {/* Card 2: Performance Stats (Top Left) */}
                              <div className="absolute -top-10 -left-4 md:-left-12 z-10 w-56 animate-[float_7s_ease-in-out_1s_infinite] hover:z-30 hover:scale-105 transition-all duration-500 cursor-default">
                                  <div className="rounded-[28px] bg-white border border-[#ECEBF3] p-[1px] shadow-[0_18px_45px_-20px_rgba(20,19,43,0.18)]">
                                      <div className="rounded-[27px] bg-white/90 backdrop-blur-xl p-5 h-full w-full relative">
                                          <div className="flex justify-between items-center mb-5">
                                              <span className="text-xs font-semibold text-[#14132B] flex items-center gap-2 font-sans">
                                                  <svg className="text-blue-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />

                                                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                                      <line x1="12" y1="22.08" x2="12" y2="12" />
                                                  </svg>
                                                  Speed
                                              </span>
                                          </div>
                                          <div className="space-y-4">
                                              <div className="flex items-center justify-between">
                                                  <div className="flex flex-col">
                                                      <span className="text-[9px] text-[#9A99A8] font-medium uppercase tracking-wider font-sans">Receipt
                                                          delivery</span>
                                                      <span className="text-sm font-semibold text-[#14132B] font-sans">98%</span>
                                                  </div>
                                                  <div className="w-8 h-8 relative flex items-center justify-center">
                                                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                          <path className="text-[#ECEBF3]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                          <path className="text-blue-400" strokeDasharray="98, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                                      </svg>
                                                  </div>
                                              </div>
                                              <div className="h-px w-full bg-[#ECEBF3]"></div>
                                              <div className="flex items-center justify-between">
                                                  <div className="flex flex-col">
                                                      <span className="text-[9px] text-[#9A99A8] font-medium uppercase tracking-wider font-sans">First
                                                          page</span>
                                                      <span className="text-sm font-semibold text-[#14132B] font-sans">30
                                                          sec</span>
                                                  </div>
                                                  <div className="w-8 h-8 relative flex items-center justify-center">
                                                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                          <path className="text-[#ECEBF3]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                          <path className="text-blue-400" strokeDasharray="45, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                                      </svg>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              {/* Card 3: Net Growth (Bottom Right) */}
                              <div className="absolute -bottom-8 -right-2 md:-right-8 z-30 w-48 animate-[float_5s_ease-in-out_2s_infinite] hover:z-30 hover:scale-105 transition-all duration-500 cursor-default">
                                  <div className="rounded-[28px] bg-gradient-to-br from-[#5F58F4]/40 via-[#5F58F4]/20 to-[#ECEBF3] p-[1px] shadow-[0_18px_45px_-20px_rgba(95,88,244,0.3)]">
                                      <div className="rounded-[27px] bg-white/90 backdrop-blur-2xl p-6 h-full w-full relative overflow-hidden group">
                                          {/* Glow Effect */}
                                          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#5F58F4]/30 blur-2xl rounded-full group-hover:bg-[#5F58F4]/45 transition-colors duration-500">
                                          </div>

                                          <div className="relative z-10">
                                              <div className="flex items-center justify-between mb-3">
                                                  <div className="p-1.5 bg-[#EEEDFE] rounded-full">
                                                      <svg className="w-3.5 h-3.5 text-[#5F58F4]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                                          <polyline points="17 6 23 6 23 12" />
                                                      </svg>
                                                  </div>
                                                  <span className="text-[9px] font-semibold uppercase bg-[#EEEDFE] px-1.5 py-0.5 rounded text-[#5F58F4] font-sans">Always</span>
                                              </div>
                                              <p className="text-[10px] font-medium uppercase tracking-wider text-[#9A99A8] mb-1 font-sans">
                                                  Funds held</p>
                                              <p className="text-4xl tracking-tighter text-[#14132B] font-sans font-semibold">
                                                  0%</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              {/* Card 4: Review Pill (Floating Right) */}
                              <div className="absolute top-1/2 -right-12 md:-right-20 z-20 animate-[float_8s_ease-in-out_1.5s_infinite] cursor-default hover:scale-105 transition-transform">
                                  <div className="rounded-full bg-white border border-[#ECEBF3] p-[1px] shadow-[0_12px_30px_-12px_rgba(20,19,43,0.18)]">
                                      <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
                                          <div className="flex -space-x-1">
                                              <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24">
                                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />

                                              </svg>
                                              <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24">
                                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />

                                              </svg>
                                              <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24">
                                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />

                                              </svg>
                                              <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24">
                                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />

                                              </svg>
                                              <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24">
                                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />

                                              </svg>
                                          </div>
                                          <span className="text-[10px] font-semibold text-[#14132B] font-sans">"My buyers
                                              trust me more now." Adaeze, Lagos</span>
                                      </div>
                                  </div>
                              </div>

                          </div>

                      </div>
                  </div>
              </div>
          </section>
          <section id="features" className="overflow-hidden selection:bg-[#EEEDFE] selection:text-[#14132B] lg:py-32 text-[#33323F] w-full border-[#ECEBF3] border-t pt-24 pb-24 relative scroll-mt-24 bg-white">

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                      {/* Content Column */}
                      <div className="flex flex-col items-start gap-8">

                          {/* Number Tag */}
                          <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-medium text-blue-400 tracking-widest font-sans uppercase">02 / 03
                                  Share &amp; get paid</span>
                          </div>

                          {/* Heading */}
                          <h2 className="text-5xl lg:text-7xl text-[#14132B] tracking-tighter leading-[1.05] font-sans font-semibold">
                              Share one
                              link. <span className="relative inline-block text-blue-500">
                                  Get paid anywhere.
                                  <svg className="absolute -bottom-1 left-0 w-full text-blue-500/30" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                                      <path d="M0 4 Q 50 8 100 4" stroke="currentColor" strokeWidth="6" fill="none" />

                                  </svg>
                              </span>
                          </h2>

                          {/* Destinations */}
                          <div className="w-full">
                              <p className="text-sm font-semibold text-[#14132B] mb-3 font-sans">Add your payment link
                                  to:</p>
                              <div className="flex flex-wrap gap-2">
                                  {["WhatsApp", "Instagram", "TikTok", "Facebook", "X", "Your website"].map((dest) => (
                                      <span key={dest} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#ECEBF3] text-xs font-medium text-[#33323F] shadow-sm hover:border-[#5F58F4]/40 hover:text-[#5F58F4] transition-colors font-sans">
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#5F58F4]"></span>
                                          {dest}
                                      </span>
                                  ))}
                              </div>
                          </div>

                          {/* Description */}
                          <p className="text-lg text-[#33323F] leading-relaxed max-w-lg font-medium font-sans">
                              Customers pay through a secure checkout and funds settle directly into your bank account. No
                              manual confirmations. No payment screenshots. No chasing customers.
                          </p>

                          {/* Buttons */}
                          <div className="flex flex-wrap gap-4 items-center pt-2 w-full sm:w-auto">
                              <button className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-[0_0_20px_-5px_rgba(74,67,214,0.5)] hover:shadow-[0_0_30px_-5px_rgba(74,67,214,0.6)] flex items-center gap-2 group">
                                  <span>Start free</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform group-hover:translate-x-1">
                                      <path d="M5 12h14" />
                                      <path d="m12 5 7 7-7 7" />
                                  </svg>
                              </button>

                              <button className="h-12 px-8 rounded-full bg-white border border-[#ECEBF3] hover:bg-[#FAFAFE] text-[#14132B] text-sm font-semibold transition-all flex items-center gap-2 shadow-sm">
                                  <span className="">See how it works</span>
                              </button>
                          </div>

                          {/* Partner Logos */}

                      </div>

                      {/* Visual Column (Phone UI) */}
                      <div className="flex justify-center relative h-[640px] items-center perspective-[2000px] group">

                          {/* Decorative Glows */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/5 rounded-full blur-3xl pointer-events-none">
                          </div>

                          {/* Phone Frame */}
                          <div className="border-[8px] overflow-hidden z-20 flex flex-col bg-[#050505] w-[320px] h-[640px] border-[#1A1A1A] ring-white/5 ring-1 rounded-[50px] relative shadow-2xl transform transition-all duration-500 group-hover:rotate-y-[-6deg] group-hover:rotate-x-[4deg] rotate-y-[-12deg] rotate-x-[8deg]">

                              {/* Dynamic Island */}
                              <div className="absolute top-0 w-full h-7 z-50 flex justify-center pt-2 pointer-events-none">
                                  <div className="w-24 h-6 bg-black rounded-full relative flex items-center justify-end px-2 gap-1.5 shadow-lg">
                                      <div className="w-1 h-1 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
                                  </div>
                              </div>

                              {/* Screen Content */}
                              <div className="w-full flex-1 bg-[#FAFAFE] flex flex-col relative overflow-hidden font-sans">

                                  {/* Header */}
                                  <div className="pt-12 pb-4 px-5 flex justify-between items-center relative z-20">
                                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#ECEBF3] shadow-sm">
                                          <div className="w-5 h-5 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link">
                                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />

                                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />

                                              </svg>
                                          </div>
                                          <span className="text-xs font-semibold text-[#14132B] font-sans">Your link</span>
                                      </div>

                                      <div className="flex gap-2">
                                          <button className="w-8 h-8 rounded-full bg-white border border-[#ECEBF3] flex items-center justify-center text-[#33323F] hover:text-[#14132B] transition-colors">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history">
                                                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                  <path d="M3 3v5h5" />
                                                  <path d="M12 7v5l4 2" />
                                              </svg>
                                          </button>
                                      </div>
                                  </div>

                                  {/* Share & Get Paid UI */}
                                  <div className="px-5 mt-4 flex flex-col gap-4 relative z-10">

                                      {/* Link Card */}
                                      <div className="bg-white rounded-3xl p-4 border border-[#ECEBF3] shadow-sm relative group cursor-pointer hover:border-[#5F58F4]/40 transition-colors">
                                          <div className="flex justify-between mb-2">
                                              <span className="text-xs font-medium text-[#33323F] font-sans">Your payment
                                                  link</span>
                                              <span className="text-xs font-medium text-[#0B7A4B] font-sans">Active</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                              <div className="flex flex-col">
                                                  <span className="text-base font-bold text-[#14132B] w-44 truncate font-sans">paypoint.ng/adaeze</span>
                                                  <span className="text-xs text-[#9A99A8] font-sans">Aso Oke Dress ·
                                                      ₦35,000</span>
                                              </div>
                                              <div className="flex items-center gap-2 bg-[#FAFAFE] rounded-full pl-2 pr-3 py-1.5 border border-[#ECEBF3] hover:bg-[#EEEDFE] transition-colors">
                                                  <div className="w-6 h-6 bg-[#EEEDFE] rounded-full flex items-center justify-center text-[#5F58F4]">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />

                                                      </svg>
                                                  </div>
                                                  <span className="text-sm font-bold text-[#14132B] font-sans">Copy</span>
                                              </div>
                                          </div>
                                      </div>

                                      {/* Flow Arrow */}
                                      <div className="flex justify-center -my-3 relative z-20">
                                          <div className="w-10 h-10 bg-white border-4 border-[#FAFAFE] rounded-xl flex items-center justify-center text-[#5F58F4] shadow-sm">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down">
                                                  <path d="M12 5v14" />
                                                  <path d="m19 12-7 7-7-7" />
                                              </svg>
                                          </div>
                                      </div>

                                      {/* Settlement Card */}
                                      <div className="bg-white rounded-3xl p-4 border border-[#ECEBF3] shadow-sm relative group cursor-pointer hover:border-[#5F58F4]/40 transition-colors">
                                          <div className="flex justify-between mb-2">
                                              <span className="text-xs font-medium text-[#33323F] font-sans">Settles to your
                                                  bank</span>
                                              <span className="text-xs font-medium text-[#0B7A4B] font-sans">instantly
                                                  </span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                              <div className="flex flex-col">
                                                  <span className="text-2xl font-bold text-[#14132B] font-sans">₦35,000</span>
                                                  <span className="text-xs text-[#0B7A4B] font-sans">Paid · GTBank
                                                      ••4821</span>
                                              </div>
                                              <div className="flex items-center gap-2 bg-[#E7F8EF] rounded-full pl-2 pr-3 py-1.5 border border-[#CDEFDD] hover:bg-[#D9F2E5] transition-colors">
                                                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#0B7A4B]">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                          <path d="M20 6 9 17l-5-5" />
                                                      </svg>
                                                  </div>
                                                  <span className="text-sm font-bold text-[#0B7A4B] font-sans">Paid</span>
                                              </div>
                                          </div>
                                      </div>

                                      {/* Rate Info */}
                                      <div className="flex justify-between items-center px-2">
                                          <div className="flex items-center gap-1 text-[10px] text-[#9A99A8] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info">
                                                  <circle cx="12" cy="12" r="10" />
                                                  <path d="M12 16v-4" />
                                                  <path d="M12 8h.01" />
                                              </svg>
                                              <span>Paypoint never holds funds</span>
                                          </div>
                                          <div className="flex items-center gap-1 text-[10px] text-[#5F58F4] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt">
                                                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />

                                                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                              </svg>
                                              <span>Instant receipt</span>
                                          </div>
                                      </div>

                                      {/* Chart Mini */}
                                      <div className="h-24 w-full bg-white rounded-3xl border border-[#ECEBF3] shadow-sm relative overflow-hidden flex items-end">
                                          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                              <path d="M0 35 Q 20 30 35 20 T 65 25 T 100 10 V 40 H 0 Z" fill="rgba(95,88,244,0.12)" />
                                              <path d="M0 35 Q 20 30 35 20 T 65 25 T 100 10" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" />
                                          </svg>
                                          <div className="absolute top-3 left-3">
                                              <span className="text-[10px] font-bold text-[#5F58F4] bg-[#EEEDFE] px-1.5 py-0.5 rounded font-sans">1D</span>
                                          </div>
                                      </div>

                                      {/* Share Button */}
                                      <button className="w-full bg-[#5F58F4] hover:bg-[#4A43D6] text-white font-bold py-4 rounded-2xl shadow-sm transition-all active:scale-95 mt-2 font-sans">
                                          Share on WhatsApp
                                      </button>

                                  </div>

                                  {/* Bottom Nav */}
                                  <div className="mt-auto border-t border-[#ECEBF3] p-5 flex justify-between items-center bg-white/90 backdrop-blur-md">
                                      <div className="flex flex-col items-center gap-1 text-[#9A99A8] hover:text-[#14132B] transition-colors cursor-pointer">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet">
                                              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />

                                              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                                          </svg>
                                      </div>
                                      <div className="flex flex-col items-center gap-1 text-[#5F58F4] cursor-pointer">
                                          <div className="bg-[#EEEDFE] p-2 rounded-full">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-left">
                                                  <path d="m16 3 4 4-4 4" />
                                                  <path d="M20 7H4" />
                                                  <path d="m8 21-4-4 4-4" />
                                                  <path d="M4 17h16" />
                                              </svg>
                                          </div>
                                      </div>
                                      <div className="flex flex-col items-center gap-1 text-[#9A99A8] hover:text-[#14132B] transition-colors cursor-pointer">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2">
                                              <path d="M20 7h-9" />
                                              <path d="M14 17H5" />
                                              <path d="M12 17h9" />
                                              <path d="M9 7H5" />
                                              <circle cx="17" cy="7" r="3" />
                                              <circle cx="7" cy="17" r="3" />
                                          </svg>
                                      </div>
                                  </div>

                              </div>
                          </div>

                          {/* Floating UI Elements behind/around phone */}

                          {/* Success Toast */}
                          <div className="absolute top-24 -right-12 bg-white border border-[#ECEBF3] p-3 rounded-xl shadow-[0_14px_36px_-14px_rgba(20,19,43,0.2)] flex items-center gap-3 animate-bounce-slow" style={{ animationDuration: '5s' }}>
                              <div className="w-8 h-8 bg-[#E7F8EF] rounded-full flex items-center justify-center text-[#0B7A4B]">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                      <path d="M20 6 9 17l-5-5" />
                                  </svg>
                              </div>
                              <div>
                                  <div className="text-[10px] font-bold text-[#14132B] font-sans">You got paid</div>
                                  <div className="text-[10px] text-[#9A99A8] font-sans">₦35,000 from Chidinma</div>
                              </div>
                          </div>

                          {/* Chart Card Bottom Left */}
                          <div className="absolute bottom-20 -left-16 bg-white border border-[#ECEBF3] p-4 rounded-2xl shadow-[0_14px_36px_-14px_rgba(20,19,43,0.2)] transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                              <div className="flex justify-between items-end mb-2 gap-8">
                                  <div>
                                      <div className="text-[10px] text-[#9A99A8] font-sans">This week</div>
                                      <div className="text-sm font-bold text-[#14132B] font-sans">₦320,000</div>
                                  </div>
                                  <div className="text-[10px] text-[#0B7A4B] font-bold bg-[#E7F8EF] px-1.5 py-0.5 rounded font-sans">
                                      12 paid</div>
                              </div>
                              <div className="w-32 h-12">
                                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                      <path d="M0 30 Q 25 40 50 20 T 100 15" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" className="" />
                                  </svg>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </section>

          {/* Who Is Paypoint For */}
          <section className="overflow-hidden selection:bg-[#EEEDFE] selection:text-[#14132B] lg:py-32 text-[#33323F] w-full border-[#ECEBF3] border-t pt-24 pb-24 relative bg-[#FAFAFE]">
              {/* Background Atmosphere */}
              <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#5F58F4]/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <div className="max-w-2xl mb-16 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-blue-400 tracking-widest font-sans uppercase">Who it's for</span>
                      </div>
                      <h2 className="text-4xl lg:text-6xl text-[#14132B] tracking-tighter leading-[1.05] font-sans font-semibold">
                          Built for businesses that sell <span className="text-blue-500">everywhere.</span>
                      </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {[
                          {
                              title: "Fashion Sellers",
                              body: "Sell products without building a website.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" data-icon="solar:bag-4-bold-duotone">
                                      <path fill="currentColor" d="M4.035 11.573c.462-2.309.693-3.463 1.522-4.143s2.007-.68 4.362-.68h4.162c2.355 0 3.532 0 4.361.68c.83.68 1.06 1.834 1.523 4.143l.6 3c.664 3.32.996 4.98.096 6.079s-2.594 1.098-5.98 1.098H9.32c-3.386 0-5.08 0-5.98-1.098s-.568-2.758.096-6.079z" opacity=".5" />
                                      <circle cx="15" cy="9.75" r="1" fill="currentColor" />
                                      <circle cx="9" cy="9.75" r="1" fill="currentColor" />
                                      <path fill="currentColor" d="M9.75 5.75a2.25 2.25 0 0 1 4.5 0v1h.431q.565 0 1.069.002V5.75a3.75 3.75 0 1 0-7.5 0v1.002q.504-.003 1.069-.002h.431z" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Coaches & Consultants",
                              body: "Accept payments for sessions and services.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4" opacity=".5" />
                                      <path fill="currentColor" d="M12 15c-2.7 0-5.8 1.29-7 4.12c-.26.61.18 1.3.85 1.3h12.31c.66 0 1.11-.69.85-1.3C17.8 16.29 14.7 15 12 15M20.5 8.7l-2.1 2.1l-.6-.6a.996.996 0 1 0-1.41 1.41l1.3 1.3c.39.39 1.02.39 1.41 0l2.8-2.8a.996.996 0 1 0-1.41-1.41" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Event Organisers",
                              body: "Sell tickets and collect registrations.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" data-icon="solar:document-text-bold-duotone">
                                      <path fill="currentColor" d="M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z" opacity=".5" />
                                      <path fill="currentColor" d="M7.25 8a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Creators",
                              body: "Get paid for digital products and services.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12.94 3.47a1.5 1.5 0 0 0-2.88 0l-1.3 4.01H4.64a1.5 1.5 0 0 0-1.18 2.56l3.36 2.44l-1.28 3.95a1.5 1.5 0 0 0 2.31 1.68l3.4-2.47l3.4 2.47a1.5 1.5 0 0 0 2.31-1.68l-1.28-3.95l3.36-2.44a1.5 1.5 0 0 0-1.18-2.56h-4.12l-1.3-4.01Z" opacity=".5" />
                                      <path fill="currentColor" d="M11.5 7.48L12.94 3.47a1.5 1.5 0 0 1 2.88 0l1.3 4.01h4.12a1.5 1.5 0 0 1 .88 2.7l-3.36 2.44l1.28 3.95a1.5 1.5 0 0 1-2.31 1.68L12 14.66V7.48h-.5Z" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Food Vendors & Restaurants",
                              body: "Collect payments before delivery.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" data-icon="solar:bag-4-bold-duotone">
                                      <path fill="currentColor" d="M4.035 11.573c.462-2.309.693-3.463 1.522-4.143s2.007-.68 4.362-.68h4.162c2.355 0 3.532 0 4.361.68c.83.68 1.06 1.834 1.523 4.143l.6 3c.664 3.32.996 4.98.096 6.079s-2.594 1.098-5.98 1.098H9.32c-3.386 0-5.08 0-5.98-1.098s-.568-2.758.096-6.079z" opacity=".5" />
                                      <circle cx="15" cy="9.75" r="1" fill="currentColor" />
                                      <circle cx="9" cy="9.75" r="1" fill="currentColor" />
                                      <path fill="currentColor" d="M9.75 5.75a2.25 2.25 0 0 1 4.5 0v1h.431q.565 0 1.069.002V5.75a3.75 3.75 0 1 0-7.5 0v1.002q.504-.003 1.069-.002h.431z" />
                                  </svg>
                              ),
                          },
                          {
                              title: "SMEs",
                              body: "Professional payment pages for growing businesses.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" data-icon="solar:graph-up-bold-duotone">
                                      <path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5" />
                                      <path fill="currentColor" d="M14.5 10.75a.75.75 0 0 1 0-1.5H17a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-2.013 2.013a1.75 1.75 0 0 1-2.474 0l-1.586-1.586a.25.25 0 0 0-.354 0L7.53 14.53a.75.75 0 0 1-1.06-1.06l2.293-2.293a1.75 1.75 0 0 1 2.474 0l1.586 1.586a.25.25 0 0 0 .354 0l2.012-2.013z" />
                                  </svg>
                              ),
                          },
                      ].map((card, i) => (
                          <div key={card.title} className="group bg-white border border-[#ECEBF3] rounded-[28px] p-7 shadow-[0_14px_36px_-24px_rgba(20,19,43,0.18)] hover:shadow-[0_18px_45px_-20px_rgba(95,88,244,0.25)] hover:-translate-y-1 transition-all duration-300 [animation:fadeSlideIn_0.8s_ease-out_both] animate-on-scroll animate" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                              <div className="w-12 h-12 rounded-2xl bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4] mb-5 group-hover:bg-[#5F58F4] group-hover:text-white transition-colors duration-300">
                                  {card.icon}
                              </div>
                              <h3 className="text-lg font-semibold text-[#14132B] tracking-tight mb-2 font-sans">{card.title}</h3>
                              <p className="text-[#33323F] text-sm leading-relaxed font-sans">{card.body}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>

          {/* Why Paypoint */}
          <section className="overflow-hidden selection:bg-[#EEEDFE] selection:text-[#14132B] lg:py-32 text-[#33323F] w-full border-[#ECEBF3] border-t pt-24 pb-24 relative bg-white">
              {/* Background Tech Text Layer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0 opacity-[0.035]">
                  <span className="text-[18vw] tracking-tighter text-[#14132B] leading-none whitespace-nowrap font-sans font-semibold">PAYPOINT</span>
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <div className="max-w-2xl mb-16 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-blue-400 tracking-widest font-sans uppercase">Why Paypoint</span>
                      </div>
                      <h2 className="text-4xl lg:text-6xl text-[#14132B] tracking-tighter leading-[1.05] font-sans font-semibold">
                          Everything you need to <span className="text-blue-500">get paid.</span>
                      </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                      {[
                          {
                              title: "Create payment pages in seconds",
                              body: "Turn anything you sell into a shareable payment page.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" data-icon="solar:add-circle-bold-duotone">
                                      <path fill="currentColor" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity=".5" />
                                      <path fill="currentColor" d="M12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Secure checkout",
                              body: "Built on trusted payment infrastructure.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" data-icon="solar:shield-check-bold-duotone">
                                      <path fill="currentColor" d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082" opacity=".5" />
                                      <path fill="currentColor" d="M15.06 10.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Instant receipts",
                              body: "Customers receive payment confirmations immediately.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                      <path d="M12 17.5v-11" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Direct bank settlement",
                              body: "Funds settle directly into your own bank account.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="3" x2="21" y1="22" y2="22" />
                                      <line x1="6" x2="6" y1="18" y2="11" />
                                      <line x1="10" x2="10" y1="18" y2="11" />
                                      <line x1="14" x2="14" y1="18" y2="11" />
                                      <line x1="18" x2="18" y1="18" y2="11" />
                                      <polygon points="12 2 20 7 4 7" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Track every payment",
                              body: "Know who paid, what they paid for and when they paid.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" data-icon="solar:chart-2-bold-duotone">
                                      <path fill="currentColor" d="M3.293 9.293C3 9.586 3 10.057 3 11v6c0 .943 0 1.414.293 1.707S4.057 19 5 19s1.414 0 1.707-.293S7 17.943 7 17v-6c0-.943 0-1.414-.293-1.707S5.943 9 5 9s-1.414 0-1.707.293" />
                                      <path fill="currentColor" d="M17.293 2.293C17 2.586 17 3.057 17 4v13c0 .943 0 1.414.293 1.707S18.057 19 19 19s1.414 0 1.707-.293S21 17.943 21 17V4c0-.943 0-1.414-.293-1.707S19.943 2 19 2s-1.414 0-1.707.293" opacity=".4" />
                                      <path fill="currentColor" d="M10 7c0-.943 0-1.414.293-1.707S11.057 5 12 5s1.414 0 1.707.293S14 6.057 14 7v10c0 .943 0 1.414-.293 1.707S12.943 19 12 19s-1.414 0-1.707-.293S10 17.943 10 17z" opacity=".7" />
                                      <path fill="currentColor" d="M3 21.25a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 0-1.5z" />
                                  </svg>
                              ),
                          },
                          {
                              title: "Built for African businesses",
                              body: "Designed for how modern businesses actually sell.",
                              icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" data-icon="solar:graph-up-bold-duotone">
                                      <path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5" />
                                      <path fill="currentColor" d="M14.5 10.75a.75.75 0 0 1 0-1.5H17a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-2.013 2.013a1.75 1.75 0 0 1-2.474 0l-1.586-1.586a.25.25 0 0 0-.354 0L7.53 14.53a.75.75 0 0 1-1.06-1.06l2.293-2.293a1.75 1.75 0 0 1 2.474 0l1.586 1.586a.25.25 0 0 0 .354 0l2.012-2.013z" />
                                  </svg>
                              ),
                          },
                      ].map((item, i) => (
                          <div key={item.title} className="flex flex-col gap-3 [animation:fadeSlideIn_0.8s_ease-out_both] animate-on-scroll animate" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                              <div className="w-11 h-11 rounded-xl bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                  {item.icon}
                              </div>
                              <h3 className="text-base font-semibold text-[#14132B] tracking-tight font-sans">{item.title}</h3>
                              <p className="text-[#33323F] text-sm leading-relaxed max-w-xs font-sans">{item.body}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>

          {/* Testimonial */}
          <section className="overflow-hidden selection:bg-[#EEEDFE] selection:text-[#14132B] lg:py-32 text-[#33323F] w-full border-[#ECEBF3] border-t pt-24 pb-24 relative bg-[#FAFAFE]">
              {/* Background Atmosphere */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#5F58F4]/10 rounded-full blur-[120px] pointer-events-none"></div>

              <div className="max-w-4xl mx-auto px-6 relative z-10 text-center [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EEEDFE] text-[#5F58F4] mb-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M7.5 4C5 4 3 6 3 8.5c0 2.4 1.8 4.4 4.2 4.5c-.1 1.6-.8 2.7-2.4 3.6a.75.75 0 0 0 .7 1.32C8.5 16.5 10 14 10 10.5V8.5C10 6 8 4 7.5 4m9 0C14 4 12 6 12 8.5c0 2.4 1.8 4.4 4.2 4.5c-.1 1.6-.8 2.7-2.4 3.6a.75.75 0 0 0 .7 1.32C17.5 16.5 19 14 19 10.5V8.5C19 6 17 4 16.5 4" opacity=".7" />
                      </svg>
                  </div>

                  <p className="text-3xl lg:text-5xl text-[#14132B] tracking-tighter leading-[1.1] font-sans font-semibold mb-8">
                      Getting paid has never been easier.
                  </p>

                  <p className="text-xl lg:text-2xl text-[#33323F] leading-relaxed font-medium max-w-3xl mx-auto mb-8 font-sans">
                      "Before Paypoint, I spent hours confirming transfers and asking customers for screenshots. Now I
                      just send one link and everything happens automatically."
                  </p>

                  <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#5F58F4] flex items-center justify-center text-sm font-bold text-white font-sans">A</div>
                      <span className="text-sm font-semibold text-[#14132B] tracking-tight font-sans">Adaeze, Lagos</span>
                  </div>
              </div>
          </section>

          {/* Final CTA */}
          <section className="overflow-hidden selection:bg-[#EEEDFE] selection:text-[#14132B] lg:py-32 text-[#33323F] w-full border-[#ECEBF3] border-t pt-24 pb-24 relative bg-white">
              {/* Background Atmosphere */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#5F58F4]/10 rounded-full blur-[120px] -translate-y-1/3 pointer-events-none"></div>

              <div className="max-w-5xl mx-auto px-6 relative z-10 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                  <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#6F68FF] to-[#5F58F4] px-8 py-16 lg:px-20 lg:py-24 text-center shadow-[0_30px_80px_-30px_rgba(95,88,244,0.5)]">
                      {/* Decorative glows */}
                      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
                      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
                      {/* Vertical lines texture */}
                      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 10px)' }}></div>

                      <div className="relative z-10">
                          <h2 className="text-4xl lg:text-6xl text-white tracking-tighter leading-[1.05] font-sans font-semibold mb-6">
                              Start getting paid professionally.
                          </h2>
                          <p className="text-lg lg:text-xl text-white/90 leading-relaxed font-medium max-w-2xl mx-auto mb-10 font-sans">
                              Create your first payment page in less than a minute and start accepting payments from
                              anywhere.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                              <button className="group inline-flex items-center justify-center gap-2 h-[54px] px-8 rounded-full bg-white text-[#5F58F4] text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] w-full sm:w-auto font-sans">
                                  <span>Start Free</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                      <path d="M5 12h14" />
                                      <path d="m12 5 7 7-7 7" />
                                  </svg>
                              </button>
                              <button className="inline-flex items-center justify-center gap-2 h-[54px] px-8 rounded-full bg-white/10 border border-white/30 text-white text-sm font-semibold transition-all duration-300 hover:bg-white/20 w-full sm:w-auto backdrop-blur-sm font-sans">
                                  <span>See How It Works</span>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <footer className="bg-[#FAFAFE] text-[#33323F] w-full border-t border-[#ECEBF3] relative overflow-hidden font-sans z-20">
              {/* Ambient Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#5F58F4]/10 rounded-full blur-[100px] pointer-events-none -mt-32">
              </div>

              <div className="max-w-7xl mx-auto relative z-10">

                  {/* Social Navigation Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#ECEBF3]">

                      {/* Twitter / X */}
                      <a href="#" className="group flex items-center justify-between p-6 md:p-8 border-r border-[#ECEBF3] border-b md:border-b-0 hover:bg-white transition-all duration-300">
                          <div className="flex items-center gap-3 text-[#33323F] group-hover:text-[#14132B] transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231l5.45-6.231h.001Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />

                              </svg>
                              <span className="text-sm font-medium tracking-tight">Twitter</span>
                          </div>
                          <div className="text-[#C4C3D0] group-hover:text-[#5F58F4] transition-colors transform group-hover:translate-x-1 duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M18.07 12.47a.76.76 0 0 0 0-1.06l-4.14-4.14a.76.76 0 0 0-1.06 0a.76.76 0 0 0 0 1.06l2.81 2.81H5.75a.75.75 0 1 0 0 1.5h9.93l-2.81 2.81a.76.76 0 0 0 0 1.06a.77.77 0 0 0 1.06 0l4.14-4.04Z" opacity=".5" />
                                  <path fill="currentColor" d="M12.93 11.41a.76.76 0 0 0 0 1.06l4.14 4.14a.77.77 0 0 0 1.06 0a.76.76 0 0 0 0-1.06l-2.81-2.81H18a.75.75 0 1 0 0-1.5h-2.68l2.81-2.81a.76.76 0 0 0 0-1.06a.76.76 0 0 0-1.06 0l-4.14 4.14Z" />

                              </svg>
                          </div>
                      </a>

                      {/* GitHub */}
                      <a href="#" className="group flex items-center justify-between p-6 md:p-8 border-r border-[#ECEBF3] border-b md:border-b-0 hover:bg-white transition-all duration-300">
                          <div className="flex items-center gap-3 text-[#33323F] group-hover:text-[#14132B] transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />

                              </svg>
                              <span className="text-sm font-medium tracking-tight">GitHub</span>
                          </div>
                          <div className="text-[#C4C3D0] group-hover:text-[#5F58F4] transition-colors transform group-hover:translate-x-1 duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M18.07 12.47a.76.76 0 0 0 0-1.06l-4.14-4.14a.76.76 0 0 0-1.06 0a.76.76 0 0 0 0 1.06l2.81 2.81H5.75a.75.75 0 1 0 0 1.5h9.93l-2.81 2.81a.76.76 0 0 0 0 1.06a.77.77 0 0 0 1.06 0l4.14-4.04Z" opacity=".5" />
                                  <path fill="currentColor" d="M12.93 11.41a.76.76 0 0 0 0 1.06l4.14 4.14a.77.77 0 0 0 1.06 0a.76.76 0 0 0 0-1.06l-2.81-2.81H18a.75.75 0 1 0 0-1.5h-2.68l2.81-2.81a.76.76 0 0 0 0-1.06a.76.76 0 0 0-1.06 0l-4.14 4.14Z" />

                              </svg>
                          </div>
                      </a>

                      {/* Discord */}
                      <a href="#" className="group flex items-center justify-between p-6 md:p-8 border-r border-[#ECEBF3] border-b md:border-b-0 hover:bg-white transition-all duration-300">
                          <div className="flex items-center gap-3 text-[#33323F] group-hover:text-[#14132B] transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.2 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.53.31-1.07.57-1.64.78c-.04.01-.05.06-.04.09c.31.61.66 1.19 1.07 1.74c.03.01.06.02.09.01c1.67-.53 3.4-1.33 5.2-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.85 2.12-1.89 2.12z" />

                              </svg>
                              <span className="text-sm font-medium tracking-tight">Discord</span>
                          </div>
                          <div className="text-[#C4C3D0] group-hover:text-[#5F58F4] transition-colors transform group-hover:translate-x-1 duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M18.07 12.47a.76.76 0 0 0 0-1.06l-4.14-4.14a.76.76 0 0 0-1.06 0a.76.76 0 0 0 0 1.06l2.81 2.81H5.75a.75.75 0 1 0 0 1.5h9.93l-2.81 2.81a.76.76 0 0 0 0 1.06a.77.77 0 0 0 1.06 0l4.14-4.04Z" opacity=".5" />
                                  <path fill="currentColor" d="M12.93 11.41a.76.76 0 0 0 0 1.06l4.14 4.14a.77.77 0 0 0 1.06 0a.76.76 0 0 0 0-1.06l-2.81-2.81H18a.75.75 0 1 0 0-1.5h-2.68l2.81-2.81a.76.76 0 0 0 0-1.06a.76.76 0 0 0-1.06 0l-4.14 4.14Z" />

                              </svg>
                          </div>
                      </a>

                      {/* LinkedIn */}
                      <a href="#" className="group flex items-center justify-between p-6 md:p-8 hover:bg-white transition-all duration-300">
                          <div className="flex items-center gap-3 text-[#33323F] group-hover:text-[#14132B] transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />

                              </svg>
                              <span className="text-sm font-medium tracking-tight">LinkedIn</span>
                          </div>
                          <div className="text-[#C4C3D0] group-hover:text-[#5F58F4] transition-colors transform group-hover:translate-x-1 duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M18.07 12.47a.76.76 0 0 0 0-1.06l-4.14-4.14a.76.76 0 0 0-1.06 0a.76.76 0 0 0 0 1.06l2.81 2.81H5.75a.75.75 0 1 0 0 1.5h9.93l-2.81 2.81a.76.76 0 0 0 0 1.06a.77.77 0 0 0 1.06 0l4.14-4.04Z" opacity=".5" />
                                  <path fill="currentColor" d="M12.93 11.41a.76.76 0 0 0 0 1.06l4.14 4.14a.77.77 0 0 0 1.06 0a.76.76 0 0 0 0-1.06l-2.81-2.81H18a.75.75 0 1 0 0-1.5h-2.68l2.81-2.81a.76.76 0 0 0 0-1.06a.76.76 0 0 0-1.06 0l-4.14 4.14Z" />

                              </svg>
                          </div>
                      </a>

                  </div>

                  {/* Brand Tagline */}
                  <div className="px-8 lg:px-12 pt-10 lg:pt-12 border-b border-[#ECEBF3]">
                      <div className="flex items-center gap-3 mb-4">
                          <img src="/assets/paypoint-icon.png" alt="Paypoint" className="w-8 h-8 rounded-full" />
                          <span className="text-sm font-semibold text-[#14132B] tracking-tight">Paypoint</span>
                      </div>
                      <p className="text-sm text-[#33323F] leading-relaxed max-w-xl mb-3">
                          Paypoint helps African businesses create payment pages, share one link and get paid directly
                          into their bank accounts.
                      </p>
                      <p className="text-sm font-semibold text-[#14132B] pb-10 lg:pb-12">Secure. Simple. Built for
                          growth.</p>
                  </div>

                  {/* Footer Links */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-10 p-8 lg:p-12 lg:gap-16">

                      {/* Product */}
                      <div className="flex flex-col gap-5">
                          <h4 className="text-[11px] font-bold text-[#9A99A8] uppercase tracking-widest">Product</h4>
                          <ul className="flex flex-col gap-3">
                              <li><a href="#" className="text-sm text-[#33323F] hover:text-[#14132B] transition-colors hover:translate-x-1 duration-200 inline-block">Payment
                                      pages</a></li>
                              <li><a href="#how-it-works" className="text-sm text-[#33323F] hover:text-[#14132B] transition-colors hover:translate-x-1 duration-200 inline-block">How
                                      it works</a></li>
                          </ul>
                      </div>

                      {/* Resources */}
                      <div className="flex flex-col gap-5">
                          <h4 className="text-[11px] font-bold text-[#9A99A8] uppercase tracking-widest">Resources</h4>
                          <ul className="flex flex-col gap-3">
                              <li><a href="#" className="text-sm text-[#33323F] hover:text-[#14132B] transition-colors hover:translate-x-1 duration-200 inline-block">Help</a>
                              </li>
                              <li><a href="#" className="text-sm text-[#33323F] hover:text-[#14132B] transition-colors hover:translate-x-1 duration-200 inline-block">Blog</a>
                              </li>
                          </ul>
                      </div>

                      {/* Company */}
                      <div className="flex flex-col gap-5">
                          <h4 className="text-[11px] font-bold text-[#9A99A8] uppercase tracking-widest">Company</h4>
                          <ul className="flex flex-col gap-3">
                              <li><a href="#" className="text-sm text-[#33323F] hover:text-[#14132B] transition-colors hover:translate-x-1 duration-200 inline-block">About</a>
                              </li>
                              <li><a href="#" className="text-sm text-[#33323F] hover:text-[#14132B] transition-colors hover:translate-x-1 duration-200 inline-block">Contact</a>
                              </li>
                          </ul>
                      </div>

                      {/* Legal */}
                      <div className="flex flex-col gap-5">
                          <h4 className="text-[11px] font-bold text-[#9A99A8] uppercase tracking-widest">Legal</h4>
                          <ul className="flex flex-col gap-3">
                              <li><a href="#" className="text-sm text-[#33323F] hover:text-[#14132B] transition-colors hover:translate-x-1 duration-200 inline-block">Privacy</a>
                              </li>
                              <li><a href="#" className="text-sm text-[#33323F] hover:text-[#14132B] transition-colors hover:translate-x-1 duration-200 inline-block">Terms</a>
                              </li>
                          </ul>
                      </div>

                  </div>

                  {/* Bottom Bar */}
                  <div className="flex flex-col md:flex-row justify-between items-center px-8 pb-10 pt-6 border-t border-[#ECEBF3] gap-6">
                      <div className="flex items-center gap-3">
                          <img src="/assets/paypoint-icon.png" alt="Paypoint" className="w-8 h-8 rounded-full" />
                          <span className="text-sm font-semibold text-[#14132B] tracking-tight">Paypoint</span>
                      </div>
                      <div className="flex items-center gap-6">
                          <p className="text-xs text-[#9A99A8] font-medium">© 2026 Paypoint</p>

                          {/* Theme/Language Toggles */}
                          <div className="flex items-center gap-3 pl-4 border-l border-[#ECEBF3]">
                              <button className="text-[#9A99A8] hover:text-[#14132B] transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" opacity=".5" />
                                      <path fill="currentColor" d="M12 18.5a6.5 6.5 0 0 0 0-13z" />
                                  </svg>
                              </button>
                              <button className="text-[#9A99A8] hover:text-[#14132B] transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" opacity=".5" />
                                      <path fill="currentColor" d="m14.55 15.8l-2.12-7.06a1.21 1.21 0 0 0-2.32-.01L7.98 15.8a.75.75 0 0 0 1.44.4l.39-1.28h2.88l.39 1.29a.75.75 0 0 0 1.44-.41zm-4.3-2.53l.83-2.78h.04l.84 2.78z" />

                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
      </main>
    </>
  );
}
