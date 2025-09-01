import { useMediaQuery } from "@/lib/hooks";
import siteData from "@/lib/site_data.json";
import { combineClassesOrNone } from "@/lib/utils";
import { UNIVERSITY_PROGRAMS } from "@university-website/shared";
import { Link } from "react-router";
import homepageStyles from "./homepage.module.css";

const programs = UNIVERSITY_PROGRAMS.map((program, idx) => ({
    title: program.split(")")[0] + ")",
    description: program.split(")")[1] || "",
}));

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

const sneakpeak = [
    "Modern dormitories & eco-friendly campus",
    "Sports facilities, gyms, and wellness programs",
    "Cultural events, hackathons, and leadership summits",
];

const benefits = [
    "Cutting-edge curriculum designed with industry leaders",
    "State-of-the-art labs, libraries, and digital resources",
    "Experienced faculty and global partnerships",
    "Strong focus on leadership, ethics, and innovation",
    "A vibrant student community with 50+ clubs and organizations",
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
                id="hero"
                aria-labelledby="hero-title"
                aria-describedby="hero-desc"
                className={homepageStyles.heroSection}
            >
                <div className={homepageStyles.contentContainer}>
                    <div className={homepageStyles.heroContent}>
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
                id="mission"
                aria-labelledby="mission-title"
                aria-describedby="mission-desc"
                className={homepageStyles.missionSection}
            >
                <div className={homepageStyles.contentContainer}>
                    <div className={homepageStyles.missionContent}>
                        <h2 id="mission-title">
                            {siteData.sections.mission.title}
                        </h2>
                        <p id="mission-desc">
                            {siteData.sections.mission.subtitle}
                        </p>
                    </div>

                    <div className={homepageStyles.missionImageContainer}>
                        <img
                            src="/images/mission.webp"
                            alt=""
                            role="presentation"
                        />
                    </div>
                </div>
            </section>

            <section
                id="benefits"
                aria-labelledby="benefits-title"
                aria-describedby="benefits-desc"
                className={homepageStyles.benefitsSection}
            >
                <div className={homepageStyles.contentWrapper}>
                    <div className={homepageStyles.contentContainer}>
                        <h2 id="benefits-title">
                            {siteData.sections.benefits.title}
                        </h2>
                        <p id="benefits-desc">
                            {siteData.sections.benefits.subtitle}
                        </p>
                    </div>
                    <ul className={homepageStyles.benefitsList}>
                        {benefits.map((benefit, index) => (
                            <li key={index + benefit}>{benefit}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section
                id="programs"
                aria-labelledby="programs-title"
                aria-describedby="programs-desc"
                className={homepageStyles.programsSection}
            >
                <div className={homepageStyles.contentWrapper}>
                    <div className={homepageStyles.contentContainer}>
                        <h2 id="programs-title">
                            {siteData.sections.programs.title}
                        </h2>
                        <p id="programs-desc">
                            {siteData.sections.programs.subtitle}
                        </p>
                    </div>

                    <Programs />
                </div>
            </section>

            <section
                id="sneakpeek"
                aria-labelledby="sneakpeek-title"
                aria-describedby="sneakpeek-desc"
                className={homepageStyles.sneakpeekSection}
            >
                <div className={homepageStyles.contentWrapper}>
                    <div className={homepageStyles.sneakpeekImageContainer}>
                        <img
                            src="/images/sneakpeek.webp"
                            alt=""
                            role="presentation"
                        />
                    </div>
                    <div className={homepageStyles.contentContainer}>
                        <div className={homepageStyles.content}>
                            <h2 id="sneakpeek-title">
                                {siteData.sections.sneakpeek.title}
                            </h2>
                            <p id="sneakpeek-desc">
                                {siteData.sections.sneakpeek.subtitle}
                            </p>
                        </div>
                        <ul className={homepageStyles.sneakpeekList}>
                            {sneakpeak.map((item, index) => (
                                <li key={index + item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section
                id="testimonials"
                aria-labelledby="testimonials-title"
                aria-describedby="testimonials-desc"
                className={homepageStyles.testimonialsSection}
            >
                <div className={homepageStyles.contentWrapper}>
                    <div className={homepageStyles.contentContainer}>
                        <h2 id="testimonials-title">
                            {siteData.sections.testimonials.title}
                        </h2>
                        <p id="testimonials-desc">
                            {siteData.sections.testimonials.subtitle}
                        </p>
                    </div>

                    <ul className={homepageStyles.testimonialsList}>
                        {testimonials.map((testimonial, index) => {
                            return (
                                <li
                                    key={index}
                                    className={homepageStyles.testimonialItem}
                                >
                                    <small>{testimonial.author}</small>
                                    <blockquote>
                                        "{testimonial.quote}"
                                    </blockquote>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </main>
    );
}

function Programs() {
    const matches = useMediaQuery("(prefers-reduced-motion: no-preference)");

    return (
        <div
            data-animated={matches}
            className={homepageStyles.programsContainer}
        >
            <ul className={homepageStyles.programsList}>
                {programs.map((program) => (
                    <li key={program.title}>
                        <div>{program.title}</div>
                        <div>{program.description}</div>
                    </li>
                ))}
                {matches && (
                    <>
                        {programs.map((program) => (
                            <li aria-hidden="true" key={program.title + "2"}>
                                <div>{program.title}</div>
                                <div>{program.description}</div>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
}

export default HomePage;
