import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              HealthyThako <span className="text-gradient-middle ml-1">Trainers</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Connecting fitness enthusiasts with the best trainers in Bangladesh for a healthier lifestyle.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/healthythako"
                className="text-gray-400 hover:text-gradient-middle transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-800"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/healthythako"
                className="text-gray-400 hover:text-gradient-middle transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-800"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/healthythako"
                className="text-gray-400 hover:text-gradient-middle transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-800"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gradient-middle transition-colors p-2 bg-gray-800/50 rounded-full hover:bg-gray-800"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Find Trainers", href: "/trainers" },
                { name: "Categories", href: "/categories" },
                { name: "How It Works", href: "/how-it-works" },
                { name: "Become a Trainer", href: "#" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-gradient-middle transition-colors flex items-center group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Categories</h3>
            <ul className="space-y-3">
              {[
                { name: "Fitness Training", href: "/trainers?category=fitness-training" },
                { name: "Yoga", href: "/trainers?category=yoga" },
                { name: "Nutrition", href: "/trainers?category=nutrition" },
                { name: "Cardio", href: "/trainers?category=cardio" },
                { name: "Mindfulness", href: "/trainers?category=mindfulness" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-gradient-middle transition-colors flex items-center group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="font-medium text-white/80 mr-2">Email:</span>
                <a href="mailto:info@healthythako.com" className="hover:text-gradient-middle transition-colors">
                  info@healthythako.com
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-medium text-white/80 mr-2">Phone:</span>
                <a href="tel:+8801886102806" className="hover:text-gradient-middle transition-colors">
                  +880 1886102806
                </a>
              </li>
              <li className="flex items-start">
                <span className="font-medium text-white/80 mr-2">Address:</span>
                <span>Gulshan, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} HealthyThako Trainers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
