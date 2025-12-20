import { Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Use Cases', href: '#use-cases' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' }
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'GDPR', href: '#' }
    ]
  };

  const socials = [
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Github, href: '#' },
    { icon: Mail, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-xl text-white">SmartScreen AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm text-sm sm:text-base">
              Automatically detect plagiarism and AI-generated content in form submissions. 
              Built for recruiters and educators who value authenticity.
            </p>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-indigo-400 transition-colors text-sm sm:text-base">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-indigo-400 transition-colors text-sm sm:text-base">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-indigo-400 transition-colors text-sm sm:text-base">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
          <p className="text-gray-500">
            © 2025 SmartScreen AI. All rights reserved.
          </p>
          <p className="text-gray-500">
            Made with ❤️ for recruiters and educators
          </p>
        </div>
      </div>
    </footer>
  );
}