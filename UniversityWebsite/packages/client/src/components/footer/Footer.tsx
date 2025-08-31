import React from "react";
import styles from "./footer.module.css"; // optional CSS module
import ClickSpark from "@/components/react-bits/ClickSpark";

export function Footer() {
  return (
    <ClickSpark
      sparkColor='#44bf98'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <footer className={styles.footer}>
        <div className={styles.topSection}>
          {/* Logo + One-liner */}
          <div className={styles.branding}>
            <img
              src="android-chrome-512x512.png" // replace with your actual logo path
              alt="Sigma University Logo"
              className={styles.logo}
            />
            <p className={styles.tagline}>
              Shaping the Leaders of Tomorrow through Excellence and Innovation.
            </p>
          </div>

          {/* Contact Info */}
          <div className={styles.contact}>
            <h4>Contact Us</h4>
            <p>📍 123 Innovation Drive, Sigma City</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ admissions@sigmauniversity.edu</p>
          </div>

          {/* Social Media Links */}
          <div className={styles.socials}>
            <h4>Connect With Us</h4>
            <ul className={styles.socialList}>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter / X</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className={styles.bottomLine}>
          <p>© {new Date().getFullYear()} Sigma University. All Rights Reserved.</p>
        </div>
      </footer>
    </ClickSpark>
  );
}
