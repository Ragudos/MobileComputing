import { combineClassesOrNone } from "@/lib/utils";
import Facebook from "../svg/Facebok";
import Instagram from "../svg/Instagram";
import Mail from "../svg/Mail";
import Phone from "../svg/Phone";
import Pin from "../svg/Pin";
import Twitter from "../svg/Twitter";
import styles from "./footer.module.css"; // optional CSS module

const about = [
    {
        content: "Mission",
        href: "/about#mission",
    },
    {
        content: "Vision",
        href: "/about#vision",
    },
    {
        content: "History",
        href: "/about#history",
    },
];

const contacts = [
    {
        icon: Pin,
        content: "123 Innovation Drive, Sigma City",
        href: "https://www.google.com/maps?q=123+Innovation+Drive,+Sigma+City",
    },
    {
        icon: Phone,
        content: "+1 (555) 123-4567",
        href: "tel:+15551234567",
    },
    {
        icon: Mail,
        content: "admissions@sigmauniversity.edu",
        href: "mailto:admissions@sigmauniversity.edu",
    },
];

const socials = [
    {
        icon: Facebook,
        href: "#",
        content: "Facebook",
    },
    {
        icon: Instagram,
        href: "#",
        content: "Instagram",
    },
    {
        icon: Twitter,
        href: "#",
        content: "Twitter / X",
    },
];

export function Footer() {
    return (
        <footer className={combineClassesOrNone("container", styles.footer)}>
            <div className={styles.sectionContainer}>
                <div className={styles.logoContainer}>
                    <img
                        src="/android-chrome-192x192.png"
                        alt="University logo"
                        width={192}
                        height={192}
                    />
                </div>
                <div className={styles.contentWrapper}>
                    <h5>SigmaUniversity</h5>
                    <div className={styles.contentSectionWrapper}>
                        <section aria-labelledby="footer-about-title">
                            <h6 id="footer-about-title" className="h6">
                                About Us
                            </h6>
                            <ul>
                                {about.map((item) => (
                                    <li key={item.href}>
                                        <a href={item.href}>{item.content}</a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section aria-labelledby="footer-contact-title">
                            <h6 id="footer-contact-title" className="h6">
                                Contact Us
                            </h6>
                            <ul>
                                {contacts.map(
                                    ({ icon: Icon, href, content }) => (
                                        <li key={href + content}>
                                            <a href={href}>
                                                <Icon /> {content}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </section>
                        <section aria-labelledby="footer-social-title">
                            <h6 id="footer-social-title" className="h6">
                                Follow Us
                            </h6>
                            <ul>
                                {socials.map(
                                    ({ icon: Icon, href, content }) => (
                                        <li key={href + content}>
                                            <a href={href}>
                                                <Icon /> {content}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            <hr className={styles.separator} />
            <div className={styles.miscContainer}>
                <div className={styles.misc}>
                    <cite>Copyright &copy; 2025 Sigma</cite>
                    <a href="/terms-of-service">Terms of Service</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                </div>
                <div></div>
            </div>
        </footer>
    );
}
