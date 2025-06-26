"use client";
import { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useCursor } from "../context/CursorContext";

interface MousePosition {
  x: number;
  y: number;
}

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  velocity: { x: number; y: number };
}

interface PhysicsTrail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  id: number;
}

const MAX_PATH_HISTORY = 20;
const MAX_PHYSICS_TRAILS = 50;

const CustomCursor = () => {
  const { cursorVariant } = useCursor();
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMoving, setIsMoving] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [pathHistory, setPathHistory] = useState<TrailPoint[]>([]);
  const [physicsTrails, setPhysicsTrails] = useState<PhysicsTrail[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const lastPositionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const trailIdRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  // Detect if device is mobile/touch
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.matchMedia("(max-width: 480px)").matches;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Physics simulation for shooting star trails
  useEffect(() => {
    const updatePhysics = () => {
      setPhysicsTrails((prev) =>
        prev
          .map((trail) => ({
            ...trail,
            x: trail.x + trail.vx,
            y: trail.y + trail.vy,
            vx: trail.vx * 0.98, // Air resistance
            vy: trail.vy * 0.98 + 0.1, // Gravity
            life: trail.life - 0.02,
          }))
          .filter((trail) => trail.life > 0)
          .slice(-MAX_PHYSICS_TRAILS)
      );

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      const newX = clientX;
      const newY = clientY;
      const now = Date.now();

      const velocity = {
        x: newX - lastPositionRef.current.x,
        y: newY - lastPositionRef.current.y,
      };

      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

      const newPoint: TrailPoint = {
        x: newX,
        y: newY,
        timestamp: now,
        velocity,
      };

      setPathHistory((prev) => [...prev, newPoint].slice(-MAX_PATH_HISTORY));

      const speedThreshold = isMobile ? 3 : 5;
      if (speed > speedThreshold) {
        const numTrails = Math.min(
          Math.floor(speed / (isMobile ? 8 : 10)),
          isMobile ? 3 : 5
        );
        const newPhysicsTrails: PhysicsTrail[] = [];

        for (let i = 0; i < numTrails; i++) {
          newPhysicsTrails.push({
            x: newX + (Math.random() - 0.5) * (isMobile ? 8 : 10),
            y: newY + (Math.random() - 0.5) * (isMobile ? 8 : 10),
            vx: velocity.x * 0.1 + (Math.random() - 0.5) * 2,
            vy: velocity.y * 0.1 + (Math.random() - 0.5) * 2,
            life: 1,
            id: trailIdRef.current++,
          });
        }

        setPhysicsTrails((prev) =>
          [...prev, ...newPhysicsTrails].slice(-MAX_PHYSICS_TRAILS)
        );
      }

      setMousePosition({ x: newX, y: newY });
      setIsMoving(true);

      lastPositionRef.current = { x: newX, y: newY };
    },
    [isMobile]
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const mouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        updatePosition(e.clientX, e.clientY);
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsMoving(false), 150);
      }
    };

    const touchStart = (e: TouchEvent) => {
      if (isMobile) {
        setIsTouching(true);
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsMoving(false), 150);
      }
    };

    const touchMove = (e: TouchEvent) => {
      if (isMobile) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsMoving(false), 150);
      }
    };

    const touchEnd = () => {
      if (isMobile) {
        setIsTouching(false);
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsMoving(false), 300);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", mouseMove);
    } else {
      window.addEventListener("touchstart", touchStart, { passive: false });
      window.addEventListener("touchmove", touchMove, { passive: false });
      window.addEventListener("touchend", touchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
      clearTimeout(timeout);
    };
  }, [isMobile, updatePosition]);

  const cursorSize = isMobile ? 16 : 12;
  const halfSize = cursorSize / 2;

  // Memoize rotation calculation
  const textRotation = useMemo(() => {
    if (pathHistory.length > 1) {
      const lastPoint = pathHistory[pathHistory.length - 1];
      return (
        Math.atan2(lastPoint.velocity.y, lastPoint.velocity.x) * (180 / Math.PI)
      );
    }
    return 0;
  }, [pathHistory]);

  const mainCursorVariants: Variants = {
    default: {
      x: mousePosition.x - halfSize,
      y: mousePosition.y - halfSize,
      scale: 1,
      opacity: isMobile ? (isTouching ? 0.8 : 0.4) : 0.9,
      rotate: 0,
      borderRadius: "50%",
      transition: {
        x: { duration: 0 },
        y: { duration: 0 },
        scale: { type: "spring", damping: 30, stiffness: 400, mass: 0.8 },
        opacity: { type: "spring", damping: 30, stiffness: 400, mass: 0.8 },
        rotate: { type: "spring", damping: 30, stiffness: 400, mass: 0.8 },
        borderRadius: {
          type: "spring",
          damping: 30,
          stiffness: 400,
          mass: 0.8,
        },
      },
    },
    text: {
      x: mousePosition.x - (isMobile ? 24 : 20),
      y: mousePosition.y - (isMobile ? 24 : 20),
      scale: isMobile ? 1.4 : 1.8,
      opacity: isMobile ? (isTouching ? 0.7 : 0.3) : 0.6,
      rotate: textRotation,
      borderRadius: "30%",
      transition: {
        x: { duration: 0 },
        y: { duration: 0 },
        scale: { type: "spring", damping: 25, stiffness: 300, mass: 0.6 },
        opacity: { type: "spring", damping: 25, stiffness: 300, mass: 0.6 },
        rotate: { type: "spring", damping: 25, stiffness: 300, mass: 0.6 },
        borderRadius: {
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.6,
        },
      },
    },
    hover: {
      x: mousePosition.x - (isMobile ? 20 : 16),
      y: mousePosition.y - (isMobile ? 20 : 16),
      scale: isMobile ? 1.2 : 1.4,
      opacity: isMobile ? (isTouching ? 0.9 : 0.5) : 0.8,
      rotate: 0,
      borderRadius: "20%",
      transition: {
        x: { duration: 0 },
        y: { duration: 0 },
        scale: { type: "spring", damping: 20, stiffness: 500, mass: 0.5 },
        opacity: { type: "spring", damping: 20, stiffness: 500, mass: 0.5 },
        rotate: { type: "spring", damping: 20, stiffness: 500, mass: 0.5 },
        borderRadius: {
          type: "spring",
          damping: 20,
          stiffness: 500,
          mass: 0.5,
        },
      },
    },
    click: {
      x: mousePosition.x - (isMobile ? 12 : 8),
      y: mousePosition.y - (isMobile ? 12 : 8),
      scale: isMobile ? 0.8 : 0.6,
      opacity: 1,
      rotate: 45,
      borderRadius: "10%",
      transition: {
        x: { duration: 0 },
        y: { duration: 0 },
        scale: { type: "spring", damping: 40, stiffness: 800, mass: 0.3 },
        opacity: { type: "spring", damping: 40, stiffness: 800, mass: 0.3 },
        rotate: { type: "spring", damping: 40, stiffness: 800, mass: 0.3 },
        borderRadius: {
          type: "spring",
          damping: 40,
          stiffness: 800,
          mass: 0.3,
        },
      },
    },
  };

  if (isMobile) {
    return null;
  }

  return (
    <>
      {physicsTrails.slice(-20).map((trail) => (
        <motion.div
          key={trail.id}
          className="fixed top-0 left-0 pointer-events-none z-[9995]"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            width: 6,
            height: 6,
            backgroundColor: "var(--primary, #00bcd4)",
            borderRadius: "50%",
            opacity: Math.max(0, trail.life * 0.8),
            boxShadow: `0 0 ${
              Math.max(0, trail.life) * 16
            }px var(--primary, #00bcd4)`,
            position: "fixed",
            pointerEvents: "none",
          }}
        />
      ))}

      {pathHistory.slice(-10).map((point, index) => {
        const age = (Date.now() - point.timestamp) / 1000;
        const life = Math.max(0, 1 - age / 1.2);
        const size = 3 + index * 0.25;

        return (
          <motion.div
            key={`${point.timestamp}-${index}`}
            className="fixed top-0 left-0 pointer-events-none z-[9996]"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              backgroundColor: "var(--primary)",
              borderRadius: "50%",
              filter: `blur(${(1 - life) * 1.2}px)`,
              boxShadow: `0 0 ${life * 8}px var(--primary, #00bcd4)`,
              opacity: life * 0.5,
              position: "fixed",
              pointerEvents: "none",
              transform: `scale(${life * 1.1})`,
              transition: "opacity 0.2s, transform 0.2s, left 0s, top 0s",
            }}
          />
        );
      })}

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        variants={mainCursorVariants}
        animate={cursorVariant}
        style={{
          width: cursorSize,
          height: cursorSize,
          border: "2px solid var(--primary, #00bcd4)",
          background: isMoving
            ? "radial-gradient(circle, rgba(0,188,212,0.2), transparent)"
            : "transparent",
          backdropFilter: "blur(3px)",
          boxShadow: isMoving ? "0 0 10px rgba(0,188,212,0.3)" : "none",
          position: "fixed",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default CustomCursor;
