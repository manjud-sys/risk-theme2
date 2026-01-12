import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Users, 
  Plus, 
  TrendingDown, 
  AlertTriangle, 
  ChevronRight,
  Target,
  Play
} from "lucide-react";

interface SavedAudience {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  predictedChurn: number;
  riskLevel: "high" | "medium" | "low";
  lastUpdated: string;
}

interface AudienceFilterProps {
  onSelectAudience: (audienceId: string) => void;
  onBuildNewAudience: () => void;
  onTakeAction: (audienceId: string) => void;
}

const mockAudiences: SavedAudience[] = [
  {
    id: "1",
    name: "Failed Payment - Enterprise Plan",
    description: "Enterprise subscriptions with 2+ failed payments",
    customerCount: 28,
    predictedChurn: 12,
    riskLevel: "high",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Dunning Cycle - All Plans",
    description: "Active subscriptions in dunning process",
    customerCount: 84,
    predictedChurn: 34,
    riskLevel: "high",
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    name: "Downgraded - Professional Plan",
    description: "Recently downgraded from Enterprise to Pro",
    customerCount: 156,
    predictedChurn: 23,
    riskLevel: "medium",
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    name: "Trial Conversion Risk",
    description: "Trial users approaching end date with low usage",
    customerCount: 42,
    predictedChurn: 8,
    riskLevel: "medium",
    lastUpdated: "5 days ago",
  },
];

const riskColors = {
  high: "bg-risk-high text-primary-foreground",
  medium: "bg-risk-medium text-primary-foreground",
  low: "bg-risk-low text-primary-foreground",
};

const riskBorderColors = {
  high: "border-risk-high/30 hover:border-risk-high/60",
  medium: "border-risk-medium/30 hover:border-risk-medium/60",
  low: "border-risk-low/30 hover:border-risk-low/60",
};

export function AudienceFilter({ 
  onSelectAudience, 
  onBuildNewAudience, 
  onTakeAction 
}: AudienceFilterProps) {
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

  const totalPredictedChurn = mockAudiences.reduce(
    (sum, audience) => sum + audience.predictedChurn,
    0
  );

  const handleSelect = (audienceId: string) => {
    setSelectedAudience(audienceId === selectedAudience ? null : audienceId);
    onSelectAudience(audienceId);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" style={{ color: '#ffab84' }} />
            <CardTitle className="text-base font-semibold">Subscription Segments</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBuildNewAudience}
            className="h-7 gap-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Build New
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Churn Prediction Summary */}
        <div className="flex items-center justify-between rounded-lg bg-red-50 border border-red-200 p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Predicted to Churn</p>
              <p className="text-lg font-bold text-gray-900">{totalPredictedChurn} subscriptions</p>
            </div>
          </div>
          <Badge className="bg-red-600 text-white border-transparent">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Urgent
          </Badge>
        </div>

        {/* Audience List */}
        <div className="space-y-2">
          {mockAudiences.map((audience) => (
            <div
              key={audience.id}
              onClick={() => handleSelect(audience.id)}
              className={`group cursor-pointer rounded-lg border-2 p-3 transition-all ${
                selectedAudience === audience.id
                  ? `${riskBorderColors[audience.riskLevel]} bg-muted/50`
                  : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {audience.name}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className={`text-[10px] px-1.5 py-0 ${
                        audience.riskLevel === "high" 
                          ? "border-risk-high/50 text-risk-high" 
                          : audience.riskLevel === "medium"
                          ? "border-risk-medium/50 text-risk-medium"
                          : "border-risk-low/50 text-risk-low"
                      }`}
                    >
                      {audience.riskLevel}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {audience.description}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-hover:text-foreground transition-colors" />
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-foreground font-medium">
                      {audience.customerCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3.5 w-3.5 text-risk-high" />
                    <span className="text-xs text-risk-high font-medium">
                      {audience.predictedChurn} churn
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {audience.lastUpdated}
                </span>
              </div>

              {/* Expanded Actions */}
              {selectedAudience === audience.id && (
                <div className="mt-3 pt-3 border-t border-border/50 animate-fade-in">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTakeAction(audience.id);
                    }}
                    className="w-full gap-2"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Take Action on {audience.predictedChurn} at-risk customers
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Link */}
        <Button variant="ghost" className="w-full text-sm text-gray-600 hover:text-gray-900">
          View all subscription segments
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
