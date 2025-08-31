import {
    motion,
    PanInfo,
    Transition,
    useMotionValue,
    useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
// replace icons with your own if needed
import { FiBookOpen, FiBriefcase, FiCpu, FiUsers } from "react-icons/fi";
import "./Carousel.css";

export interface CarouselItem {
    title: string;
    description: string;
    id: number;
    icon: React.ReactElement;
}

export interface CarouselProps {
    items?: CarouselItem[];
    baseWidth?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    loop?: boolean;
    round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
    {
        title: "BS Computer Science",
        description: "Bachelor of Science in Computer Science",
        id: 1,
        icon: <FiCpu className="carousel-icon" />,
    },
    {
        title: "BS Information Technology",
        description: "Bachelor of Science in Information Technology",
        id: 2,
        icon: <FiCpu className="carousel-icon" />,
    },
    {
        title: "BS Information Systems",
        description: "Bachelor of Science in Information Systems",
        id: 3,
        icon: <FiCpu className="carousel-icon" />,
    },
    {
        title: "BS Business Administration",
        description: "Bachelor of Science in Business Administration",
        id: 4,
        icon: <FiBriefcase className="carousel-icon" />,
    },
    {
        title: "BS Accountancy",
        description: "Bachelor of Science in Accountancy",
        id: 5,
        icon: <FiBriefcase className="carousel-icon" />,
    },
    {
        title: "BS Psychology",
        description: "Bachelor of Science in Psychology",
        id: 6,
        icon: <FiUsers className="carousel-icon" />,
    },
    {
        title: "BA Communication",
        description: "Bachelor of Arts in Communication",
        id: 7,
        icon: <FiBookOpen className="carousel-icon" />,
    },
    {
        title: "BEED",
        description: "Bachelor of Elementary Education",
        id: 8,
        icon: <FiBookOpen className="carousel-icon" />,
    },
    {
        title: "BSED",
        description: "Bachelor of Secondary Education",
        id: 9,
        icon: <FiBookOpen className="carousel-icon" />,
    },
    {
        title: "BS Civil Engineering",
        description: "Bachelor of Science in Civil Engineering",
        id: 10,
        icon: <FiCpu className="carousel-icon" />,
    },
    {
        title: "BS Electrical Engineering",
        description: "Bachelor of Science in Electrical Engineering",
        id: 11,
        icon: <FiCpu className="carousel-icon" />,
    },
    {
        title: "BS Mechanical Engineering",
        description: "Bachelor of Science in Mechanical Engineering",
        id: 12,
        icon: <FiCpu className="carousel-icon" />,
    },
    {
        title: "BS Architecture",
        description: "Bachelor of Science in Architecture",
        id: 13,
        icon: <FiBookOpen className="carousel-icon" />,
    },
    {
        title: "BS Nursing",
        description: "Bachelor of Science in Nursing",
        id: 14,
        icon: <FiUsers className="carousel-icon" />,
    },
    {
        title: "BS Hospitality Management",
        description: "Bachelor of Science in Hospitality Management",
        id: 15,
        icon: <FiBriefcase className="carousel-icon" />,
    },
    {
        title: "BS Tourism Management",
        description: "Bachelor of Science in Tourism Management",
        id: 16,
        icon: <FiBriefcase className="carousel-icon" />,
    },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 300,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false,
}: CarouselProps): React.JSX.Element {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = loop ? [...items, items[0]] : items;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isResetting, setIsResetting] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (autoplay && (!pauseOnHover || !isHovered)) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev === items.length - 1 && loop) {
                        return prev + 1;
                    }
                    if (prev === carouselItems.length - 1) {
                        return loop ? 0 : prev;
                    }
                    return prev + 1;
                });
            }, autoplayDelay);
            return () => clearInterval(timer);
        }
    }, [
        autoplay,
        autoplayDelay,
        isHovered,
        loop,
        items.length,
        carouselItems.length,
        pauseOnHover,
    ]);

    const effectiveTransition = isResetting
        ? { duration: 0 }
        : (SPRING_OPTIONS as Transition<any>);

    const handleAnimationComplete = () => {
        if (loop && currentIndex === carouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50);
        }
    };

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            if (loop && currentIndex === items.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex((prev) =>
                    Math.min(prev + 1, carouselItems.length - 1)
                );
            }
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (loop && currentIndex === 0) {
                setCurrentIndex(items.length - 1);
            } else {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
        }
    };

    const dragProps = loop
        ? {}
        : {
              dragConstraints: {
                  left: -trackItemOffset * (carouselItems.length - 1),
                  right: 0,
              },
          };

    return (
        <div
            ref={containerRef}
            className={`carousel-container ${round ? "round" : ""}`}
            style={{
                width: `${baseWidth}px`,
                ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
            }}
        >
            <motion.div
                className="carousel-track"
                drag="x"
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
                    x,
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
            >
                {carouselItems.map((item, index) => {
                    const range = [
                        -(index + 1) * trackItemOffset,
                        -index * trackItemOffset,
                        -(index - 1) * trackItemOffset,
                    ];
                    const outputRange = [90, 0, -90];
                    const rotateY = useTransform(x, range, outputRange, {
                        clamp: false,
                    });
                    return (
                        <motion.div
                            key={index}
                            className={`carousel-item ${round ? "round" : ""}`}
                            style={{
                                width: itemWidth,
                                height: round ? itemWidth : "100%",
                                rotateY: rotateY,
                                ...(round && { borderRadius: "50%" }),
                            }}
                            transition={effectiveTransition}
                        >
                            <div
                                className={`carousel-item-header ${round ? "round" : ""}`}
                            >
                                <span className="carousel-icon-container">
                                    {item?.icon}
                                </span>
                            </div>
                            <div className="carousel-item-content">
                                <div className="carousel-item-title">
                                    {item?.title}
                                </div>
                                <p className="carousel-item-description">
                                    {item?.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
            <div
                className={`carousel-indicators-container ${round ? "round" : ""}`}
            >
                <div className="carousel-indicators">
                    {items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`carousel-indicator ${
                                currentIndex % items.length === index
                                    ? "active"
                                    : "inactive"
                            }`}
                            animate={{
                                scale:
                                    currentIndex % items.length === index
                                        ? 1.2
                                        : 1,
                            }}
                            onClick={() => setCurrentIndex(index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
