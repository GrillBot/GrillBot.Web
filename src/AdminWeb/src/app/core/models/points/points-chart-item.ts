interface PointsBaseChartItem {
  day: string;
}

export interface PointsMessagesChartItem extends PointsBaseChartItem {
  messagePoints: number;
}

export interface PointsReactionsChartItem extends PointsBaseChartItem {
  reactionPoints: number;
}

export interface PointsChartItem extends PointsMessagesChartItem, PointsReactionsChartItem { }
