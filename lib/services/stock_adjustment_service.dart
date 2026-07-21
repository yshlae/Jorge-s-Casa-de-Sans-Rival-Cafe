// Firestore access for the `stock_adjustments` collection.
// Collection: stock_adjustments/{id} -> {
//   itemName, branchName, type, amount, unit, staffName, timestamp
// }
//
// Backs:
// - Owner > Inventory > Adjustments tab ("Recent Stock Adjustments" list)
// - Staff > Stock Adjustment screen (creates a new log entry on Save)
//
// watchAllLogs falls back to local mock data if Firestore is unreachable.
// addLog is a write and has no offline fallback — if it fails, the caller
// (inventory_state/staff_state) already surfaces an error message.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/stock_adjustment_log.dart';
import '../utils/stream_fallback.dart';

class StockAdjustmentService {
  CollectionReference<Map<String, dynamic>> get _collection =>
      FirebaseFirestore.instance.collection('stock_adjustments');

  /// All adjustment logs across every branch — used by the Owner's
  /// Inventory > Adjustments tab.
  Stream<List<StockAdjustmentLog>> watchAllLogs({int limit = 20}) {
    return withMockFallback(
      source: _collection
          .orderBy('timestamp', descending: true)
          .limit(limit)
          .snapshots()
          .map(
            (snapshot) => snapshot.docs
                .map((doc) => StockAdjustmentLog.fromMap(doc.id, doc.data()))
                .toList(),
          ),
      mockData: buildMockAdjustmentLogs(),
    );
  }

  /// Used by Staff > Stock Adjustment screen's Save button.
  Future<void> addLog(StockAdjustmentLog log) async {
    await _collection.add(log.toMap());
  }
}
