import { easeInOut, motion } from "framer-motion";

const BarChart = () => {
  const data = [
    { label: "Gen Z", value: 45 },
    { label: "Millenials", value: 56 },
    { label: "Gen Xers", value: 51 },
    { label: "Boomers", value: 70 },
    { label: "Older adults", value: 74 },
  ];

  return (
    <div className="flex px-6 flex-col space-y-4 max-w-xl mx-auto">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col">
          <span className="mb-2 font-semibold">{item.label}</span>
          <div className="flex gap-x-2 w-full">
            <motion.div
              className={`${
                index === 0 ? "opacity-100" : "opacity-40"
              } bg-[#4734f7] h-6 rounded`}
              initial={{ width: 0 }}
              whileInView={{ width: `${item.value}%` }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ maxWidth: "100%" }}
            />
            <span className="">{item.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
