// Sales summary model. Used by the Staff's Sales Snapshot screen (today's
// revenue, transaction count, and top product for their own branch).

class TopProduct {
  final String name;
  final double amount;

  const TopProduct({required this.name, required this.amount});

  factory TopProduct.fromMap(Map<String, dynamic> map) {
    return TopProduct(
      name: map['name'] as String? ?? '',
      amount: (map['amount'] as num?)?.toDouble() ?? 0,
    );
  }

  Map<String, dynamic> toMap() => {'name': name, 'amount': amount};
}

/// One hour's revenue slice for the Sales Snapshot's hourly breakdown bar
/// chart. `hour` is 24-hour (e.g. 9 for 9 AM, 14 for 2 PM).
class HourlySales {
  final int hour;
  final double revenue;

  const HourlySales({required this.hour, required this.revenue});

  factory HourlySales.fromMap(Map<String, dynamic> map) {
    return HourlySales(
      hour: (map['hour'] as num?)?.toInt() ?? 0,
      revenue: (map['revenue'] as num?)?.toDouble() ?? 0,
    );
  }

  Map<String, dynamic> toMap() => {'hour': hour, 'revenue': revenue};

  /// e.g. "9 AM", "2 PM" — for the chart's x-axis labels.
  String get label {
    final period = hour < 12 ? 'AM' : 'PM';
    final displayHour = hour == 0 ? 12 : (hour > 12 ? hour - 12 : hour);
    return '$displayHour $period';
  }
}

class SalesSummary {
  final String id;
  final String branchId;
  final DateTime date;
  final double revenue;
  final int transactionCount;
  final List<TopProduct> topProducts;
  /// vs. yesterday, same field name/shape as DashboardMetrics and
  /// ReportSummary's revenueChangePercent — a precomputed value rather
  /// than something derived from a second "yesterday" document.
  final double revenueChangePercent;
  final List<HourlySales> hourlyBreakdown;

  const SalesSummary({
    required this.id,
    required this.branchId,
    required this.date,
    required this.revenue,
    required this.transactionCount,
    required this.topProducts,
    this.revenueChangePercent = 0,
    this.hourlyBreakdown = const [],
  });

  factory SalesSummary.fromMap(String id, Map<String, dynamic> map) {
    return SalesSummary(
      id: id,
      branchId: map['branchId'] as String? ?? '',
      date: DateTime.tryParse(map['date'] as String? ?? '') ?? DateTime.now(),
      revenue: (map['revenue'] as num?)?.toDouble() ?? 0,
      transactionCount: (map['transactionCount'] as num?)?.toInt() ?? 0,
      topProducts: (map['topProducts'] as List<dynamic>? ?? [])
          .map((e) => TopProduct.fromMap(e as Map<String, dynamic>))
          .toList(),
      revenueChangePercent: (map['revenueChangePercent'] as num?)?.toDouble() ?? 0,
      hourlyBreakdown: (map['hourlyBreakdown'] as List<dynamic>? ?? [])
          .map((e) => HourlySales.fromMap(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toMap() => {
        'branchId': branchId,
        'date': date.toIso8601String(),
        'revenue': revenue,
        'transactionCount': transactionCount,
        'topProducts': topProducts.map((p) => p.toMap()).toList(),
        'revenueChangePercent': revenueChangePercent,
        'hourlyBreakdown': hourlyBreakdown.map((h) => h.toMap()).toList(),
      };
}