enum StockStatus { ok, low, critical }

enum InventoryCategory { product, rawMaterial }

extension InventoryCategoryLabel on InventoryCategory {
  String get label {
    switch (this) {
      case InventoryCategory.product:
        return 'Products';
      case InventoryCategory.rawMaterial:
        return 'Raw Materials';
    }
  }
}

class InventoryItem {
  final String id;
  final String name;
  final String branchId;
  final InventoryCategory category;
  final String unit; // e.g. "1L cartons", "kg", "pcs", "boxes", "jars"
  final int currentStock;
  final int reorderThreshold;

  const InventoryItem({
    required this.id,
    required this.name,
    required this.branchId,
    required this.category,
    required this.unit,
    required this.currentStock,
    required this.reorderThreshold,
  });

  /// Threshold-based status — mirrors the "In Stock / Low Stock / Critical"
  /// badges shown on the Inventory screen mockup.
  StockStatus get status {
    if (currentStock <= 0) return StockStatus.critical;
    if (currentStock <= reorderThreshold) return StockStatus.low;
    return StockStatus.ok;
  }

  /// 0.0–1.0 fill ratio for the progress bar shown on each inventory card.
  /// Uses 2x the reorder threshold as a rough "full" reference point so the
  /// bar has room to show above-threshold stock too.
  double get progressRatio {
    final fullReference = reorderThreshold * 2;
    if (fullReference <= 0) return currentStock > 0 ? 1.0 : 0.0;
    return (currentStock / fullReference).clamp(0.0, 1.0);
  }

  static InventoryCategory _categoryFromString(String? value) {
    return value == 'rawMaterial'
        ? InventoryCategory.rawMaterial
        : InventoryCategory.product;
  }

  factory InventoryItem.fromMap(String id, Map<String, dynamic> map) {
    return InventoryItem(
      id: id,
      name: map['name'] as String? ?? '',
      branchId: map['branchId'] as String? ?? '',
      category: _categoryFromString(map['category'] as String?),
      unit: map['unit'] as String? ?? '',
      currentStock: (map['currentStock'] as num?)?.toInt() ?? 0,
      reorderThreshold: (map['reorderThreshold'] as num?)?.toInt() ?? 0,
    );
  }

  Map<String, dynamic> toMap() => {
        'name': name,
        'branchId': branchId,
        'category': category == InventoryCategory.rawMaterial
            ? 'rawMaterial'
            : 'product',
        'unit': unit,
        'currentStock': currentStock,
        'reorderThreshold': reorderThreshold,
      };

  InventoryItem copyWith({int? currentStock}) => InventoryItem(
        id: id,
        name: name,
        branchId: branchId,
        category: category,
        unit: unit,
        currentStock: currentStock ?? this.currentStock,
        reorderThreshold: reorderThreshold,
      );
}