// Firestore access for the `recent_orders` collection.
// Collection: recent_orders/{orderId} -> { orderNumber, branchName, itemSummary, amount, status, sortIndex }
//
// Backs the "Recent Orders" list at the bottom of the Owner Dashboard.
// Falls back to local mock data if Firestore is unreachable.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/recent_order.dart';
import '../utils/stream_fallback.dart';

class RecentOrderService {
  final CollectionReference<Map<String, dynamic>> _collection =
      FirebaseFirestore.instance.collection('recent_orders');

  Stream<List<RecentOrder>> watchRecentOrders({int limit = 10}) {
    return withMockFallback(
      source: _collection
          .orderBy('sortIndex', descending: true)
          .limit(limit)
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => RecentOrder.fromMap(doc.id, doc.data()))
              .toList()),
      mockData: mockRecentOrders,
    );
  }
}