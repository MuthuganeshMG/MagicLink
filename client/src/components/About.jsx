const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.15), transparent 70%)'
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4 animate-fade-up">
            The Story
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-up animation-delay-200">
            How I Thought Of
            <span className="block text-gradient">
              This Idea
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed animate-fade-up animation-delay-400">
            Traditional passwords are frustrating and insecure. Users forget them, 
            reuse weak ones, and hackers exploit them. Magic links solve this by 
            eliminating passwords entirely while maintaining security.
          </p>
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative animate-fade-up">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 animate-pulse-glow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-8">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full aspect-square rounded-lg bg-indigo-500/20 backdrop-blur-sm animate-float"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-indigo-500/20 backdrop-blur-sm flex items-center justify-center animate-float">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center animate-float animation-delay-2000">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-6 animate-fade-up animation-delay-200">
            <h3 className="text-2xl md:text-3xl font-bold">
              The <span className="text-gradient">Vision</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              I built this project to demonstrate how passwordless authentication 
              can be implemented simply and securely. The goal was to create a 
              seamless login experience that users actually enjoy.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When a user requests a login, a unique magic link is generated and 
              sent to their email. Clicking the link verifies their identity and 
              logs them in automatically—no password required.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: "100%", label: "Password-Free", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                { value: "1 min", label: "Link Expiry", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { value: "1-Click", label: "Login Time", icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 mb-2">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;