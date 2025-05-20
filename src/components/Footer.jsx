import React from 'react';

import logo from 'assets/Logo_White.png';
import phone from 'assets/Phone.svg';
import mail from 'assets/Mail.svg';

import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-left">
          <div className="footer-brand">
            <img src={logo} alt="Medcenter Cambodia" height="40" />
          </div>
          <p style={{ fontSize: '16px' }}>
            All information contained in and produced by Ang Firma Co., Ltd is provided for educational purposes only.
            This information should not be used for the diagnosis or treatment of any health problem or disease.
            <br />
            THIS INFORMATION IS NOT INTENDED TO REPLACE CLINICAL JUDGMENT OR GUIDE INDIVIDUAL PATIENT
            CARE IN ANY MANNER.
            <br />
            Copyright @{new Date().getFullYear()} by AngFirma.
          </p>
        </div>
        <div className="footer-right">
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px',
          }}
          >
            <img src={phone} alt="Phone icon" width="22" height="22" />
            <span style={{ fontSize: '16px', color: '#fff' }}>+855 38 383 8338</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={mail} alt="Mail icon" width="24" height="24" />
            <span style={{ fontSize: '16px', color: '#fff' }}>info@medcenter.com</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ justifyContent: 'flex-start' }}>
        <span>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            marginRight: '8px',
            backgroundColor: '#1877F2',
          }}
          />
          Facebook
        </span>
        <span>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            marginRight: '8px',
            backgroundColor: '#0076B2',
          }}
          />
          LinkedIn
        </span>
        <span>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            marginRight: '8px',
            backgroundColor: '#FF0000',
          }}
          />
          Youtube
        </span>
        <span>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            marginRight: '8px',
            backgroundColor: '#D63F90',
          }}
          />
          Instagram
        </span>
        <span>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            marginRight: '8px',
            backgroundColor: '#00F2EA',
          }}
          />
          Tiktok
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
