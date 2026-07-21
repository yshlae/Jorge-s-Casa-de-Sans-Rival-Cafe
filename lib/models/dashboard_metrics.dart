enum ForecastLevel { low, medium, high }

extension ForecastLevelLabel on ForecastLevel {
  String get label {
    switch (this) {
      case ForecastLevel.low:
        return 'Low';
      case ForecastLevel.medium:
        return 'Medium';
      case ForecastLevel.high:
        return 'High';
    }
  }
}

class DashboardMetrics {
  final double totalRevenue;
  final double revenueChangePercent;
  final int productionOutput;
  final double productionChangePercent;
  final ForecastLevel demandForecast;
  final double demandForecastChangePercent;
  final int resourceStatusPercent; // "87% Overall sufficiency"
  final int criticalResourceCount; // "2 Critical"

  const DashboardMetrics({
    required this.totalRevenue,
    required this.revenueChangePercent,
    required this.productionOutput,
    required this.productionChangePercent,
    required this.demandForecast,
    required this.demandForecastChangePercent,
    required this.resourceStatusPercent,
    required this.criticalResourceCount,
  });

  static ForecastLevel _levelFromString(String? value) {
    switch (value) {
      case 'high':
        return ForecastLevel.high;
      case 'medium':
        return ForecastLevel.medium;
      default:
        return ForecastLevel.low;
    }
  }

  factory DashboardMetrics.fromMap(Map<String, dynamic> map) {
    return DashboardMetrics(
      totalRevenue: (map['totalRevenue'] as num?)?.toDouble() ?? 0,
      revenueChangePercent:
          (map['revenueChangePercent'] as num?)?.toDouble() ?? 0,
      productionOutput: (map['productionOutput'] as num?)?.toInt() ?? 0,
      productionChangePercent:
          (map['productionChangePercent'] as num?)?.toDouble() ?? 0,
      demandForecast: _levelFromString(map['demandForecast'] as String?),
      demandForecastChangePercent:
          (map['demandForecastChangePercent'] as num?)?.toDouble() ?? 0,
      resourceStatusPercent:
          (map['resourceStatusPercent'] as num?)?.toInt() ?? 0,
      criticalResourceCount:
          (map['criticalResourceCount'] as num?)?.toInt() ?? 0,
    );
  }

  Map<String, dynamic> toMap() => {
        'totalRevenue': totalRevenue,
        'revenueChangePercent': revenueChangePercent,
        'productionOutput': productionOutput,
        'productionChangePercent': productionChangePercent,
        'demandForecast': demandForecast.name,
        'demandForecastChangePercent': demandForecastChangePercent,
        'resourceStatusPercent': resourceStatusPercent,
        'criticalResourceCount': criticalResourceCount,
      };
}