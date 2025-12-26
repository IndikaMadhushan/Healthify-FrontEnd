//thathsara
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Reusable animated image component for registration pages
 * Features: Fade-in, float animation, scale on hover, gradient background
 *
 * @param {string} src - Image source path
 * @param {string} alt - Image alt text
 * @param {string} gradientFrom - Starting gradient color (default: secondary)
 * @param {string} gradientTo - Ending gradient color (default: primary)
 */
export default function AnimatedRegistrationImage({
  src,
  alt = "Registration",
  gradientFrom = "secondary/20",
  gradientTo = "primary/20",
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <div className="hidden lg:flex justify-center items-start lg:sticky lg:top-24 h-full">
      <div className="relative w-full max-w-2xl">
        {/* Animated gradient background blob */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br from-${gradientFrom} to-${gradientTo} rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main image with animations */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={
            isLoaded
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : { opacity: 0, y: 50, scale: 0.9 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative z-10"
        >
          <motion.img
            src={src}
            alt={alt}
            className="relative w-full h-auto object-contain drop-shadow-2xl"
            style={{ maxHeight: "80vh" }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.02,
              rotate: [0, 1, -1, 0],
              transition: {
                scale: { duration: 0.3 },
                rotate: { duration: 0.5, repeat: 2 },
              },
            }}
          />
        </motion.div>

        {/* Decorative animated circles */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Floating particles effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-secondary rounded-full"
          animate={{
            y: [-20, -40, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary rounded-full"
          animate={{
            y: [-10, -30, -10],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-secondary rounded-full"
          animate={{
            y: [-15, -35, -15],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </div>
  );
}
