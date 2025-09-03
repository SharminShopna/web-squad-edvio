import SectionTitle from "@/Shared/SectionTitle";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion"
const TopAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetch("/topAchievements.json")
            .then((res) => res.json())
            .then((data) => setAchievements(data))
            .catch((error) => console.error("Error fetching achievements:", error));
    }, []);

    const visibleAchievements = showAll ? achievements : achievements.slice(0, 3);

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-12">
                    <SectionTitle
                        heading="Top Achievements"
                        subHeading="Our milestones that reflect excellence and success"
                    />
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleAchievements.map((item) => (
                        <div
                            key={item.id}
                            className="bg-neutral p-6 rounded-2xl border border-TealGreen shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 text-center"
                        >
                            <div className="text-5xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-base-content mb-2">{item.title}</h3>
                            <p className="text-gray-200 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* See More / See Less Button */}
                {achievements.length > 3 && (
                    <div className="text-center mt-10">
                          <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                        onClick={() => setShowAll(!showAll)}
                        variant="outline"
                        className="flex items-center gap-3 border-base-content text-base-content hover:bg-base-content/20 px-8 py-6 rounded-xl text-lg font-semibold clip-path-button
                        mx-auto"
                        >
                            {showAll ? "See Less" : "See More"}
                        </Button>
                      </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopAchievements;
