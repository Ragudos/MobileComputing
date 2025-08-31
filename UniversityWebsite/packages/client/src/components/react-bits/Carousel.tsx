import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue } from "framer-motion";
import type { Transition } from "framer-motion";
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
  visibleCount?: number; // NEW: number of items to show at once
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
  {
    title: "BS Criminology",
    description: "Bachelor of Science in Criminology",
    id: 17,
    icon: <FiUsers className="carousel-icon" />,
  },
  {
    title: "BS Pharmacy",
    description: "Bachelor of Science in Pharmacy",
    id: 18,
    icon: <FiBookOpen className="carousel-icon" />,
  },
];


const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  visibleCount = 1,
}: CarouselProps): React.JSX.Element {

  // Calculate item width so visibleCount items fit in baseWidth (with gaps)
  const containerPadding = 16;
  // Calculate number of pages for indicators
  const totalPages = Math.ceil(items.length / visibleCount);

  const carouselItems = loop ? [...items, items[0]] : items;
  // Clamp currentIndex so last window always shows up to visibleCount items
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // The first index of the last group
  const lastGroupFirstIndex = (totalPages - 1) * visibleCount;
  const maxIndex = Math.max(0, carouselItems.length - visibleCount);
  // Now that currentIndex is defined, calculate currentPage and last page logic
  const currentPage = Math.floor(currentIndex / visibleCount);
  const isLastPage = currentPage === totalPages - 1;
  const itemsOnLastPage = items.length % visibleCount === 0 ? visibleCount : items.length % visibleCount;
  const currentVisibleCount = isLastPage ? itemsOnLastPage : visibleCount;
  const totalGap = GAP * (currentVisibleCount - 1);
  const itemWidth = (baseWidth - containerPadding * 2 - totalGap) / currentVisibleCount;
  const trackItemOffset = itemWidth + GAP;
  // totalPages already calculated above
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
          if (prev >= lastGroupFirstIndex) {
            return loop ? 0 : lastGroupFirstIndex;
          }
          return Math.min(prev + visibleCount, lastGroupFirstIndex);
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    lastGroupFirstIndex,
    pauseOnHover,
    visibleCount,
  ]);

  const effectiveTransition: Transition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

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
      setCurrentIndex((prev) => {
        const next = prev + visibleCount;
        return !loop && next > lastGroupFirstIndex ? lastGroupFirstIndex : Math.min(next, lastGroupFirstIndex);
      });
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - visibleCount, 0));
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
          width: `${(itemWidth + GAP) * carouselItems.length - GAP}px`,
          display: 'flex',
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{
          x:
            !loop && currentIndex >= lastGroupFirstIndex
              ? -(lastGroupFirstIndex * trackItemOffset)
              : -(currentIndex * trackItemOffset),
        }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          if (!item) return null;
          // Only adjust width for items in the last page
          let thisItemWidth = itemWidth;
          if (isLastPage && index >= currentPage * visibleCount) {
            thisItemWidth = (baseWidth - containerPadding * 2 - totalGap) / itemsOnLastPage;
          }
          return (
            <motion.div
              key={index}
              className={`carousel-item ${round ? "round" : ""}`}
              style={{
                width: thisItemWidth,
                height: round ? thisItemWidth : "100%",
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              <div className={`carousel-item-header ${round ? "round" : ""}`}> 
                <span className="carousel-icon-container">{item.icon}</span>
              </div>
              <div className="carousel-item-content">
                <div className="carousel-item-title">{item.title}</div>
                <p className="carousel-item-description">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {Array.from({ length: totalPages }).map((_, pageIndex) => {
            // Determine if this indicator is active (currentIndex is within this page)
            const start = pageIndex * visibleCount;
            const end = start + visibleCount;
            const isActive = currentIndex >= start && currentIndex < end;
            return (
              <motion.div
                key={pageIndex}
                className={`carousel-indicator ${isActive ? "active" : "inactive"}`}
                animate={{
                  scale: isActive ? 1.2 : 1,
                }}
                onClick={() => {
                  // Clamp to lastGroupFirstIndex if clicking last indicator
                  if (!loop && pageIndex === totalPages - 1) {
                    setCurrentIndex(lastGroupFirstIndex);
                  } else {
                    setCurrentIndex(pageIndex * visibleCount);
                  }
                }}
                transition={{ duration: 0.15 }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
