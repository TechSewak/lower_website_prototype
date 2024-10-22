import { useState } from 'react'
import { Phone, Mail, MapPin, ChevronDown, Menu, X } from 'lucide-react'

export default function ImpressiveLawFirmWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  const specialties = [
    { id: 'criminal', title: 'Criminal Cases', description: 'Expert representation in all types of criminal cases, from misdemeanors to felonies.' },
    { id: 'divorce', title: 'Divorce', description: 'Compassionate and skilled handling of divorce proceedings, ensuring fair settlements.' },
    { id: 'marriage', title: 'Court Marriage', description: 'Efficient and legally sound court marriage services for couples.' },
    { id: 'registration', title: 'Court Marriage Registration', description: 'Seamless registration process for court marriages, ensuring legal validity.' },
    { id: 'rent', title: 'Rent Agreement', description: 'Drafting and review of comprehensive rent agreements to protect landlord and tenant rights.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Saraswat & Singh</h1>
          <nav className="hidden md:flex space-x-6">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-300 transition duration-150">
                {item}
              </a>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800">
            <nav className="container mx-auto px-4 py-2 flex flex-col">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="py-2 hover:text-blue-300 transition duration-150">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Expert Legal Solutions</h2>
            <p className="text-xl mb-8">Protecting Your Rights with Dedication and Expertise</p>
            <a href="#contact" className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
              Get Free Consultation
            </a>
          </div>
        </section>

        <section id="about" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Esteemed Advocates</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: "Brajesh Saraswat", phone: "7983043791", image: "/placeholder.svg?height=400&width=300" },
                { name: "Om Kumar Singh", phone: "8445484999", image: "/placeholder.svg?height=400&width=300" },
              ].map((advocate) => (
                <div key={advocate.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={advocate.image} alt={advocate.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{advocate.name}</h3>
                    <p className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {advocate.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Legal Expertise</h2>
            <div className="space-y-4">
              {specialties.map((specialty) => (
                <div key={specialty.id} className="bg-white rounded-lg shadow">
                  <button
                    className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center focus:outline-none"
                    onClick={() => toggleAccordion(specialty.id)}
                  >
                    {specialty.title}
                    <ChevronDown className={`transform transition-transform duration-200 ${activeAccordion === specialty.id ? 'rotate-180' : ''}`} />
                  </button>
                  {activeAccordion === specialty.id && (
                    <div className="px-6 pb-4">
                      <p>{specialty.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  <button type="submit" className="bg-blue-900 text-white px-6 py-3 rounded font-semibold hover:bg-blue-800 transition duration-300">
                    Send Message
                  </button>
                </form>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-2 text-blue-900" />
                  <p>Collectorate Court, District Aligarh, Uttar Pradesh</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-2 text-blue-900" />
                  <p>7983043791 / 8445484999</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-blue-900" />
                  <p>info@saraswatsinghlaw.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Saraswat & Singh Law Associates. All rights reserved.</p>
          <p className="mt-2">Serving justice with excellence since 1995</p>
        </div>
      </footer>
    </div>
  )
}