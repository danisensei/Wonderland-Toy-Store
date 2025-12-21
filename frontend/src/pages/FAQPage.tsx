import React from 'react';
import { FaQuestionCircle, FaTruck, FaLock, FaUndoAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      icon: <FaTruck />,
      question: 'How long does shipping take?',
      answer:
        'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days. Orders are processed within 24 hours of placement.',
    },
    {
      icon: <FaLock />,
      question: 'Is my payment information secure?',
      answer:
        'Yes! We use industry-standard SSL encryption to protect your payment information. All transactions are processed securely through trusted payment gateways.',
    },
    {
      icon: <FaUndoAlt />,
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy on most items. Products must be in original condition with all packaging and documentation. Simply contact our support team to initiate a return.',
    },
    {
      icon: <FaPhone />,
      question: 'Do you offer customer support?',
      answer:
        'Absolutely! Our customer support team is available 24/7 via email, phone, and live chat. We respond to inquiries within 2 hours during business hours.',
    },
    {
      icon: <FaEnvelope />,
      question: 'How can I track my order?',
      answer:
        'You can track your order in real-time through your account dashboard. You\'ll also receive email notifications at each stage of shipping.',
    },
    {
      icon: <FaQuestionCircle />,
      question: 'Do you ship internationally?',
      answer:
        'Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by location. International orders may be subject to customs duties.',
    },
  ];

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-lg">
              Find answers to common questions about our products and services
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="card group cursor-pointer">
                <summary className="flex items-start gap-4 py-4 font-semibold list-none hover:text-primary transition">
                  <span className="text-2xl text-primary flex-shrink-0 mt-1">
                    {faq.icon}
                  </span>
                  <span className="flex-1 text-left">{faq.question}</span>
                  <span className="text-2xl flex-shrink-0 group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <div className="pl-16 pb-4 text-gray-600 border-t border-gray-200 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-8 bg-primary text-white rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Didn't find what you're looking for?</h2>
            <p className="mb-6">
              Our customer support team is here to help!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="mailto:support@wonderlandtoys.com"
                className="btn bg-white text-primary hover:bg-gray-100"
              >
                Email Us
              </a>
              <a href="tel:+15551234567" className="btn bg-white text-primary hover:bg-gray-100">
                Call Us
              </a>
              <button className="btn bg-white text-primary hover:bg-gray-100">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

