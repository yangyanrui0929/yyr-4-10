import { useGameStore } from "@/store/useGameStore";
import { TOWER_CONFIGS } from "@/game/config";
import type { TowerType } from "@/types/game";
import Card from "@/components/common/Card";

export default function TowerSelect() {
  const { selectedTowerType, selectTowerType, gold, showRecommendedCells, toggleShowRecommendedCells } = useGameStore();

  const towers: TowerType[] = ["spatula", "chili", "freezer"];

  return (
    <Card title="防御塔商店" icon="🏰" className="h-full">
      <div className="space-y-3">
        {towers.map((type) => {
          const config = TOWER_CONFIGS[type];
          const canAfford = gold >= config.cost;
          const isSelected = selectedTowerType === type;
          return (
            <button
              key={type}
              onClick={() => selectTowerType(isSelected ? null : type)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? "border-kitchen-warm bg-orange-100 shadow-lg scale-[1.02]"
                  : canAfford
                  ? "border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 hover:border-kitchen-warm hover:shadow-md"
                  : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
              }`}
              disabled={!canAfford}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{config.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold text-kitchen-brown">
                    {config.name}
                  </div>
                  <div className="text-xs text-gray-600 space-y-0.5">
                    <div>💥 伤害: {config.damage} | 📏 范围: {config.range}</div>
                    <div className="text-purple-600">✨ {config.special}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold ${
                      canAfford ? "text-yellow-600" : "text-gray-400"
                    }`}
                  >
                    💰 {config.cost}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedTowerType && (
        <div className="mt-4 p-3 bg-kitchen-warm/10 border border-kitchen-warm/30 rounded-lg text-sm text-kitchen-brown">
          💡 已选择 <b>{TOWER_CONFIGS[selectedTowerType].name}</b>，点击战场空地放置！
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={toggleShowRecommendedCells}
          className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
            showRecommendedCells
              ? "border-green-500 bg-green-50 shadow-md"
              : "border-gray-200 bg-white hover:border-green-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <span className={`font-bold ${showRecommendedCells ? "text-green-700" : "text-gray-700"}`}>
              推荐塔位
            </span>
          </div>
          <div
            className={`w-10 h-6 rounded-full transition-colors relative ${
              showRecommendedCells ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${
                showRecommendedCells ? "left-[18px]" : "left-0.5"
              }`}
            />
          </div>
        </button>
        {showRecommendedCells && (
          <div className="mt-2 text-xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded" style={{ background: "rgba(34,197,94,0.5)" }}></span>
              <span className="text-green-700">推荐放置</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded" style={{ background: "rgba(156,163,175,0.3)" }}></span>
              <span className="text-gray-600">可以放置</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded" style={{ background: "rgba(239,68,68,0.4)" }}></span>
              <span className="text-red-600">不可放置</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-500">
        提示：再次点击塔可以取消选择
      </div>
    </Card>
  );
}
