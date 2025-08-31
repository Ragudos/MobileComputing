import BlurText from "@/components/react-bits/BlurText";
import Carousel from "@/components/react-bits/Carousel";
import ClickSpark from "@/components/react-bits/ClickSpark";
import { Button } from "@/components/ui/button/Button";
import { combineClassesOrNone } from "@/lib/utils";
import React from "react";
import { useNavigate } from "react-router";
import homepageStyles from "./homepage.module.css";

const handleAnimationComplete = () => {
    console.log("Animation completed!");
};

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
    const navigate = useNavigate();

    const [testimonialIndex, setTestimonialIndex] = React.useState(0);
    const handlePrev = () =>
        setTestimonialIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    const handleNext = () =>
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    return (
        <>
            <ClickSpark
                sparkColor="#44bf98"
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
            >
                <main className={combineClassesOrNone("container")}>
                    <section className={homepageStyles.heroBackground}>
                        <BlurText
                            text="Welcome to Sigma"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            onAnimationComplete={handleAnimationComplete}
                            className={combineClassesOrNone(
                                "h1",
                                homepageStyles.blurText
                            )}
                        />
                        <BlurText
                            text="On our campus, world-class faculty and talented students come together to create a better world through groundbreaking research, cutting-edge innovations, and transformative scholarly work."
                            delay={0}
                            animateBy="words"
                            direction="top"
                            onAnimationComplete={handleAnimationComplete}
                            className={combineClassesOrNone(
                                "p",
                                homepageStyles.paraText
                            )}
                        />
                        <Button
                            variant="primary"
                            onClick={() => navigate("/auth/login")}
                        >
                            Apply Now!
                        </Button>
                    </section>

                    <section className={homepageStyles.missionSection}>
                        <div className={homepageStyles.row1}>
                            <h4>A Mission Defined by Possibility</h4>
                            <p className={homepageStyles.paraSec2}>
                                At Sigma, our mission of discovery and learning
                                is energized by a spirit of optimism and
                                possibility that dates to our founding. Here
                                you’ll find a place of intellectual
                                expansiveness, wide-ranging perspectives, and
                                freedom to explore new lines of thinking.
                                Buzzing with ideas and innovation, approaching
                                questions with openness and curiosity, pursuing
                                excellence in all we do – this is Sigma.
                            </p>
                            <Button
                                variant="primary"
                                onClick={() => navigate("/about")}
                                className={homepageStyles.but}
                            >
                                More about Sigma
                            </Button>
                        </div>
                        <div className={homepageStyles.imageContainer}>
                            <img
                                src="/sec2pic.jpg"
                                className={homepageStyles.section2Image}
                            ></img>
                        </div>
                    </section>
                    <section className={homepageStyles.bentoSection}>
                        <h3 className={homepageStyles.bentoTitle}>
                            Explore Our Programs
                        </h3>
                        <p className={homepageStyles.bentoSubtitle}>
                            Our academic offerings are designed to balance
                            theory, practice, and innovation.
                        </p>

                        <div
                            style={{
                                height: "auto",
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Carousel
                                baseWidth={1000}
                                autoplay={false}
                                autoplayDelay={2000}
                                pauseOnHover={false}
                                loop={false}
                                round={false}
                                visibleCount={3}
                            />
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/auth/login")}
                            className={homepageStyles.but}
                        >
                            Apply Now!
                        </Button>
                    </section>
                    <section className={homepageStyles.advantageSection}>
                        <h3 className={homepageStyles.advantageTitle}>
                            The Sigma Advantage
                        </h3>
                        <ul className={homepageStyles.advantageList}>
                            <li className={homepageStyles.advantageItem}>
                                Cutting-edge curriculum designed with industry
                                leaders
                            </li>
                            <li className={homepageStyles.advantageItem}>
                                State-of-the-art labs, libraries, and digital
                                resources
                            </li>
                            <li className={homepageStyles.advantageItem}>
                                Experienced faculty and global partnerships
                            </li>
                            <li className={homepageStyles.advantageItem}>
                                Strong focus on leadership, ethics, and
                                innovation
                            </li>
                            <li className={homepageStyles.advantageItem}>
                                A vibrant student community with 50+ clubs and
                                organizations
                            </li>
                        </ul>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/auth/login")}
                            className={homepageStyles.but}
                        >
                            Apply Now!
                        </Button>
                    </section>
                    <section className={homepageStyles.lifeSection}>
                        <div className={homepageStyles.lifeImageRow}>
                            <img
                                src="/sec5img.jpg"
                                alt="Life at Sigma"
                                className={homepageStyles.lifeImage}
                            />
                        </div>
                        <div className={homepageStyles.lifeTextRow}>
                            <h3>Life at Sigma</h3>
                            <p>
                                Sigma University is more than just classrooms
                                and exams—it’s a hub of creativity,
                                collaboration, and personal growth.
                            </p>
                            <ul className={homepageStyles.lifeList}>
                                <li>
                                    Modern dormitories & eco-friendly campus
                                </li>
                                <li>
                                    Sports facilities, gyms, and wellness
                                    programs
                                </li>
                                <li>
                                    Cultural events, hackathons, and leadership
                                    summits
                                </li>
                            </ul>
                            <Button
                                variant="primary"
                                onClick={() => navigate("/auth/login")}
                            >
                                Apply Now!
                            </Button>
                        </div>
                    </section>
                    <section className={homepageStyles.testimonialSection}>
                        <h3 className={homepageStyles.testimonialTitle}>
                            Hear From Our Students
                        </h3>
                        <div className={homepageStyles.testimonialCarousel}>
                            <button
                                aria-label="Previous testimonial"
                                onClick={handlePrev}
                                className={homepageStyles.testimonialNavBtn}
                                type="button"
                            >
                                &#8592;
                            </button>
                            <div className={homepageStyles.testimonialCard}>
                                {testimonials[testimonialIndex] ? (
                                    <>
                                        <p
                                            className={
                                                homepageStyles.testimonialQuote
                                            }
                                        >
                                            “
                                            {
                                                testimonials[testimonialIndex]
                                                    .quote
                                            }
                                            ”
                                        </p>
                                        <span
                                            className={
                                                homepageStyles.testimonialAuthor
                                            }
                                        >
                                            {
                                                testimonials[testimonialIndex]
                                                    .author
                                            }
                                        </span>
                                    </>
                                ) : null}
                            </div>
                            <button
                                aria-label="Next testimonial"
                                onClick={handleNext}
                                className={homepageStyles.testimonialNavBtn}
                                type="button"
                            >
                                &#8594;
                            </button>
                        </div>
                        <div
                            style={{
                                marginTop: 12,
                                display: "flex",
                                gap: 6,
                                justifyContent: "center",
                            }}
                        >
                            {testimonials.map((_, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        display: "inline-block",
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background:
                                            idx === testimonialIndex
                                                ? "var(--brand-color, #0057B8)"
                                                : "#cce0f6",
                                        transition: "background 0.2s",
                                    }}
                                />
                            ))}
                        </div>
                    </section>
                    <section className={homepageStyles.journeySection}>
                        <h3>Ready to Begin Your Journey?</h3>
                        <p>
                            Join a community of thinkers, innovators, and
                            leaders at Sigma University.
                        </p>
                        <Button
                            variant="default"
                            className={homepageStyles.but}
                            onClick={() => navigate("/auth/login")}
                        >
                            Start Your Application
                        </Button>
                    </section>
                </main>
            </ClickSpark>
        </>
    );
}

export default HomePage;
