// Report summary model — backs the Owner > Reports screen (Monthly/Weekly
// toggle, Total Revenue / Total Orders trend cards, Branch Breakdown bars).

enum ReportPeriod { monthly, weekly }

class BranchBreakdownEntry {
  final String branchName;
  final double amount;
  final double percent;

  const BranchBreakdownEntry({
    required this.branchName,
    required this.amount,
    required this.percent,
  });

  factory BranchBreakdownEntry.fromMap(Map<String, dynamic> map) {
    return BranchBreakdownEntry(
      branchName: map['branchName'] as String? ?? '',
      amount: (map['amount'] as num?)?.toDouble() ?? 0,
      percent: (map['percent'] as num?)?.toDouble() ?? 0,
    );
  }

  Map<String, dynamic> toMap() => {
        'branchName': branchName,
        'amount': amount,
        'percent': percent,
      };
}

class ReportSummary {
  final ReportPeriod period;
  final double totalRevenue;
  final double revenueChangePercent;
  final int totalOrders;
  final double orderChangePercent;
  final List<BranchBreakdownEntry> branchBreakdown;

  const ReportSummary({
    required this.period,
    required this.totalRevenue,
    required this.revenueChangePercent,
    required this.totalOrders,
    required this.orderChangePercent,
    required this.branchBreakdown,
  });

  factory ReportSummary.fromMap(Map<String, dynamic> map) {
    return ReportSummary(
      period: (map['period'] as String? ?? 'monthly') == 'weekly'
          ? ReportPeriod.weekly
          : ReportPeriod.monthly,
      totalRevenue: (map['totalRevenue'] as num?)?.toDouble() ?? 0,
      revenueChangePercent:
          (map['revenueChangePercent'] as num?)?.toDouble() ?? 0,
      totalOrders: (map['totalOrders'] as num?)?.toInt() ?? 0,
      orderChangePercent: (map['orderChangePercent'] as num?)?.toDouble() ?? 0,
      branchBreakdown: (map['branchBreakdown'] as List<dynamic>? ?? [])
          .map((e) => BranchBreakdownEntry.fromMap(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toMap() => {
        'period': period == ReportPeriod.weekly ? 'weekly' : 'monthly',
        'totalRevenue': totalRevenue,
        'revenueChangePercent': revenueChangePercent,
        'totalOrders': totalOrders,
        'orderChangePercent': orderChangePercent,
        'branchBreakdown': branchBreakdown.map((b) => b.toMap()).toList(),
      };
}