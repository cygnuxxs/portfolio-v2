"use client";
import { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { motion, Variants } from "motion/react";
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
  id: number;
}

interface PhysicsTrail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  id: number;
}

class Queue<T> {
  private items: T[] = [];
  private head = 0;
  private tail = 0;
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.items = new Array(maxSize);
  }

  enqueue(item: T): void {
    if (this.size() >= this.maxSize) {
      this.dequeue();
    }
    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % this.maxSize;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    this.head = (this.head + 1) % this.maxSize;
    return item;
  }

  size(): number {
    return this.tail >= this.head
      ? this.tail - this.head
      : this.maxSize - this.head + this.tail;
  }

  isEmpty(): boolean {
    return this.head === this.tail;
  }

  toArray(): T[] {
    if (this.isEmpty()) return [];

    const result: T[] = [];
    let current = this.head;

    while (current !== this.tail) {
      if (this.items[current] !== undefined) {
        result.push(this.items[current]);
      }
      current = (current + 1) % this.maxSize;
    }

    return result;
  }

  clear(): void {
    this.head = 0;
    this.tail = 0;
  }
}

const MAX_PATH_HISTORY = 30;
const MAX_PHYSICS_TRAILS = 30;
const TRAIL_CLEANUP_INTERVAL = 1000; // ms

const CustomCursor = () => {
  const { cursorVariant } = useCursor();
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMoving, setIsMoving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use queues for better memory management
  const pathQueueRef = useRef<Queue<TrailPoint>>(new Queue(MAX_PATH_HISTORY));
  const physicsQueueRef = useRef<Queue<PhysicsTrail>>(
    new Queue(MAX_PHYSICS_TRAILS)
  );
  const [pathHistory, setPathHistory] = useState<TrailPoint[]>([]);
  const [physicsTrails, setPhysicsTrails] = useState<PhysicsTrail[]>([]);

  const lastPositionRef = useRef<MousePosition>({ x: 0, y: 0 });
  const trailIdRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const cleanupIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Detect if device is mobile/touch
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      const isLowPerformance = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      setIsMobile(isTouchDevice || isSmallScreen || isLowPerformance);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cleanup old trails periodically
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();

      // Clean up path history
      const currentPaths = pathQueueRef.current.toArray();
      const validPaths = currentPaths.filter(
        (point) => now - point.timestamp < 1500 // Keep trails for 1.5 seconds
      );

      if (validPaths.length !== currentPaths.length) {
        pathQueueRef.current.clear();
        validPaths.forEach((point) => pathQueueRef.current.enqueue(point));
        setPathHistory(validPaths);
      }

      // Clean up physics trails
      const currentPhysics = physicsQueueRef.current.toArray();
      const validPhysics = currentPhysics.filter((trail) => trail.life > 0);

      if (validPhysics.length !== currentPhysics.length) {
        physicsQueueRef.current.clear();
        validPhysics.forEach((trail) => physicsQueueRef.current.enqueue(trail));
        setPhysicsTrails(validPhysics);
      }
    };

    cleanupIntervalRef.current = setInterval(cleanup, TRAIL_CLEANUP_INTERVAL);

    return () => {
      if (cleanupIntervalRef.current) {
        clearInterval(cleanupIntervalRef.current);
      }
    };
  }, []);

  // Optimized physics simulation
  useEffect(() => {
    const updatePhysics = () => {
      const currentTrails = physicsQueueRef.current.toArray();

      if (currentTrails.length === 0) {
        animationFrameRef.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const updatedTrails = currentTrails
        .map((trail) => ({
          ...trail,
          x: trail.x + trail.vx,
          y: trail.y + trail.vy,
          vx: trail.vx * 0.98, // Air resistance
          vy: trail.vy * 0.98 + 0.1, // Gravity
          life: trail.life - 0.025,
        }))
        .filter((trail) => trail.life > 0);

      // Update queue
      physicsQueueRef.current.clear();
      updatedTrails.forEach((trail) => physicsQueueRef.current.enqueue(trail));
      setPhysicsTrails(updatedTrails);

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const newX = clientX;
    const newY = clientY;
    const now = Date.now();

    const velocity = {
      x: newX - lastPositionRef.current.x,
      y: newY - lastPositionRef.current.y,
    };

    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

    // Add to path history queue
    const newPoint: TrailPoint = {
      x: newX,
      y: newY,
      timestamp: now,
      velocity,
      id: trailIdRef.current++,
    };

    pathQueueRef.current.enqueue(newPoint);
    setPathHistory(pathQueueRef.current.toArray());

    // Create physics trails based on speed
    const speedThreshold = 5;
    if (speed > speedThreshold) {
      const numTrails = Math.min(Math.floor(speed / 12), 3);

      for (let i = 0; i < numTrails; i++) {
        const newPhysicsTrail: PhysicsTrail = {
          x: newX + (Math.random() - 0.5) * 8,
          y: newY + (Math.random() - 0.5) * 8,
          vx: velocity.x * 0.08 + (Math.random() - 0.5) * 1.5,
          vy: velocity.y * 0.08 + (Math.random() - 0.5) * 1.5,
          life: 1,
          id: trailIdRef.current++,
        };

        physicsQueueRef.current.enqueue(newPhysicsTrail);
      }

      setPhysicsTrails(physicsQueueRef.current.toArray());
    }

    setMousePosition({ x: newX, y: newY });
    setIsMoving(true);
    lastPositionRef.current = { x: newX, y: newY };
  }, []);

  // Mouse event handlers
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const mouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 150);
    };

    const mouseLeave = () => {
      setIsMoving(false);
      // Clear trails when mouse leaves
      pathQueueRef.current.clear();
      physicsQueueRef.current.clear();
      setPathHistory([]);
      setPhysicsTrails([]);
    };

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseleave", mouseLeave);
      clearTimeout(timeout);
    };
  }, [updatePosition]);

  const cursorSize = 12;
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
      opacity: 0.9,
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
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.8,
      opacity: 0.6,
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
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.4,
      opacity: 0.8,
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
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 0.6,
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
      {/* Physics trails */}
      {physicsTrails.slice(-15).map((trail) => (
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
            opacity: Math.max(0, trail.life * 0.7),
            boxShadow: `0 0 ${
              Math.max(0, trail.life) * 12
            }px var(--primary, #00bcd4)`,
            position: "fixed",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Path history trails */}
      {pathHistory.slice(-8).map((point, index) => {
        const age = (Date.now() - point.timestamp) / 1000;
        const life = Math.max(0, 1 - age / 1.0);
        const size = 3 + index * 0.2;

        return (
          <motion.div
            key={point.id}
            className="fixed top-0 left-0 pointer-events-none z-[9996]"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              backgroundColor: "var(--primary, #00bcd4)",
              borderRadius: "50%",
              filter: `blur(${(1 - life) * 1}px)`,
              boxShadow: `0 0 ${life * 6}px var(--primary, #00bcd4)`,
              opacity: life * 0.4,
              position: "fixed",
              pointerEvents: "none",
              transform: `scale(${life})`,
            }}
          />
        );
      })}

      {/* Main cursor */}
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
