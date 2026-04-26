import React from 'react';
import Layout from '../../components/Layout';

export default function Help() {
  const faqs = [
    { q: 'How do I submit a maintenance complaint?', a: 'Go to the Maintenance section from the sidebar and enter your complaint in the text area, then click Submit.' },
    { q: 'How do I view my payment history?', a: 'Navigate to the Payments section from your dashboard sidebar to see all transactions.' },
    { q: 'How do I update my profile details?', a: 'Click on Profile in the sidebar, update your details, and click the Save button.' },
    { q: 'How can I contact the apartment management?', a: 'You can raise a maintenance complaint or contact the admin through the Help section.' },
    { q: 'What is the maintenance billing cycle?', a: 'Maintenance bills are generated monthly and include service charges, repair fund, utilities, and other applicable charges.' },
  ];

  return (
    <Layout>
      <div className="page-header"><h1>HELP & SUPPORT</h1><p>Frequently asked questions and support</p></div>
      <div className="row g-3">
        <div className="col-md-8">
          <div className="glass-card">
            <h5>Frequently Asked Questions</h5>
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, i) => (
                <div key={i} className="mb-2" style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ padding: '0.85rem 1rem', cursor: 'pointer', background: 'rgba(45,27,105,0.3)', color: 'white', fontWeight: 500, fontSize: '0.9rem' }}
                    onClick={e => { const el = e.currentTarget.nextSibling; el.style.display = el.style.display === 'none' ? 'block' : 'none'; }}>
                    <i className="bi bi-question-circle me-2" style={{ color: 'var(--accent)' }}></i>{faq.q}
                  </div>
                  <div style={{ display: 'none', padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', color: 'var(--text-muted)', fontSize: '0.87rem' }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="glass-card">
            <h5>Contact Support</h5>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>For urgent issues, contact us directly:</p>
            {[
              { icon: 'bi-telephone-fill', label: 'Phone', value: '+91 98765 43210' },
              { icon: 'bi-envelope-fill', label: 'Email', value: 'support@skypark.com' },
              { icon: 'bi-geo-alt-fill', label: 'Office', value: 'Block A, Ground Floor' },
              { icon: 'bi-clock-fill', label: 'Hours', value: '9 AM – 6 PM, Mon–Sat' },
            ].map((c, i) => (
              <div key={i} className="d-flex align-items-center gap-3 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <i className={`bi ${c.icon}`} style={{ color: 'var(--accent)', fontSize: '1.1rem' }}></i>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.label}</div>
                  <div style={{ fontSize: '0.88rem' }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
