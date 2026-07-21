import 'package:cloud_firestore/cloud_firestore.dart';

// Stock adjustment log entry — backs:
// - Owner > Inventory > Adjustments tab ("Recent Stock Adjustments" list)
// - Staff > Stock Adjustment screen (creates one of these on Save)

enum AdjustmentType { restock, deduction }

extension AdjustmentTypeLabel on AdjustmentType {
  String get label => this == AdjustmentType.restock ? 'Restock' : 'Deduction';
}

class StockAdjustmentLog {
  final String id;
  final String itemName;
  final String branchName;
  final AdjustmentType type;
  final int amount; // always positive; sign is derived from `type`
  final String unit;
  final String staffName;
  final DateTime timestamp;

  const StockAdjustmentLog({
    required this.id,
    required this.itemName,
    required this.branchName,
    required this.type,
    required this.amount,
    required this.unit,
    required this.staffName,
    required this.timestamp,
  });

  /// Signed display value, e.g. "+10 kg" or "-4 pcs".
  String get signedLabel {
    final sign = type == AdjustmentType.restock ? '+' : '-';
    return '$sign$amount $unit';
  }

  factory StockAdjustmentLog.fromMap(String id, Map<String, dynamic> map) {
    final rawTimestamp = map['timestamp'];
    DateTime parsedTimestamp;

    if (rawTimestamp is Timestamp) {
      parsedTimestamp = rawTimestamp.toDate();
    } else if (rawTimestamp is DateTime) {
      parsedTimestamp = rawTimestamp;
    } else if (rawTimestamp is String) {
      parsedTimestamp = DateTime.tryParse(rawTimestamp) ?? DateTime.now();
    } else {
      parsedTimestamp = DateTime.now();
    }

    return StockAdjustmentLog(
      id: id,
      itemName: map['itemName'] as String? ?? '',
      branchName: map['branchName'] as String? ?? '',
      type: (map['type'] as String? ?? 'restock') == 'restock'
          ? AdjustmentType.restock
          : AdjustmentType.deduction,
      amount: (map['amount'] as num?)?.toInt() ?? 0,
      unit: map['unit'] as String? ?? '',
      staffName: map['staffName'] as String? ?? '',
      timestamp: parsedTimestamp,
    );
  }

  Map<String, dynamic> toMap() => {
    'itemName': itemName,
    'branchName': branchName,
    'type': type == AdjustmentType.restock ? 'restock' : 'deduction',
    'amount': amount,
    'unit': unit,
    'staffName': staffName,
    'timestamp': timestamp.toIso8601String(),
  };
}
