import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import MaterialsTable from "./materials";
import ToolsTable from "./tools-and-machines";

export type MaterialTab = "materials" | "tools-and-machinery";

type Tab = { name: string; tab: MaterialTab };

const tabs: Tab[] = [
  { tab: "materials", name: "Materials" },
  { tab: "tools-and-machinery", name: "Tools and machinery" },
];

const MaterialTableArea = ({ supplier }: any) => {
  const [selectedTab, setSelectedTab] = useState<MaterialTab>("materials");
  const updateTab = (tab: MaterialTab) => setSelectedTab(tab);

  const renderTableContent = () => {
    switch (selectedTab) {
      case "materials":
        return <MaterialsTable key={"material"} supplier={supplier} />;
      case "tools-and-machinery":
        return <ToolsTable key={"tools"} supplier={supplier} />;
      // no default
    }
  };

  return (
    <section>
      {/* tab */}
      <div className="grid grid-cols-2 bg-white border border-zinc-300 gap-2 rounded-lg">
        {tabs.map((tab, id) => (
          <div
            className={`py-3 capitalize text-center text-lg select-none cursor-pointer duration-200 rounded-lg ${
              tab.tab === selectedTab
                ? "font-bold text-zinc-700 bg-zinc-300"
                : ""
            }`}
            onClick={() => updateTab(tab.tab)}
            key={id}
          >
            <p>{tab.name}</p>
          </div>
        ))}
      </div>

      {/* table area */}
      <AnimatePresence mode="wait" initial={false}>
        {renderTableContent()}
      </AnimatePresence>
    </section>
  );
};

export default MaterialTableArea;
