import styles from "./aboutpage.module.css";

function AboutPage() {
    return (
        <>
            <main className={styles.container}>
                <div className={styles.campusSection}>
                    <img
                        src="sigmaCampus.png" // replace with your campus image path
                        alt="Sigma University Campus"
                        className={styles.campusImage}
                    />
                </div>

                {/* About Section */}
                <section className={styles.section}>
                    <div className={styles.textBlock}>
                        <h1 className={styles.heading}>
                            About Sigma University
                        </h1>
                        <p className={styles.paragraph}>
                            Founded in 2005 in Sigma City, Sigma University was
                            established to meet the growing demand for globally
                            competitive graduates in technology, business,
                            healthcare, and the arts. What began with just three
                            programs and fewer than 500 students has evolved
                            into a thriving institution known for innovation,
                            leadership, and service.
                        </p>
                        <p className={styles.paragraph}>
                            Today, Sigma University is home to state-of-the-art
                            laboratories, research centers, and international
                            exchange programs. With thousands of alumni around
                            the world, we are recognized as a hub for
                            cutting-edge research, entrepreneurial incubation,
                            and community-driven initiatives.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className={styles.section}>
                    <div className={styles.textBlock}>
                        <h2 className={styles.subheading}>Our Mission</h2>
                        <p className={styles.paragraph1}>
                            To nurture competent, ethical, and innovative
                            individuals by providing world-class education,
                            fostering research and creativity, and empowering
                            students to lead and serve in a rapidly changing
                            world.
                        </p>
                        <ul className={styles.list}>
                            <li>
                                Deliver quality education grounded in global
                                standards.
                            </li>
                            <li>
                                Promote research and innovation that solve
                                real-world problems.
                            </li>
                            <li>
                                Instill leadership and integrity in every
                                graduate.
                            </li>
                            <li>
                                Build a community committed to service and
                                sustainable progress.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Vision Section */}
                <section className={styles.section}>
                    <div className={styles.textBlock}>
                        <h2 className={styles.subheading}>Our Vision</h2>
                        <p className={styles.paragraph1}>
                            To be a leading global university recognized for
                            excellence in education, innovation, and societal
                            impact—producing leaders who drive positive change
                            across nations.
                        </p>
                        <ul className={styles.list}>
                            <li>
                                Achieve academic excellence with future-ready
                                programs.
                            </li>
                            <li>
                                Lead in technological and scientific
                                breakthroughs.
                            </li>
                            <li>
                                Foster a culture of inclusivity, diversity, and
                                collaboration.
                            </li>
                            <li>
                                Build graduates who embody Sigma: Strength,
                                Innovation, Growth, Mindset, and Accountability.
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}

export default AboutPage;
