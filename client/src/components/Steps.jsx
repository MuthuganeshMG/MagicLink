const steps = [
  {
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    step: "01",
    title: "Enter Your Email",
    description: "User visits the login page and enters their email address. No password field needed.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    step: "02",
    title: "Magic Link Generated",
    description: "The system generates a unique, secure token and creates a one-time-use magic link.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    step: "03",
    title: "Email Delivered",
    description: "The magic link is sent to the user's email inbox. The link expires after a set time.",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    step: "04",
    title: "Click & Logged In",
    description: "User clicks the link, the token is verified, and they're instantly authenticated.",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

const Steps = () => {
  return (
    <section id="steps" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4 animate-fade-up">
            The Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-up animation-delay-200">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed animate-fade-up animation-delay-400">
            A simple 4-step flow that makes authentication effortless. 
            Here's exactly what happens behind the scenes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-glow animate-scale-in"
            >
              {/* Step Number Background */}
              <div
                className={`aspect-video bg-gradient-to-br ${item.color} relative overflow-hidden flex items-center justify-center`}
              >
                <span className="text-8xl font-bold text-white/10">
                  {item.step}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step Info */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-indigo-400 font-semibold tracking-wider">
                    STEP {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-gradient transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;