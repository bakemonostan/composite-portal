import { CardGraphIcon, TotalProjectsIcon } from "../icons";
import { Badge } from "../ui/badge";

export default function DashboardCard() {
  return (
    <div className=" border-borderColor border rounded-xl shadow-lg p-3 w-full min-w-[250px] sm:min-w-0 bg-white">
      <div className="space-y-2.5">
        <h3>Total Projects</h3>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-textColor">1</p>
          <div className="bg-[#F0F1FA] p-1.5 w-10 h-10 flex justify-center items-center rounded-full">
            <TotalProjectsIcon />
          </div>
        </div>
        <Badge className="bg-[#E7F6EC] text-[#036B26] w-12 justify-center text-center p-0.5 flex gap-1">
          <CardGraphIcon width={14} height={14} />
          <p>5%</p>
        </Badge>
      </div>
    </div>
  );
}
