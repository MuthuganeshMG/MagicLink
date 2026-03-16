const Disclaimer = () => {
  return (
    <section id="disclaimer" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4 animate-fade-up">
            Important
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-up animation-delay-200">
            <span className="text-gradient">Disclaimer</span> & Security
          </h2>
        </div>

        {/* Disclaimer Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Security Notice */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-glow animate-scale-in">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Security Notice
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Magic links are designed to be secure single-use tokens. Each 
                  link is unique to your email and session. Never share your 
                  magic link with anyone—it grants access to your account. If 
                  you didn't request a login, ignore the email.
                </p>
              </div>
            </div>
          </div>

          {/* Link Expiration */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-glow animate-scale-in animation-delay-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Link Expiration
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  For security purposes, magic links expire after a limited time 
                  (typically 15-60 minutes). Once clicked, the link becomes 
                  invalid and cannot be reused. If your link has expired, simply 
                  request a new one from the login page.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Disclaimer */}
          <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-glow animate-scale-in animation-delay-400">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Demo Project Notice
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  This is a demonstration project showcasing magic link 
                  authentication. While the implementation follows security best 
                  practices, it is provided "as-is" for educational purposes. 
                  For production use, ensure proper security audits and 
                  compliance with your organization's requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;