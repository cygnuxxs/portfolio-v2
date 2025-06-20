'use client'
import DotsBackground from "./DotsBackground";

const HomeSection = () => {
  const headingWords = "Crafting as a Full Stack Developer".split(" ");

  return (
    <DotsBackground className="w-full">
      <section
        id="home"
        className="flex snap-start flex-col h-screen items-center justify-center opacity-0 translate-y-8 animate-[fadeInUp_0.7s_ease-out_0.1s_forwards]"
      >
        <div className="max-w-4xl space-y-8">
          <h1 className="text-6xl text-center font-black max-sm:text-4xl transition-all duration-300">
            {headingWords.map((word, index) => (
              <span
                key={index}
                className="inline-block mr-4 max-sm:mr-2 opacity-0 -translate-y-4 hover:scale-110 transition-all duration-300 cursor-default animate-[fadeInDown_0.6s_ease-out_forwards]"
                style={{
                  animationDelay: `${index * 100 + 300}ms`,
                  transformOrigin: "center bottom",
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="*:text-primary backdrop-blur-sm bg-foreground/5 p-4 leading-tight font-medium text-foreground/80 rounded-xl text-center text-xl max-sm:text-base opacity-0 translate-y-4 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 animate-[fadeInUp_0.6s_ease-out_1.2s_forwards]">
            Passionate Full Stack Developer | Specializing in{" "}
            <span className="font-medium relative px-2 py-1">
              Next.js
            </span>{" "}
            & the{" "}
            <span className="font-medium relative px-2 py-1">
              MERN
            </span>{" "}
            Stack | Exploring the Power of FastAPI for{" "}
            <span className="font-medium relative px-2 py-1">
              High-Performance Applications
            </span>
            | Continuously Exploring Cutting-Edge Technologies.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </DotsBackground>
  );
};

export default HomeSection;