// Firestore access for the `inventory` collection.
// Collection: inventory/{itemId} -> { name, branchId, category, unit, currentStock, reorderThreshold }
//
// Backs:
// - Owner > Inventory tab (watchAllItems, filtered client-side by category/status)
// - Staff > Shift & Stock Check / Stock Adjustment (watchItemsForBranch, updateStock)
//
// Reads fall back to local mock data if Firestore is unreachable (see
// utils/stream_fallback.dart). updateStock is a write and has no offline
// fallback — if it fails, the caller (inventory_state/staff_state) already
// surfaces an error message rather than crashing.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/inventory_item.dart';
import '../utils/stream_fallback.dart';

class InventoryService {
  final CollectionReference<Map<String, dynamic>> _collection =
      FirebaseFirestore.instance.collection('inventory');

  /// All items across every branch — used by the Owner's Inventory tab.
  Stream<List<InventoryItem>> watchAllItems() {
    return withMockFallback(
      source: _collection.snapshots().map((snapshot) => snapshot.docs
          .map((doc) => InventoryItem.fromMap(doc.id, doc.data()))
          .toList()),
      mockData: mockInventoryItems,
    );
  }

  /// Items for a single branch — used by Staff screens.
  Stream<List<InventoryItem>> watchItemsForBranch(String branchId) {
    return withMockFallback(
      source: _collection
          .where('branchId', isEqualTo: branchId)
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => InventoryItem.fromMap(doc.id, doc.data()))
              .toList()),
      mockData: mockInventoryItemsForBranch(branchId),
    );
  }

  /// Used by the Stock Adjustment screen's Save button.
  Future<void> updateStock(String itemId, int newStock) {
    return _collection.doc(itemId).update({'currentStock': newStock});
  }

  /// Used by the Owner's Inventory tab to discontinue a product — a hard
  /// delete of the Firestore document. No offline fallback (this is a
  /// write, same as updateStock): if it fails, the caller (InventoryState)
  /// surfaces an error message rather than silently pretending it worked.
  Future<void> deleteItem(String itemId) {
    return _collection.doc(itemId).delete();
  }
}