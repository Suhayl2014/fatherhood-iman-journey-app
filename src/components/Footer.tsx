import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";

const Footer = () => {
  return (
    <footer className="bg-islamic-cream py-6 sm:py-8 border-t border-islamic-sand/30 hidden md:block">
      <div className="container-app px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="md:col-span-1">
            <Link to="/">
              <BrandLogo size="md" />
            </Link>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-islamic-green/80">
              Supporting Muslim fathers on their journey through parenthood with Islamic wisdom and practical guidance.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-islamic-green mb-3 sm:mb-4 text-sm sm:text-base">Features</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link to="/lessons" className="text-xs sm:text-sm hover:text-islamic-teal">Islamic Lessons</Link></li>
              <li><Link to="/milestones" className="text-xs sm:text-sm hover:text-islamic-teal">Child Milestones</Link></li>
              <li><Link to="/community" className="text-xs sm:text-sm hover:text-islamic-teal">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-islamic-green mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-xs sm:text-sm hover:text-islamic-teal">Help Center</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-islamic-teal">Privacy Policy</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-islamic-teal">Terms of Service</a></li>
              <li><a href="#" className="text-xs sm:text-sm hover:text-islamic-teal">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-islamic-green mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4">Join our community of Muslim fathers supporting each other.</p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-xs sm:text-sm hover:text-islamic-teal">Facebook</a>
              <a href="#" className="text-xs sm:text-sm hover:text-islamic-teal">Twitter</a>
              <a href="#" className="text-xs sm:text-sm hover:text-islamic-teal">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-islamic-sand/30 text-center">
          <p className="text-xs sm:text-sm text-islamic-green/60">
            &copy; {new Date().getFullYear()} Fatherhood Journey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
