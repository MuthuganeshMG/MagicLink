import { IoLogoGithub } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const footerLinks = {
    navigation: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "How It Works", href: "#steps" },
      { label: "Disclaimer", href: "#disclaimer" },
    ],

    social: [
      {
        icon: <IoLogoGithub size={20} />,
        label: "GitHub",
        href: "https://github.com/MuthuganeshMG",
      },
      {
        icon: <FaLinkedinIn size={20} />,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/muthuganesh3597/",
      },
      {
        icon: <AiOutlineMail size={20} />,
        label: "Email",
        href: "https://mail.google.com/mail/u/0/#inbox",
      },
    ],
  };

  return (
    <footer className="bg-[#0a0f1e] border-t border-white/10 py-16">
      <div className="container mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="inline-flex items-center gap-2 text-2xl font-bold"
            >
              <svg
                className="w-6 h-6 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>

              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                MagicLink
              </span>
            </a>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Secure passwordless authentication made simple.
              One click to login, no passwords to remember.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Quick Links
            </h4>

            <nav className="flex flex-col gap-3">
              {footerLinks.navigation.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-gray-400 hover:text-indigo-400 transition duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Connect With Me
            </h4>

            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    w-11 h-11
                    rounded-lg
                    bg-white/5
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-indigo-500
                    hover:text-white
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with 
            <svg 
              className="w-4 h-4 text-red-500 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10
                6.343l1.172-1.171a4 4 0 115.656
                5.656L10 17.657l-6.828-6.829a4
                4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
              MG_official for secure authentication
          </p>

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MagicLink Auth.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;