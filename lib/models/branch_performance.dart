class BranchPerformance {
  final String id;
  final String branchId;
  final String branchName;
  final String tagline;
  final double revenue;
  final int productionUnits;
  final int orderCount;

  const BranchPerformance({
    required this.id,
    required this.branchId,
    required this.branchName,
    required this.tagline,
    required this.revenue,
    required this.productionUnits,
    required this.orderCount,
  });

  factory BranchPerformance.fromMap(String id, Map<String, dynamic> map) {
    return BranchPerformance(
      id: id,
      branchId: (map['branchId'] as String?)?.isNotEmpty == true
          ? map['branchId'] as String
          : id,
      branchName: map['branchName'] as String? ?? '',
      tagline: map['tagline'] as String? ?? '',
      revenue: (map['revenue'] as num?)?.toDouble() ?? 0,
      productionUnits: (map['productionUnits'] as num?)?.toInt() ?? 0,
      orderCount: (map['orderCount'] as num?)?.toInt() ?? 0,
    );
  }

  Map<String, dynamic> toMap() => {
    'branchId': branchId,
    'productionUnits': productionUnits,
    'orderCount': orderCount,
  };
}