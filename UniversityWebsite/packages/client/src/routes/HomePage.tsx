import siteData from "@/lib/site_data.json";
import { combineClassesOrNone } from "@/lib/utils";
import { Link } from "react-router";
import homepageStyles from "./homepage.module.css";

const testimonials = [
    {
        quote: "Sigma University gave me the confidence and skills to launch my startup before graduation.",
        author: "Alex M., Class of 2023",
    },
    {
        quote: "The mentorship and hands-on learning set Sigma apart from any other university.",
        author: "Sarah L., Class of 2024",
    },
    {
        quote: "I found lifelong friends and mentors at Sigma who helped me grow beyond academics.",
        author: "Priya S., Class of 2022",
    },
    {
        quote: "The campus community is vibrant, supportive, and always buzzing with new ideas.",
        author: "Miguel R., Class of 2025",
    },
    {
        quote: "Sigma's focus on innovation and leadership prepared me for a global career.",
        author: "Lina T., Class of 2021",
    },
];

function HomePage() {
    return (
        <main
            className={combineClassesOrNone(
                "container",
                homepageStyles.mainContent
            )}
        >
            <section
                aria-labelledby="hero-title"
                aria-describedby="hero-desc"
                className={homepageStyles.heroSection}
            >
                <div className={homepageStyles.contentContainer}>
                    <div>
                        <h1 className="brandingFont" id="hero-title">
                            {siteData.sections.hero.title}
                        </h1>
                        <p id="hero-desc">{siteData.sections.hero.subtitle}</p>
                    </div>
                    <Link
                        to="/auth/login"
                        className={combineClassesOrNone(
                            "cta",
                            homepageStyles.applyButton
                        )}
                    >
                        Apply Now!
                    </Link>
                </div>
            </section>

            <section
                aria-labelledby="mission-title"
                aria-describedby="mission-desc"
                className={homepageStyles.missionSection}
            >
                <div className={homepageStyles.contentContainer}>
                    <h2 id="mission-title">
                        {siteData.sections.mission.title}
                    </h2>
                    <p id="mission-desc">
                        {siteData.sections.mission.subtitle}
                    </p>
                </div>
            </section>

            <section
                aria-labelledby="benefits-title"
                aria-describedby="benefits-desc"
                className={homepageStyles.benefitsSection}
            >
                <div className={homepageStyles.contentContainer}>
                    <h2 id="benefits-title">
                        {siteData.sections.benefits.title}
                    </h2>
                    <p id="benefits-desc">
                        {siteData.sections.benefits.subtitle}
                    </p>
                </div>
            </section>

            <section
                aria-labelledby="programs-title"
                aria-describedby="programs-desc"
                className={homepageStyles.programsSection}
            >
                <div className={homepageStyles.contentContainer}>
                    <h2 id="programs-title">
                        {siteData.sections.programs.title}
                    </h2>
                    <p id="programs-desc">
                        {siteData.sections.programs.subtitle}
                    </p>
                </div>
            </section>

            <section
                aria-labelledby="sneakpeek-title"
                aria-describedby="sneakpeek-desc"
                className={homepageStyles.sneakpeekSection}
            >
                <div className={homepageStyles.contentContainer}>
                    <h2 id="sneakpeek-title">
                        {siteData.sections.sneakpeek.title}
                    </h2>
                    <p id="sneakpeek-desc">
                        {siteData.sections.sneakpeek.subtitle}
                    </p>
                </div>
            </section>

            <section
                aria-labelledby="testimonials-title"
                aria-describedby="testimonials-desc"
                className={homepageStyles.testimonialsSection}
            >
                <div className={homepageStyles.contentContainer}>
                    <h2 id="testimonials-title">
                        {siteData.sections.testimonials.title}
                    </h2>
                    <p id="testimonials-desc">
                        {siteData.sections.testimonials.subtitle}
                    </p>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
